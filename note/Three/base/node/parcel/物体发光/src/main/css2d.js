
import * as T from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'


var gui, camera, scene, webgl, label

const layers = {
  'Toggle Name': () => { camera.layers.toggle(0) },
  'Toggle Mass': () => { camera.layers.toggle(1) },
  'Enable All': () => { camera.layers.enableAll() },
  'Disable All': () => { camera.layers.disableAll() },

}


const clock = new T.Clock(), textureLoader = new T.TextureLoader()

var earth, moon

init()

animate()

function init() {

  const EARTH_RADIUS = 1, MOON_RADIUS = .27


  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2e2)
  camera.position.set(10, 5, 20)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
  camera.layers.enableAll()
  camera.layers.toggle(1)

  scene = new T.Scene()

  const dir = new T.DirectionalLight(0xffffff)
  dir.position.set(0, 0, 1)
  dir.layers.enableAll()
  scene.add(dir)


  const axes = new T.AxesHelper(5)
  axes.layers.enableAll()
  scene.add(axes)

  const earthGeo = new T.SphereGeometry(EARTH_RADIUS, 16, 16),
    earthMaterial = new T.MeshPhongMaterial({
      specular: 0x333333,
      shininess: 5,
      map: textureLoader.load('./textures/planets/earth_atmos_2048.jpg'),
      specularMap: textureLoader.load('./textures/planets/earth_specular_2048.jpg'),
      normalMap: textureLoader.load('./textures/planets/earth_normal_2048.jpg'),
      normalScale: new T.Vector2(.85, .85)
    })

  earth = new T.Mesh(earthGeo, earthMaterial)
  scene.add(earth)

  const moonGeo = new T.SphereGeometry(MOON_RADIUS, 16, 16),
    moonMaterial = new T.MeshPhongMaterial({
      shininess: 5,
      map: textureLoader.load('./textures/planets/moon_1024.jpg')
    })

  moon = new T.Mesh(moonGeo, moonMaterial)
  scene.add(moon)

  earth.layers.enableAll()
  moon.layers.enableAll()

  const earthDiv = document.createElement('div')
  earthDiv.className = 'label'
  earthDiv.textContent = 'Earth'
  earthDiv.style.marginTop = '-1em'
  const earthLabel = new CSS2DObject(earthDiv)
  earthLabel.position.set(0, EARTH_RADIUS, 0)
  earth.add(earthLabel)
  earthLabel.layers.set(0)

  const earthMassDiv = document.createElement('div')
  earthMassDiv.className = 'label'
  earthMassDiv.textContent = '5.97237e24 kg'
  earthMassDiv.style.marginTop = '-1em'
  const earthMassLabel = new CSS2DObject(earthMassDiv)
  earthMassLabel.position.set(0, -2 * EARTH_RADIUS, 0)
  earth.add(earthMassLabel)
  earthMassLabel.layers.set(0)

  const moonDiv = document.createElement('div')
  moonDiv.className = 'label'
  moonDiv.textContent = 'Moon'
  moonDiv.style.marginTop = '-1em'
  const moonLabel = new CSS2DObject(moonDiv)
  moonLabel.position.set(0, MOON_RADIUS, 0)
  moon.add(moonLabel)
  moonLabel.layers.set(0)

  const moonMassDiv = document.createElement('div')
  moonMassDiv.className = 'label'
  moonMassDiv.textContent = '7.342e22 kg'
  moonMassDiv.style.marginTop = '-1em'
  const moonMassLabel = new CSS2DObject(moonMassDiv)
  moonMassLabel.position.set(0, -2 * MOON_RADIUS, 0)
  moon.add(moonMassLabel)
  moonMassLabel.layers.set(0)



  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  label = new CSS2DRenderer()
  label.setSize(window.innerWidth, window.innerHeight)
  label.domElement.style.position = 'absolute'
  label.domElement.style.top = '0'
  document.body.appendChild(label.domElement)

  const control = new OrbitControls(camera, label.domElement)
  control.minDistance = 5
  control.maxDistance = 2e2

  console.log(99, webgl, scene, moonMassLabel)

  window.addEventListener('resize', onWindowResize)
  initGui()

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  label.setSize(window.innerWidth, window.innerHeight)
}

function initGui() {
  gui = new GUI()
  gui.add(layers, 'Toggle Name');
  gui.add(layers, 'Toggle Mass');
  gui.add(layers, 'Enable All');
  gui.add(layers, 'Disable All');


}


function animate() {
  // debugger
  requestAnimationFrame(animate)
  let t = clock.getElapsedTime()
  moon.position.set(Math.sin(t) * 5, 0, Math.cos(t) * 5)
  webgl.render(scene, camera)
  label.render(scene, camera)
}




