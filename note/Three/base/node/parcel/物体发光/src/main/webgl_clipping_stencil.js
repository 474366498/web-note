

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import Stats from 'three/examples/jsm/libs/stats.module'

var camera, scene, webgl, object, stats, control
var planes, planeObjects, planeHelper
var clock

const params = {
  animate: true,
  planeX: {
    constant: 0,
    negated: false,
    displayHelper: false
  },
  planeY: {
    constant: 0,
    negated: false,
    displayHelper: false
  },
  planeZ: {
    constant: 0,
    negated: false,
    displayHelper: false
  }
}


const addLight = () => {
  const dir = new T.DirectionalLight(0xffffff, 1)
  dir.position.set(5, 10, 7.5)
  dir.castShadow = true
  dir.shadow.camera.left = -2
  dir.shadow.camera.right = 2
  dir.shadow.camera.top = 2
  dir.shadow.camera.bottom = -2

  dir.shadow.mapSize.width = 1024
  dir.shadow.mapSize.height = 1024
  scene.add(dir)
},
  addPlanesHelper = () => {
    planes = [
      new T.Plane(new T.Vector3(-1, 0, 0), 0),
      new T.Plane(new T.Vector3(0, -1, 0), 0),
      new T.Plane(new T.Vector3(0, 0, -1), 0)
    ]
    planeHelper = planes.map(p => new T.PlaneHelper(p, 2, 0xffffff))
    planeHelper.forEach((p, i) => {
      p.visible = false
      p.name = `辅助对象${i + 1}`
      scene.add(p)
    })
    console.log(56, planeHelper)
  },
  addGeometry = () => {
    const geo = new T.TorusKnotGeometry(.4, .15, 220, 60)
    object = new T.Group()
    object.name = 'object_group'
    scene.add(object)

    planeObjects = []
    const planeGeo = new T.PlaneGeometry(4, 4)

    for (let i = 0; i < 3; i++) {
      const pGroup = new T.Group(),
        plane = planes[i],
        stencilGroup = createPlaneStencilGroup(geo, plane, i + 1)
      const planeMat = new T.MeshStandardMaterial({
        color: 0xff0000,
        metalness: .1,
        roughness: .75,
        clippingPlanes: planes.filter(p => p !== plane),
        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: T.NotEqualStencilFunc,
        stencilFail: T.ReplaceStencilOp,
        stencilZFail: T.ReplaceStencilOp,
        stencilZPass: T.ReplaceStencilOp
      })
      const po = new T.Mesh(planeGeo, planeMat)
      po.onAfterRender = function (render) {
        render.clearStencil()
      }
      po.renderOrder = i + 1.1

      object.add(stencilGroup)
      pGroup.name = `poGroup_${i + 1}`
      pGroup.add(po)
      planeObjects.push(po)
      scene.add(pGroup)
    }

    const material = new T.MeshStandardMaterial({
      color: 0xffc107,
      // color: 0xff0000,
      metalness: .1,
      roughness: .75,
      clippingPlanes: planes,
      clipShadows: true,
      shadowSide: T.DoubleSide
    })

    const clippedColorFront = new T.Mesh(geo, material)
    clippedColorFront.castShadow = true
    clippedColorFront.renderOrder = 6
    console.log('clippedColorFront', clippedColorFront)
    object.add(clippedColorFront)

    const ground = new T.Mesh(
      new T.PlaneGeometry(9, 9, 1, 1),
      new T.ShadowMaterial({ color: 0x000000, opacity: .25, side: T.DoubleSide })
    )
    ground.rotation.x = - Math.PI / 2
    ground.position.y = -1
    ground.receiveShadow = true
    scene.add(ground)
    console.log(118, scene.children)
  },
  addGUI = () => {
    const gui = new GUI()

    gui.add(params, 'animate')

    const folderX = gui.addFolder('planeX')
    folderX.add(params.planeX, 'displayHelper').onChange(v => planeHelper[0].visible = v)
    folderX.add(params.planeX, 'constant').min(-1).max(1).onChange(v => planes[0].constant = v)
    folderX.add(params.planeX, 'negated').onChange(() => {
      planes[0].negate()
      params.planeX.constant = planes[0].constant
    })
    folderX.open()

    const folderY = gui.addFolder('planeY')
    folderY.add(params.planeY, 'displayHelper').onChange(v => planeHelper[1].visible = v)
    folderY.add(params.planeY, 'constant').min(-1).max(1).onChange(v => planes[1].constant = v)
    folderY.add(params.planeY, 'negated').onChange(() => {
      planes[1].negate()
      params.planeY.constant = planes[1].constant
    })
    folderY.open()

    const folderZ = gui.addFolder('planeZ')
    folderZ.add(params.planeZ, 'displayHelper').onChange(v => planeHelper[2].visible = v)
    folderZ.add(params.planeZ, 'constant').min(-1).max(1).onChange(v => planes[2].constant = v)
    folderZ.add(params.planeZ, 'negated').onChange(() => {
      planes[2].negate()
      params.planeZ.constant = planes[2].constant
    })
    folderZ.open()

  }

