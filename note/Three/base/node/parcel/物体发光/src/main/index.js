console.log('index')

import * as T from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'



const scene = new T.Scene()

scene.add(new T.GridHelper(5e2))
scene.add(new T.AxesHelper(5e2))

const loader = new RGBELoader()
loader.load('./textures/Dosch-Space_0026_4k.hdr', bg => {
  scene.mapping = T.EquirectangularReflectionMapping
  scene.background = bg
  scene.environment = bg
})

const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(2e1, 1e1, 2e1)
scene.add(camera)

const webgl = new T.WebGLRenderer({
  antialias: true,
  alpha: true
})

webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
document.body.insertAdjacentElement('afterbegin', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)

const sphere = new T.Mesh(
  new T.SphereGeometry(2, 32, 32),
  new T.MeshBasicMaterial({
    color: 0xffaa33
  })
)
sphere.position.set(-10, 10, 0)
scene.add(sphere)

const cube = new T.Mesh(
  new T.BoxGeometry(2, 2, 2),
  new T.MeshBasicMaterial({
    emissive: 0x33ff33
  })
)
cube.position.set(0, 10, 0)
scene.add(cube)

const torusKnot = new T.Mesh(
  new T.TorusKnotGeometry(2, .5, 100, 16),
  new T.MeshStandardMaterial({
    emissive: 0x3333ff
  })
)
torusKnot.position.set(10, 10, 0)
scene.add(torusKnot)

const composer = new EffectComposer(webgl)
composer.setSize(window.innerWidth, window.innerHeight)

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

const effect = new UnrealBloomPass(
  new T.Vector2(window.innerWidth, window.innerHeight),
  0,
  10,
  1
)
effect.threshold = 0
effect.strength = 3
effect.radius = .5
composer.addPass(effect)











animate()

function animate() {
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
  controls?.update()
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('click', () => {
  cube.layers.set(1)
})

