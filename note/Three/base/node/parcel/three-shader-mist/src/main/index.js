console.log('index.js')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'
import { Water } from 'three/examples/jsm/objects/Water2'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const gui = new D.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(3, 4, 3)
camera.aspect = (window.innerWidth / window.innerHeight)
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(5))
/*
const water = new Water(
  new T.PlaneGeometry(4, 4, 2 ** 10, 2 ** 10),
  {
    color: 0xff0000,
    textureWidth: 2 ** 10,
    textureHeight: 2 ** 10,
    flowDirection: new T.Vector2(3, 1),
    flowSpeed: .05,
    reflectivity: .03,
    scale: .99
  }
)

water.rotation.x = - Math.PI / 2
scene.add(water)
*/

const rgbeLoader = new RGBELoader()
const gltfLoader = new GLTFLoader()

rgbeLoader.loadAsync('./assets/050.hdr').then(bg => {
  bg.mapping = T.EquirectangularReflectionMapping
  scene.background = bg
  scene.environment = bg
  onLoadGlb()
})

function onLoadGlb() {
  gltfLoader.load('./assets/model/yugang.glb', glb => {
    console.log(52, glb)
    const yugang = glb.scene.children[0]
    yugang.material.side = T.DoubleSide

    const waterGeo = glb.scene.children[1].geometry
    const water = new Water(waterGeo, {
      color: 0xffffff,
      textureWidth: 2 ** 10,
      textureHeight: 2 ** 10,
      flowDirection: new T.Vector2(3, 1),
      flowSpeed: .05,
      reflectivity: .03,
      scale: 1.25
    })
    scene.add(yugang)
    scene.add(water)
  })
}

const plane = new T.Mesh(
  new T.PlaneGeometry(2, 2),
  new T.MeshBasicMaterial()
)
plane.position.set(0, -.03, 0)
plane.rotation.x = -Math.PI / 2
scene.add(plane)
console.log(44, plane)





const point = new T.PointLight(0xffffff)
point.position.set(4, 4, 4)
scene.add(point)

scene.add(new T.PointLightHelper(point))






const webgl = new T.WebGLRenderer({ alpha: true, antialias: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.outputColorSpace = T.SRGBColorSpace
// webgl.toneMapping = T.ACESFilmicToneMapping

document.body.insertAdjacentElement('beforeend', webgl.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
})

const controls = new OrbitControls(camera, webgl.domElement)
controls.enableDamping = true
let clock = new T.Clock()

console.log(142, clock)

function animate() {
  const t = clock.getElapsedTime()
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()



