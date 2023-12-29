

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
// import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from './other/CSS3DRenderer'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
var camera, scene, webgl, scene2, webgl2, control

const frustumSize = 5e2

init()

animate()


function init() {

  let aspect = window.innerWidth / window.innerHeight
  camera = new T.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 1, 1e3)
  camera.position.set(-2e2, 2e2, 2e2)

  scene = new T.Scene()
  // scene.add(new T.AxesHelper(5e2))
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
  webgl2.domElement.style.position = 'absolute'
  webgl2.domElement.style.top = 0
  webgl2.domElement.style.pointerEvents = 'none'
  document.body.appendChild(webgl2.domElement)

  control = new OrbitControls(camera, webgl2.domElement)
  control.minZoom = .5
  control.maxZoom = 2
  console.log(74, camera)
  window.addEventListener('resize', onWindowResize)
  // initGui()
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
  mesh.position.copy(obj.position)
  mesh.rotation.copy(obj.rotation)
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

function initGui() {
  console.log(116, GUI)
  const gui = new GUI()

  const folder1 = gui.addFolder('camera setViewOffset').open()

  const settings = {
    'setViewOffset'() {
      console.log('setViewOffset', folder1)
      folder1.children[1].enable().setValue(window.innerWidth);
      folder1.children[2].enable().setValue(window.innerHeight);
      folder1.children[3].enable().setValue(0);
      folder1.children[4].enable().setValue(0);
      folder1.children[5].enable().setValue(window.innerWidth);
      folder1.children[6].enable().setValue(window.innerHeight);
      // for (let i = 1; i < folder1.children.length - 1; i++) {
      //   let p = folder1.children[i].property
      //   console.log(127, p, /width/gi.test(p))
      //   folder1.children[i].enable().setValue(/width/gi.test(p) ? window.innerWidth : /height/gi.test(p) ? window.innerHeight : 0)
      // }
    },
    'fullWidth': 0,
    'fullHeight': 0,
    'offsetX': 0,
    'offsetY': 0,
    'width': 0,
    'height': 0,
    'clearViewOffset'() {
      console.log('clearViewOffset')
      folder1.children[1].setValue(0).disable();
      folder1.children[2].setValue(0).disable();
      folder1.children[3].setValue(0).disable();
      folder1.children[4].setValue(0).disable();
      folder1.children[5].setValue(0).disable();
      folder1.children[6].setValue(0).disable();
      // for (let i = 1; i < folder1.children.length - 1; i++) {
      //   folder1.children[i].disable().setValue(0)
      // }
      camera.clearViewOffset();
    }
  }

  folder1.add(settings, 'setViewOffset')

  folder1.add(settings, 'fullWidth', window.screen.width / 4, window.screen.width * 2, 1).onChange(val => updateCameraViewOffset({ fullWidth: val })).disable()
  folder1.add(settings, 'fullHeight', window.screen.height / 4, window.screen.height * 2, 1).onChange(val => updateCameraViewOffset({ fullHeight: val })).disable()
  folder1.add(settings, 'offsetX', 0, 256, 1).onChange(val => updateCameraViewOffset({ offsetX: val })).disable()
  folder1.add(settings, 'offsetY', 0, 256, 1).onChange(val => updateCameraViewOffset({ offsetY: val })).disable()
  folder1.add(settings, 'width', window.screen.width / 4, window.screen.width * 2, 1).onChange(val => updateCameraViewOffset({ width: val })).disable()
  folder1.add(settings, 'height', window.screen.height / 4, window.screen.height * 2, 1).onChange(val => updateCameraViewOffset({ height: val })).disable()
  folder1.add(settings, 'clearViewOffset')

}

function updateCameraViewOffset({ fullWidth, fullHeight, offsetX, offsetY, width, height }) {
  console.log(159, fullWidth, fullHeight, offsetX, offsetY, width, height)
  if (!camera.view) {
    camera.setViewOffset(fullWidth || window.innerWidth,
      fullHeight || window.innerHeight,
      offsetX || 0,
      offsetY || 0,
      width || window.innerWidth,
      height || window.innerHeight)

  } else {
    camera.setViewOffset(fullWidth || camera.view.fullWidth,
      fullHeight || camera.view.fullHeight,
      offsetX || camera.view.offsetX,
      offsetY || camera.view.offsetY,
      width || camera.view.width,
      height || camera.view.height)

  }
  camera.updateProjectionMatrix()
  // scene2.updateMatrixWorld(true)
  // scene2.updateWorldMatrix(true, true)
  console.log(camera.view, scene2)
}


function animate() {
  // debugger
  requestAnimationFrame(animate)
  let t = Date.now() * 4e-5
  scene.rotation.y = t
  scene2.rotation.y = t
  webgl.render(scene, camera)
  webgl2.render(scene2, camera)

}