function createPlaneStencilGroup(geo, plane, renderOrder) {
  const group = new T.Group(), baseMat = new T.MeshBasicMaterial()

  baseMat.depthWrite = false
  baseMat.depthTest = false
  baseMat.colorWrite = false
  baseMat.stencilWrite = true
  baseMat.stencilFunc = T.AlwaysStencilFunc

  // back faces
  const mat0 = baseMat.clone()
  mat0.side = T.BackSide
  mat0.clippingPlanes = [plane]
  mat0.stencilFail = T.IncrementWrapStencilOp
  mat0.stencilFail = T.IncrementWrapStencilOp
  mat0.stencilZPass = T.IncrementWrapStencilOp
  const mesh0 = new T.Mesh(geo, mat0)
  mesh0.renderOrder = renderOrder
  group.add(mesh0)

  // front faces

  const mat1 = baseMat.clone()
  mat1.side = T.FrontSide
  mat1.clippingPlanes = [plane]

  mat1.stencilFail = T.DecrementWrapStencilOp
  mat1.stencilZFail = T.DecrementWrapStencilOp
  mat1.stencilZPass = T.DecrementWrapStencilOp

  const mesh1 = new T.Mesh(geo, mat1)
  mesh1.renderOrder = renderOrder
  group.add(mesh1)

  return group

}

function init() {
  clock = new T.Clock()

  scene = new T.Scene()
  scene.add(new T.AxesHelper(10))

  camera = new T.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 1, 1e2)
  camera.position.set(2, 2, 2)

  scene.add(new T.AmbientLight(0xffffff, .5))

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.shadowMap.enabled = true
  webgl.localClippingEnabled = true  // 定义渲染器是否考虑对象级剪切平面。!!!!!!!
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setClearColor(0x263238)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.insertAdjacentElement('afterbegin', stats.dom)
  control = new OrbitControls(camera, webgl.domElement)
  control.minDistance = .1
  control.maxDistance = 40
  control.update()

  addLight()

  addPlanesHelper()

  addGeometry()

  addGUI()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })
}


function animate() {
  // debugger
  requestAnimationFrame(animate)
  let d = clock.getDelta()

  if (params.animate) {
    object.rotation.x += d * .5
    object.rotation.y += d * .2
  }

  for (let i = 0; i < planeObjects.length; i++) {
    const plane = planes[i],
      po = planeObjects[i]

    plane.coplanarPoint(po.position)

    po.lookAt(
      po.position.x - plane.normal.x,
      po.position.y - plane.normal.y,
      po.position.z - plane.normal.z,
    )

  }
  stats.update()
  webgl.render(scene, camera)


}


init()
animate()








