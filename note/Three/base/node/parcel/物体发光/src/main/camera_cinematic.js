


import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, scene, ray, webgl, stats, control


const mouse = new T.Vector2()

let INTERSECTED
const radius = 1e2
let theta = 0

init()

animate()


function init() {

  camera = new CinematicCamera(60, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.setLens(5)
  camera.position.set(2, 1, 5e2)

  scene = new T.Scene()
  scene.background = new T.Color(0xf0f0f0)
  // scene.add(new T.PolarGridHelper(5e2, 20, 10, 32, 0xff0000, 0xffff00))

  scene.add(new T.AmbientLight(0xffffff, .3))

  const light = new T.DirectionalLight(0xffffff, .35)
  light.position.set(1, 1, 1).normalize()
  scene.add(light)

  const geo = new T.BoxGeometry(20, 20, 20)

  for (let i = 0; i < 4e2; i++) {
    const obj = new T.Mesh(geo, new T.MeshLambertMaterial({ color: Math.random() * 0xffffff }))
    obj.position.x = Math.random() * 800 - 400
    obj.position.y = Math.random() * 800 - 400
    obj.position.z = Math.random() * 800 - 400
    scene.add(obj)
  }

  ray = new T.Raycaster()

  initGui()

  webgl = new T.WebGLRenderer({ antialias: true })
  // webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  // control = new OrbitControls(camera, webgl.domElement)

  document.addEventListener('mousemove', onWindowMouseMove)
  window.addEventListener('resize', onWindowResize)

}

function initGui() {

  const effectController = {
    focalLength: 15,
    fstop: 2.8,
    showFocus: false,
    focalDepth: 3
  }
  const gui = new GUI()

  gui.add(effectController, 'focalLength', 1, 1e2, .1).onChange((e) => matChanger(e))
  gui.add(effectController, 'fstop', 1.8, 22, .01).onChange((e) => matChanger(e))
  gui.add(effectController, 'focalDepth', .1, 1e2, .01).onChange((e) => matChanger(e))
  gui.add(effectController, 'showFocus', true).onChange((e) => matChanger(e))

  const matChanger = function (v) {
    console.log(86, camera.postprocessing.bokeh_uniforms, v)
    for (const e in effectController) {
      if (e in camera.postprocessing.bokeh_uniforms) {
        camera.postprocessing.bokeh_uniforms[e].value = effectController[e]
      }
    }
    camera.postprocessing.bokeh_uniforms['znear'].value = camera.near
    camera.postprocessing.bokeh_uniforms['zfar'].value = camera.far
    camera.setLens(effectController.focalLength, camera.frameHeight, effectController.fstop, camera.coc)
    effectController['focalDepth'] = camera.postprocessing.bokeh_uniforms['focalDepth'].value

  }
  matChanger()
}

function onWindowMouseMove(event) {
  event.preventDefault()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  // console.log(104, mouse)
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)

}


function animate() {
  requestAnimationFrame(animate, webgl.domElement)
  // debugger
  render()

  stats.update()


  // webgl.render(scene, camera)

}


function render() {

  theta += .05

  camera.position.x = radius * Math.sin(T.MathUtils.degToRad(theta))
  camera.position.y = radius * Math.sin(T.MathUtils.degToRad(theta))
  camera.position.z = radius * Math.cos(T.MathUtils.degToRad(theta))
  camera.lookAt(scene.position);
  camera.updateMatrixWorld()


  ray.setFromCamera(mouse, camera)

  const intersects = ray.intersectObjects(scene.children, false)
  // console.log(136, mouse, intersects)

  if (intersects.length > 0) {
    let dis = intersects[0].distance
    camera.focusAt(dis)
    // debugger
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex)
      INTERSECTED = intersects[0].object
      // console.log(145, INTERSECTED)   emissive
      // INTERSECTED.currentHex = INTERSECTED.material.[color(@137)/emissive(@159用的这个 )].getHex()
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex()
      INTERSECTED.material.color.setHex(0xff0000)
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex)
    INTERSECTED = null
  }



  if (camera.postprocessing.enabled) {
    camera.renderCinematic(scene, webgl)
  } else {
    scene.overrideMaterial = null
    webgl.clear()
    webgl.render(scene, camera)
  }

}
