

import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var scene, webgl, composer, controls
var clearPass, texturePass, renderPass
var cameraP, cubeTexturePassP
var gui, stats

const params = {
  clearPass: true,
  clearColor: 'white',
  clearAlpha: 1,
  texturePass: true,
  texturePassOpacity: 1,
  cubeTexturePass: true,
  cubeTexturePassOpacity: 1,
  renderPass: true
}

initGui()

init()

animate()

function initGui() {
  if (gui) gui.destroy()

  gui = new GUI()

  gui.add(params, 'clearPass')
  gui.add(params, 'clearColor', ['black', 'white', 'blue', 'green', 'red'])
  gui.add(params, 'clearAlpha', 0, 1)

  gui.add(params, 'texturePass')
  gui.add(params, 'texturePassOpacity', 0, 1)

  gui.add(params, 'cubeTexturePass')
  gui.add(params, 'cubeTexturePassOpacity', 0, 1)

  gui.add(params, 'renderPass')

  gui.open()
}


function init() {
  const w = window.innerWidth, h = window.innerHeight, aspect = w / h

  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setSize(w, h)
  webgl.setPixelRatio(window.devicePixelRatio)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  cameraP = new T.PerspectiveCamera(65, aspect, 1, 10)
  cameraP.position.z = 7

  scene = new T.Scene()

  const group = new T.Group()
  scene.add(group)

  const light = new T.PointLight(0xddffdd, 1)
  light.position.set(70, -70, -70)
  scene.add(light)

  const light2 = new T.PointLight(0xffdddd, 1)
  light2.position.set(70, -70, 70)
  scene.add(light2)

  const light3 = new T.PointLight(0xddddff, 1)
  light3.position.set(70, 70, -70)
  scene.add(light3)

  const mesh = new T.Mesh(
    new T.SphereGeometry(1, 24, 24),
    new T.MeshStandardMaterial()
  )

  mesh.material.roughness = .5 * Math.random() + .25
  mesh.material.metalness = 0
  mesh.material.color.setHSL(Math.random(), 1, .3)
  group.add(mesh)

  const getCubeUrls = function (prefix, postfix) {
    return [
      prefix + 'px' + postfix, prefix + 'nx' + postfix,
      prefix + 'py' + postfix, prefix + 'ny' + postfix,
      prefix + 'pz' + postfix, prefix + 'nz' + postfix
    ]
  }

  composer = new EffectComposer(webgl)
  clearPass = new ClearPass(params.clearColor, params.clearAlpha)
  composer.addPass(clearPass)

  texturePass = new TexturePass()
  composer.addPass(texturePass)

  const textureLoader = new T.TextureLoader()
  textureLoader.load('./textures/hardwood2_diffuse.jpg', map => {
    texturePass.map = map
  })

  cubeTexturePassP = null

  const ldrUrls = getCubeUrls('./textures/pisa/', '.png')
  new T.CubeTextureLoader().load(ldrUrls, ldr => {
    cubeTexturePassP = new CubeTexturePass(cameraP, ldr)
    composer.insertPass(cubeTexturePassP, 2)
  })

  renderPass = new RenderPass(scene, cameraP)
  renderPass.clear = false
  composer.addPass(renderPass)

  const copyPass = new ShaderPass(CopyShader)
  composer.addPass(copyPass)

  controls = new OrbitControls(cameraP, webgl.domElement)
  controls.enableZoom = false

  window.addEventListener('resize', onWindowResize)

}

function onWindowResize() {
  const w = window.innerWidth, h = window.innerHeight, aspect = w / h

  cameraP.aspect = aspect
  cameraP.updateProjectionMatrix()
  webgl.setSize(w, h)
  composer.setSize(w, h)

}

function animate() {
  requestAnimationFrame(animate)
  // stats.update()
  // webgl.render(scene, cameraP)
  stats.begin()
  cameraP.updateMatrixWorld(true)
  let newColor = clearPass.clearColor

  switch (params.clearColor) {
    case 'blue': newColor = 0x0000ff; break;
    case 'red': newColor = 0xff0000; break;
    case 'green': newColor = 0x00ff00; break;
    case 'white': newColor = 0xffffff; break;
    case 'black': newColor = 0x000000; break;
  }
  clearPass.enabled = params.clearPass
  clearPass.clearColor = newColor
  clearPass.clearAlpha = params.clearAlpha

  texturePass.enabled = params.texturePass
  texturePass.opacity = params.texturePassOpacity

  if (cubeTexturePassP !== null) {
    cubeTexturePassP.enabled = params.cubeTexturePass
    cubeTexturePassP.opacity = params.cubeTexturePassOpacity
  }
  renderPass.enabled = params.renderPass
  composer.render()
  stats.end()
}


