

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

var camera, scene, webgl, scene2, webgl2, control

const frustumSize = 5e2

init()

animate()


function init() {

  let aspect = window.innerWidth / window.innerHeight
  camera = new T.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1e3)
  camera.position.set(-2e2, 2e2, 2e2)

  scene = new T.Scene()
  scene.add(new T.AxesHelper(5e2))
  scene.background = new T.Color(0xf0f0f0)

  scene2 = new T.Scene()

  const material = new T.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 1,
    side: T.DoubleSide
  })
  console.log('T.MathUtils', T.MathUtils)
  // left 
  createPlane(
    'left', 1e2, 1e2, 'red', new T.Vector3(-50, 0, 0), new T.Euler(0, -90 * T.MathUtils.DEG2RAD, 0), material
  )

  // leftBack

  createPlane(
    'left-back', 1e2, 1e2, 'white', new T.Vector3(0, 0, -50), new T.Euler(0, -.1 * T.MathUtils.DEG2RAD, 0), material
  )

  // right 
  createPlane('right', 1e2, 1e2, 'blue', new T.Vector3(0, 0, 50), new T.Euler(0, 0, 0), material)

  // rightBack
  createPlane('right', 1e2, 1e2, 'black', new T.Vector3(50, 0, 15), new T.Euler(0, 90 * T.MathUtils.DEG2RAD, 0), material)

  // top 
  createPlane('top', 1e2, 1e2, 'green', new T.Vector3(0, 50, 0), new T.Euler(-90 * T.MathUtils.DEG2RAD, 0, 0), material)
  // bottom 
  createPlane('bottom', 1e2, 1e2, 'yellow', new T.Vector3(0, -48, 0), new T.Euler(-90 * T.MathUtils.DEG2RAD, 0, 0), material)

  // bottomBig
  createPlane('bottom-big', 3e2, 3e2, 'seagreen', new T.Vector3(0, -50, 0), new T.Euler(-90 * T.MathUtils.DEG2RAD, 0, 0), material)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  webgl2 = new CSS3DRenderer()
  webgl2.setSize(window.innerWidth, window.innerHeight)
  webgl.domElement.style.position = 'absolute'
  webgl.domElement.style.top = 0
  document.body.appendChild(webgl2.domElement)

  control = new OrbitControls(camera, webgl2.domElement)
  control.minZoom = .5
  control.maxZoom = 2

  window.addEventListener('resize', onWindowResize)

}

function createPlane(name, width, height, cssColor, pos, rot, material) {
  let el = document.createElement('div')
  el.className = name
  el.style.width = width + 'px'
  el.style.height = height + 'px'
  el.style.opacity = .75
  el.style.background = cssColor

  const obj = new CSS3DObject(el)
  obj.position.copy(pos)
  obj.rotation.copy(rot)
  scene2.add(obj)

  const mesh = new T.Mesh(
    new T.PlaneGeometry(width, height),
    material
  )
  mesh.position.copy(pos)
  mesh.rotation.copy(rot)
  scene.add(mesh)

}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight

  camera.left = - frustumSize * aspect / 2
  camera.right = frustumSize * aspect / 2
  camera.top = frustumSize / 2
  camera.bottom = - frustumSize / 2

  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl2.setSize(window.innerWidth, window.innerHeight)
}



function animate() {
  // debugger
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
  webgl2.render(scene2, camera)

}
