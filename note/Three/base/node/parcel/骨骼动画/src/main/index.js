

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'

import * as dat from 'dat.gui'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const loader = new RGBELoader(),
  gltfLoader = new GLTFLoader(),
  dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('./draco/gltf/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()
gltfLoader.setDRACOLoader(dracoLoader)



const scene = new T.Scene()

const camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(0, 0, 2e1)
scene.add(camera)

scene.add(new T.AxesHelper(5e2))

const light = new T.DirectionalLight(0xffffff, 2)
light.position.set(0, 1e2, -1e2)
scene.add(light)
scene.add(new T.DirectionalLightHelper(light))

const spot = new T.SpotLight(0xffffff)
spot.position.set(0, 0, 1e1)
scene.add(spot)
scene.add(new T.SpotLightHelper(spot))

const sphere = new T.Mesh(
  new T.SphereGeometry(1, 32, 32),
  new T.MeshStandardMaterial({
    color: 0xffffff,
    metalness: .2,
    transparent: true,
    side: T.DoubleSide,
  })
)
sphere.position.y = -1
scene.add(sphere)


loader.load('./textures/038.hdr', bg => {
  bg.mapping = T.EquirectangularReflectionMapping
  scene.background = bg
  scene.environment = bg
})

const webgl = new T.WebGLRenderer({
  antialias: true,
  alpha: true
})
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
webgl.shadowMap.enabled = true
webgl.physicallyCorrectLights = true
webgl.setClearColor(0xcccccc, 1)

document.body.insertAdjacentElement('afterbegin', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)
controls.enableDamping = true

var textureLoad = new T.TextureLoader(),
  texture = textureLoad.load('./textures/cloth_pos.png'),
  normalMap = textureLoad.load('./texture/cloth_norm.png')

texture.wrapS = T.RepeatWrapping
texture.wrapT = T.RepeatWrapping
texture.repeat.set(.2, .2)

normalMap.wrapS = T.RepeatWrapping
normalMap.wrapT = T.RepeatWrapping
normalMap.repeat.set(.2, .2)
texture.offset.set(0, 0)

initGlb()




var mixer, action
function initGlb() {
  gltfLoader.load('./model/jianshen1.glb', gltf => {
    console.log(58, gltf)

    gltf.scene.traverse(child => {
      // if (child.name == 'Body') {
      //   console.log(child)
      // } else if (child.name == 'Floor') {
      //   child.material = new T.MeshStandardMaterial({
      //     color: 0xffffff
      //   })
      // }
      // if (child.isMesh) {
      //   child.material.depthWrite = true
      //   child.material.normalScale = new T.Vector2(1, 1)
      //   child.material.side = T.FrontSide
      //   child.material.transparent = false
      //   child.material.vertexColors = false
      // }
      if (child.isMesh) {
        child.material = new T.MeshStandardMaterial({
          map: texture,
          emissiveMap: texture,
          side: T.DoubleSide,
          transparent: true,
          blending: T.AdditiveBlending,
          depthWrite: false,
          normalMap
        })
      }

    })
    scene.add(gltf.scene)
    console.log(91, scene)
    mixer = new T.AnimationMixer(gltf.scene)
    action = mixer.clipAction(gltf.animations[0])
    action.play()
    action.timeScale = 4

  })
}

const clock = new T.Clock()

function animation() {
  let t = clock?.getDelta()
  // console.log(111, t)
  webgl.render(scene, camera)
  mixer && mixer.update(t)
  controls?.update()
  requestAnimationFrame(animation)
}

animation()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)
})