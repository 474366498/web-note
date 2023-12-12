



import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


var mixer

const clock = new T.Clock()
const stats = new Stats()
document.body.insertAdjacentElement('afterbegin', stats.dom)

const webgl = new T.WebGLRenderer({ antialias: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
webgl.outputColorSpace = T.SRGBColorSpace
document.body.append(webgl.domElement)

const pmremGenerator = new T.PMREMGenerator(webgl)

const scene = new T.Scene()
scene.background = new T.Color(0xbfe3dd)
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), .84).texture

const camera = new T.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1e2)
camera.position.set(5, 2, 8)

const controls = new OrbitControls(camera, webgl.domElement)
controls.target.set(0, .5, 0)
controls.update()
controls.enablePan = false
controls.enableDamping = true

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('./model/LittlestTokyo.glb', gltf => {
  console.log(47, gltf)
  const model = gltf.scene
  model.position.set(1, 1, 0)
  model.scale.set(.02, .02, .02)
  scene.add(model)

  mixer = new T.AnimationMixer(model)
  mixer.clipAction(gltf.animations[0]).play()
  animate()
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })
}, process => {
  console.log(56, process)
}, err => {
  console.log(err)
})

function animate() {
  requestAnimationFrame(animate)
  let d = clock.getDelta()
  mixer.update(d)
  controls.update()
  stats.update()
  webgl.render(scene, camera)
}











