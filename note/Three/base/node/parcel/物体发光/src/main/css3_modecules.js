

import * as T from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader'
import { CSS3DObject, CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

var camera, scene, webgl, control, root

const objects = []
const temVec1 = new T.Vector3(),
  temVec2 = new T.Vector3(),
  temVec3 = new T.Vector3(),
  temVec4 = new T.Vector3(),
  offset = new T.Vector3()

const VIZ_TYPE = {
  'Atoms': 0,
  'Bonds': 1,
  'Atoms + Bonds': 2
},
  MOLECULES = {
    'Ethanol': 'ethanol.pdb',
    'Aspirin': 'aspirin.pdb',
    'Caffeine': 'caffeine.pdb',
    'Nicotine': 'nicotine.pdb',
    'LSD': 'lsd.pdb',
    'Cocaine': 'cocaine.pdb',
    'Cholesterol': 'cholesterol.pdb',
    'Lycopene': 'lycopene.pdb',
    'Glucose': 'glucose.pdb',
    'Aluminium oxide': 'Al2O3.pdb',
    'Cubane': 'cubane.pdb',
    'Copper': 'cu.pdb',
    'Fluorite': 'caf2.pdb',
    'Salt': 'nacl.pdb',
    'YBCO superconductor': 'ybco.pdb',
    'Buckyball': 'buckyball.pdb',
    // 'Diamond': 'diamond.pdb',
    'Graphite': 'graphite.pdb'
  },
  params = {
    vizType: 2,
    molecule: 'caffeine.pdb'
  }

const loader = new PDBLoader(), colorSpriteMap = {}, baseSprite = document.createElement('img')


init()

animate()

function addStyle() {
  let cssText = `
    body {
				background-color: #050505;
				background: radial-gradient(ellipse at center,  rgba(43,45,48,1) 0%,rgba(0,0,0,1) 100%);
			}
			.bond {
				width: 5px;
				height: 10px;
				background: #eee;
				display: block;
			}
  `
  let style = document.createElement('style')
  style.innerText = cssText
  document.head.appendChild(style)

}

function init() {

  addStyle()
  camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5e3)
  camera.position.z = 1e3
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()

  scene = new T.Scene()
  // scene.add(new T.AxesHelper(1e3))

  root = new T.Object3D()
  scene.add(root)

  webgl = new CSS3DRenderer()
  // webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  control = new TrackballControls(camera, webgl.domElement)
  // control.rotateSpeed = .5

  baseSprite.src = './textures/sprites/ball.png'
  baseSprite.onload = function () {
    loadMolecule(params.molecule)
  }

  window.addEventListener('resize', onWindowResize)

  const gui = new GUI()
  gui.add(params, 'vizType', VIZ_TYPE).onChange(changeVizType)
  gui.add(params, 'molecule', MOLECULES).onChange(loadMolecule)
  gui.open()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
}

