

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { Water } from 'three/examples/jsm/objects/Water2'


const gui = new D.GUI()
const scene = new T.Scene()

const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 2e3)
camera.position.set(-150, 80, 230)
scene.add(camera)

scene.add(new T.AxesHelper(250))

let waterGeo = new T.CircleGeometry(5e2, 1024)
let water = new Water(waterGeo, {
  color: '#ffffff',
  scale: 1,
  flowDirection: new T.Vector2(1, 1),
  textureWidth: 1024,
  textureHeight: 1024
})

water.position.y = 3
water.rotation.x = -Math.PI / 2

scene.add(water)

const video = document.createElement('video')
video.src = './textures/sky.mp4'
video.loop = true

let videoTexture = new T.VideoTexture(video)
scene.background = videoTexture
scene.environment = videoTexture

const geo = new T.SphereGeometry(1e3, 32, 32)
const material = new T.MeshBasicMaterial({
  map: videoTexture
})
const sphere = new T.Mesh(geo, material)
sphere.geometry.scale(1, 1, -1)
scene.add(sphere)

const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('./assets/050.hdr').then(t => {
  t.mapping = T.EquirectangularReflectionMapping
  scene.background = t
  scene.environment = t
})

const gltfLoader = new GLTFLoader(),
  dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('./draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()

gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('./model/island.glb', glb => {
  video.play()
  glb.scene.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }

    if (child.name == 'sea') {
      console.log('sea', child)
    }
    if (child.name == 'Plane') {
      console.log('plane', child)
    }
    if (child.name == 'Plane_2' || child.name == 'Plane_3') {
      child.visible = false
    }

    if (child.material && child.material.name == 'sea') {
      child.visible = false
    }
  })
  scene.add(glb.scene)
})

const directionalLight = new T.DirectionalLight(0xffffff, .5)
directionalLight.position.set(-100, 150, 50)
directionalLight.castShadow = true
directionalLight.shadow.camera.left = -40
directionalLight.shadow.camera.right = 40
directionalLight.shadow.camera.top = 40
directionalLight.shadow.camera.bottom = -40
directionalLight.shadow.camera.far = 1e2
directionalLight.shadow.bias = .0000001
directionalLight.shadow.radius = 5
directionalLight.shadow.mapSize.set(10240, 10240)

scene.add(directionalLight)
scene.add(new T.DirectionalLightHelper(directionalLight))

const webgl = new T.WebGLRenderer({
  alpha: true,
  antialias: true,
  physicallyCorrectLights: true,
  logarithmicDepthBuffer: true
})
webgl.outputColorSpace = T.SRGBColorSpace
webgl.toneMapping = T.ACESFilmicToneMapping
webgl.shadowMap.enabled = true

webgl.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
})

document.body.insertAdjacentElement('beforebegin', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)
controls.target.set(0, 20, 0)

const clock = new T.Clock()

function animate() {
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

// gsap.to(camera.position, {
//   duration: 10,
//   x: 150,
//   y: 60,
//   z: -230,
//   ease: 'power3.inOut',
//   yoyo: true,
//   repeat: -1,
//   onUpdate: () => {
//     camera.lookAt(new T.Vector3(0, 20, 0))
//   }
// })

animate()