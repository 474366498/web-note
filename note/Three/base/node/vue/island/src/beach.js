

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Water } from 'three/examples/jsm/objects/Water2'

const gui = new D.GUI(),
  scene = new T.Scene(),
  camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)

camera.position.set(5, 5, 5)

scene.add(camera)

scene.add(new T.AxesHelper(1e1))

const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('./assets/050.hdr').then(t => {
  t.mapping = T.EquirectangularReflectionMapping
  scene.background = t
  scene.environment = t
})

const gltfLoader = new GLTFLoader()
gltfLoader.load('./assets/model/yugang.glb', gltf => {
  console.log(gltf.scene.children)
  const yugang = gltf.scene.children[0]
  yugang.material.side = T.DoubleSide

  const waterGeo = gltf.scene.children[1].geometry
  const water = new Water(waterGeo, {
    color: '#ffffff',
    scale: 1,
    flowDirection: new T.Vector2(1, 1),
    textureWidth: 1024,
    textureHeight: 1024
  })
  console.log(water, yugang)
  scene.add(water)
  scene.add(yugang)
})

const light = new T.AmbientLight(0xffffff)
light.intensity = 10
scene.add(light)
// scene.add(new T.AmbientLightHelper())

const directionLight = new T.DirectionalLight(0xffffff, .9)
scene.add(directionLight)
scene.add(new T.DirectionalLightHelper(directionLight))

const webgl = new T.WebGLRenderer({ alpha: true, antialias: true })

webgl.outputColorSpace = T.SRGBColorSpace
webgl.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
})

document.body.insertAdjacentElement('afterend', webgl.domElement)

const orbit = new OrbitControls(camera, webgl.domElement)

const clock = new T.Clock()

console.log(75, clock, clock.getElapsedTime())

function animate() {
  let elapsedTime = clock.getElapsedTime()
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}
animate()



