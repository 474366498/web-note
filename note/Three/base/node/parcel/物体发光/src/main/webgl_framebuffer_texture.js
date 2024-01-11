


import * as T from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as GeoUtils from 'three/examples/jsm/utils/GeometryUtils'


var camera, scene, webgl, control

var line, sprite, texture

var cameraOrtho, sceneOrtho

let offset = 0

const dpr = window.devicePixelRatio, textureSize = 128 * dpr, vector = new T.Vector2(), color = new T.Color()

const addElement = () => {
  let d = document.createElement('div')
  d.id = 'warning'
  document.body.appendChild(d)
  let s = document.createElement('style')
  s.innerText = `
  body{
    background-color:black;
  }
  #warning{
    position: fixed;
    left:50%;
    top:50%;
    margin:-64px 0 0 -64px;
    height: 128px;
    width: 128px;
    border: 1px solid white;
  }
  `
  document.head.appendChild(s)
}

function init() {
  addElement()

  const width = window.innerWidth, height = window.innerHeight

  camera = new T.PerspectiveCamera(70, width / height, 1, 1e3)
  camera.position.z = 4e1

  cameraOrtho = new T.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 2e1)
  cameraOrtho.position.z = 2e1

  scene = new T.Scene()
  sceneOrtho = new T.Scene()

  const points = GeoUtils.gosper(16)
  const geometry = new T.BufferGeometry()
  const positionAttribute = new T.Float32BufferAttribute(points, 3)
  geometry.setAttribute('position', positionAttribute)
  geometry.center()

  const colorAttribute = new T.BufferAttribute(new Float32Array(positionAttribute.array.length), 3)
  colorAttribute.setUsage(T.DynamicDrawUsage)
  geometry.setAttribute('color', colorAttribute)

  const material = new T.LineBasicMaterial({ vertexColors: true })

  line = new T.Line(geometry, material)
  line.scale.setScalar(.05)
  scene.add(line)
  console.log(72, line)

  texture = new T.FramebufferTexture(textureSize, textureSize, T.RGBAFormat)
  texture.minFilter = T.NearestFilter
  texture.magFilter = T.NearestFilter

  console.log(texture)

  sprite = new T.Sprite(new T.SpriteMaterial({ map: texture }))
  sprite.scale.set(textureSize, textureSize, 1)
  sceneOrtho.add(sprite)
  // scene.add(sprite)
  updateSpritePosition()


  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(width, height)
  webgl.autoClear = false
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)


  control = new OrbitControls(camera, webgl.domElement)

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  const width = window.innerWidth, height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  cameraOrtho.left = -width / 2
  cameraOrtho.right = width / 2
  cameraOrtho.top = height / 2
  cameraOrtho.bottom = -height / 2
  cameraOrtho.updateProjectionMatrix()

  webgl.setSize(width, height)
  updateSpritePosition()
}

function updateSpritePosition() {

  const halfW = window.innerWidth / 2,
    halfH = window.innerHeight / 2,
    halfImgW = textureSize / 2,
    halfImgH = textureSize / 2

  sprite.position.set(-halfW + halfImgW, halfH - halfImgH, 1)

}

const updateColors = colorAttributes => {
  // console.log(102, colorAttributes)
  const l = colorAttributes.count

  for (let i = 0; i < l; i++) {
    const h = ((offset + i) % l) / l
    color.setHSL(h, 1, .5)
    colorAttributes.setXYZ(i, color.r, color.b, color.g)
  }
  colorAttributes.needsUpdate = true
  // console.log(112, color, colorAttributes)
  offset -= 25
}, updatePosition = positionAttribute => {
  const l = positionAttribute.count
  console.log(140, positionAttribute)
  for (let i = 0; i < l; i++) {
    const h = ((offset + i) % l) / l + 25

    positionAttribute.setZ(i, h)
  }
  positionAttribute.needsUpdate = true
}


function animate() {
  // debugger
  requestAnimationFrame(animate)

  const colorAttribute = line.geometry.getAttribute('color'),
    positions = line.geometry.getAttribute('position')

  // console.log(146, positions)
  updateColors(colorAttribute)
  // updatePosition(positions)
  webgl.clear()
  webgl.render(scene, camera)

  vector.x = (window.innerWidth * dpr / 2) - (textureSize / 2)
  vector.y = (window.innerHeight * dpr / 2) - (textureSize / 2)

  webgl.copyFramebufferToTexture(vector, texture)
  webgl.clearDepth()
  webgl.render(sceneOrtho, cameraOrtho)
}


init()

animate()