function loadMolecule(molecule) {
  const url = './model/pdb/' + molecule

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    obj.parent.remove(obj)
  }

  objects.length = 0

  loader.load(url, (pdb) => {
    const geometryAtoms = pdb.geometryAtoms,
      geometryBonds = pdb.geometryBonds,
      json = pdb.json

    console.log('pdb', pdb)
    geometryAtoms.computeBoundingBox()
    geometryAtoms.boundingBox.getCenter(offset).negate()

    geometryAtoms.translate(offset.x, offset.y, offset.z)
    geometryBonds.translate(offset.x, offset.y, offset.z)

    const positionAtoms = geometryAtoms.getAttribute('position'),
      colorAtoms = geometryAtoms.getAttribute('color')

    const position = new T.Vector3(), color = new T.Color()
    // console.log(118, positionAtoms)
    for (let i = 0; i < positionAtoms.count; i++) {
      position.fromBufferAttribute(positionAtoms, i)
      color.fromBufferAttribute(colorAtoms, i)

      const atomJSON = json.atoms[i], element = atomJSON[4]

      if (!colorSpriteMap[element]) {
        const canvas = imageToCanvas(baseSprite),
          context = canvas.getContext('2d')
        colorify(context, canvas.width, canvas.height, color)
        const dataUrl = canvas.toDataURL()
        colorSpriteMap[element] = dataUrl
      }

      // console.log('colorSpriteMap', colorSpriteMap)

      const colorSprite = colorSpriteMap[element]

      const atom = document.createElement('img')
      atom.src = colorSprite

      const object = new CSS3DSprite(atom)
      object.position.copy(position)
      object.position.multiplyScalar(75)

      object.matrixAutoUpdate = false
      object.updateMatrix()

      root.add(object)
      objects.push(object)

    }

    const positionBonds = geometryBonds.getAttribute('position')

    const start = new T.Vector3(), end = new T.Vector3()
    // console.log(157, positionBonds)
    // debugger
    for (let i = 0; i < positionBonds.count; i += 2) {
      start.fromBufferAttribute(positionBonds, i)
      end.fromBufferAttribute(positionBonds, i + 1)

      start.multiplyScalar(75)
      end.multiplyScalar(75)

      temVec1.subVectors(end, start)
      const bondLength = temVec1.length() - 50

      let bond = document.createElement('div')
      bond.className = 'bond'
      bond.style.background = '#eee'
      bond.style.height = bondLength + 'px'

      let object = new CSS3DObject(bond)
      // console.log(171, object)
      object.position.copy(start)
      object.position.lerp(end, .5)
      object.userData.bondLengthShort = bondLength + 'px'
      object.userData.bondLengthFull = (bondLength + 55) + 'px'

      const axis = temVec2.set(0, 1, 0).cross(temVec1)
      const radians = Math.acos(temVec3.set(0, 1, 0).dot(temVec4.copy(temVec1).normalize()))

      const objMatrix = new T.Matrix4().makeRotationAxis(axis.normalize(), radians)
      object.matrix.copy(objMatrix)
      object.quaternion.setFromRotationMatrix(object.matrix)
      object.matrixAutoUpdate = false
      object.updateMatrix()

      root.add(object)
      objects.push(object)

      bond = document.createElement('div')
      bond.className = 'bond'
      bond.style.background = '#eee'
      bond.style.height = bondLength + 'px'

      const joint = new T.Object3D(bond)
      joint.position.copy(start)
      joint.position.lerp(end, .5)

      joint.matrix.copy(objMatrix)
      joint.quaternion.setFromRotationMatrix(joint.matrix)

      joint.matrixAutoUpdate = false
      joint.updateMatrix()

      object = new CSS3DObject(bond)
      // console.log(209, object)
      object.rotation.y = Math.PI / 2

      object.matrixAutoUpdate = false
      object.updateMatrix()

      object.userData.bondLengthShort = bondLength + 'px'
      object.userData.bondLengthFull = (bondLength + 55) + 'px'

      object.userData.joint = joint

      joint.add(object)
      root.add(joint)

      objects.push(object)


    }
    changeVizType(params.vizType)
  })

}

// pdb 内部 start 
function imageToCanvas(image) {

  const { width, height } = image

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0, width, height)
  return canvas
}

function colorify(ctx, width, height, color) {
  const { r, g, b } = color
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    data[i] *= r
    data[i + 1] *= g
    data[i + 2] *= b
  }
  ctx.putImageData(imageData, 0, 0)
}

function changeVizType(val) {
  if (val === 0) {
    showAtoms()
  } else if (val === 1) {
    showBonds()
  } else {
    showAtomsBonds()
  }
}

const showAtoms = () => {
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    if (obj instanceof CSS3DSprite) {
      obj.element.style.display = ''
      obj.visible = true
    } else {
      obj.element.style.display = 'none'
      obj.visible = false
    }
  }
},
  showBonds = () => {
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i]
      if (obj instanceof CSS3DSprite) {
        obj.element.style.display = 'none'
        obj.visible = false
      } else {
        obj.element.style.display = ''
        obj.element.style.height = obj.userData.bondLengthFull
        obj.visible = true
      }
    }
  },
  showAtomsBonds = () => {
    // console.log(296, objects)
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i]
      obj.element.style.display = ''
      obj.visible = true
      if (!(obj instanceof CSS3DSprite)) {
        obj.element.style.height = obj.userData.bondLengthShort
      }
    }
  }

// pdb 内部  end 



function animate() {
  // debugger
  requestAnimationFrame(animate)
  control.update()
  let t = Date.now() * 4e-4
  root.rotation.x = t
  root.rotation.y = t * 7e-1
  webgl.render(scene, camera)
}


