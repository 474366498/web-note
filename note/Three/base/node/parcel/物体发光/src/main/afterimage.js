

import * as T from 'three'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, scene, webgl, controls, composer, mesh

var afterimagePass

const params = {
  enable: true
}

init()
initGui()
animate()


function init() {
  camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.z = 4e2

  scene = new T.Scene()
  scene.fog = new T.Fog(0xffffff, 1, 1e3)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  mesh = new T.Mesh(
    new T.BoxGeometry(2e2, 2e2, 2e2),
    new T.MeshNormalMaterial()
  )
  scene.add(mesh)

  // postprocessing

  composer = new EffectComposer(webgl)
  composer.addPass(new RenderPass(scene, camera))

  afterimagePass = new AfterimagePass()
  composer.addPass(afterimagePass)

  window.addEventListener('resize', onWindowResize)

  controls = new OrbitControls(camera, webgl.domElement)


}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
}

function initGui() {
  const gui = new GUI({ name: 'Damp setting' })
  gui.add(afterimagePass.uniforms['damp'], 'value', 0, 1).step(.001)
  gui.add(params, 'enable')
}

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += .001
  mesh.rotation.y += .002
  mesh.rotation.z += .003
  params.enable ? composer.render() : webgl.render(scene, camera)
}

