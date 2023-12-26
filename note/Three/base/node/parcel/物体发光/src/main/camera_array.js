

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, scene, webgl, controls
var mesh
var AMOUNT = 2

init()
animate()


function init() {

  const ASPECT_RATIO = window.innerWidth / window.innerHeight
  const W = (window.innerWidth / AMOUNT) * window.devicePixelRatio,
    H = (window.innerHeight / AMOUNT) * window.devicePixelRatio

  const cameras = []
  for (let m = 0; m < AMOUNT; m++) {
    for (let n = 0; n < AMOUNT; n++) {
      const subCamera = new T.PerspectiveCamera(40, ASPECT_RATIO, .1, 1e2)
      subCamera.viewport = new T.Vector4(Math.floor(n * W), Math.floor(m * H), Math.ceil(W), Math.ceil(H))
      subCamera.position.x = (n / AMOUNT) - .5
      subCamera.position.y = .5 - (m / AMOUNT)
      subCamera.position.z = 1.5
      subCamera.position.multiplyScalar(2)
      subCamera.lookAt(0, 0, 0)
      subCamera.updateMatrixWorld()
      cameras.push(subCamera)

    }
  }

  console.log(35, cameras)

  camera = new T.ArrayCamera(cameras)
  camera.position.z = 3

  scene = new T.Scene()
  scene.add(new T.AmbientLight(0x222222))
  scene.add(new T.PolarGridHelper(50, 10, 4, 16, 0xff0000, 0xffff00))


  let light = new T.DirectionalLight()
  light.position.set(.5, .5, 1)
  light.castShadow = true
  light.shadow.camera.zoom = 4
  scene.add(light)
  scene.add(new T.DirectionalLightHelper(light))
  // WebGL warning: drawArraysInstanced: Drawing to a destination rect smaller than the viewport rect. (This warning will only be given once)
  const geoBackground = new T.PlaneGeometry(1e2, 1e2),
    matBackground = new T.MeshPhongMaterial({ color: 0x000066 })

  const background = new T.Mesh(geoBackground, matBackground)
  background.receiveShadow = true
  background.position.set(0, 0, -1)
  background.rotation.x = -Math.PI / 2
  scene.add(background)

  const geoCylinder = new T.CylinderGeometry(.5, .5, 1, 32),
    matCylinder = new T.MeshPhongMaterial({ color: 0xff0000 })

  mesh = new T.Mesh(geoCylinder, matCylinder)
  mesh.castShadow = true
  mesh.receiveShadow = true
  scene.add(mesh)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.shadowMap.enabled = true

  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  controls = new OrbitControls(camera.cameras[0], webgl.domElement)
  console.log(77, controls)
  window.addEventListener('resize', onWindowResize)

}

function onWindowResize() {
  const ASPECT_RATIO = window.innerWidth / window.innerHeight,
    W = (window.innerWidth / AMOUNT) * window.devicePixelRatio,
    H = (window.innerHeight / AMOUNT) * window.devicePixelRatio

  camera.aspect = ASPECT_RATIO
  camera.updateProjectionMatrix()

  for (let y = 0; y < AMOUNT; y++) {
    for (let x = 0; x < AMOUNT; x++) {
      let subCamera = camera.cameras[AMOUNT * y + x]
      subCamera.viewport.set(
        Math.floor(x * W),
        Math.floor(y * H),
        Math.ceil(W),
        Math.ceil(H)
      )
      subCamera.aspect = ASPECT_RATIO
      subCamera.updateProjectionMatrix()
    }
  }
  webgl.setSize(window.innerWidth, window.innerHeight)
}

function animate() {

  requestAnimationFrame(animate)

  mesh.rotation.x += 0.05
  mesh.rotation.y += .1

  webgl.render(scene, camera)

}










