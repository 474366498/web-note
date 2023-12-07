

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'

var camera, scene, webgl, composer, object, light, glitchPass, controls


init()

animate()


function init() {
  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.z = 4e2

  scene = new T.Scene()
  scene.fog = new T.Fog(0x000000, 1, 1e3)
  scene.add(new T.AxesHelper(5e2))

  object = new T.Object3D()
  scene.add(object)

  let geo = new T.SphereGeometry(1, 8, 16)
  for (let i = 0; i < 1e2; i++) {
    const material = new T.MeshPhongMaterial({ color: 0xffffff * Math.random(), flatShading: true })
    const mesh = new T.Mesh(geo, material)

    mesh.position.set(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize()
    mesh.position.multiplyScalar(Math.random() * 4e2)
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 5e1

    object.add(mesh)
  }

  scene.add(new T.AmbientLight(0x222222))

  light = new T.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  scene.add(light)

  scene.add(new T.DirectionalLightHelper(light))

  // postprocessing

  composer = new EffectComposer(webgl)
  composer.addPass(new RenderPass(scene, camera))

  glitchPass = new GlitchPass(1e2)
  composer.addPass(glitchPass)


  controls = new OrbitControls(camera, webgl.domElement)
  controls.enableZoom = true

  window.addEventListener('resize', onWindowResize)

}

function onWindowResize() {
  let w = window.innerWidth, h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()

  webgl.setSize(w, h)
  composer.setSize(w, h)
}


function animate() {
  requestAnimationFrame(animate)
  object.rotation.x += .001
  object.rotation.y += .002
  object.rotation.z += .0005

  composer.render()
  // webgl.render(scene, camera)
}










