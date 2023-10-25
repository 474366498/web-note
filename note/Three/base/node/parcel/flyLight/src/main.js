console.log(1)

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import gsap from 'gsap'
import * as dat from 'dat.gui'

import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'


const scene = new T.Scene()

const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(10, -10, 10)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

// scene.add(new T.AxesHelper(5))

// 加载纹理
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('./assets/2k.hdr').then(bg => {
  console.log(28, bg)
  bg.mapping = T.EquirectangularReflectionMapping
  scene.background = bg
  scene.environment = bg
})

// 着色器材质
const shaderMaterial = new T.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {},
  side: T.DoubleSide
})

const gltfLoader = new GLTFLoader()
var lightBox = null

gltfLoader.load('./assets/model/flyLight.glb', glb => {
  console.log('glb', glb)
  lightBox = glb.scene.children[1]
  lightBox.material = shaderMaterial
  // scene.add(glb.scene)
  for (let i = 0; i < 2e2; i++) {
    let flyLight = glb.scene.clone(true)
    let x = (Math.random() - .5) * 3e2,
      z = (Math.random() - .5) * 3e2,
      y = Math.random() * 50 + 50
    flyLight.position.set(x, y, z)

    gsap.to(flyLight.rotation, {
      y: 2 * Math.PI,
      duration: 20 + Math.random() * 20,
      repeat: -1
    })

    gsap.to(flyLight.position, {
      x: '+=' + Math.random() * 5,
      y: '+=' + Math.random() * 20,
      yoyo: true,
      duration: 10 * Math.random() * 10,
      repeat: -1
    })


    scene.add(flyLight)
  }
}, function (xhr) {
  console.log(74, xhr, `${xhr.loaded / xhr.total * 100}%`)
})



const webgl = new T.WebGLRenderer({
  antialias: true,
  alpha: true
})

webgl.setSize(window.innerWidth, window.innerHeight)
webgl.outputColorSpace = T.SRGBColorSpace
// webgl.toneMapping = T.ACESFilmicToneMapping
// webgl.toneMapping = T.LinearToneMapping
// webgl.toneMapping = T.ReinhardToneMapping
webgl.toneMapping = T.CineonToneMapping
webgl.toneMappingExposure = .2

document.body.insertAdjacentElement('afterbegin', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)
// controls.enabled = true
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.minPolarAngle = Math.PI / 3
controls.maxPolarAngle = Math.PI
// controls.addEventListener('change', () => animate())

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
})

function animate() {
  controls?.update()
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()
