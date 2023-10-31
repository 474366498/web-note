console.log('烟花')

import * as T from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Water } from 'three/examples/jsm/objects/Water2'
import * as G from 'gsap'
import Fireworks from './firework'
import vertexShader from '../shader/flyLight/vertex.glsl'
import fragmentShader from '../shader/flyLight/fragment.glsl'


const scene = new T.Scene()

const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1e3)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(20, 50, 20)
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(50))

const spot = new T.SpotLight(0xffffff)
spot.position.set(0, 1e2, 0)
spot.shadow.mapSize.width = 1024
spot.shadow.mapSize.height = 1024
scene.add(spot)
// scene.add(new T.SpotLightHelper(spot))

const directional = new T.DirectionalLight(0xffffff, 1)
directional.position.set(80, 1e2, 80)
scene.add(directional)
// scene.add(new T.DirectionalLightHelper(directional))

const rgbeLoader = new RGBELoader(), gltfLoader = new GLTFLoader()

rgbeLoader.loadAsync('./assets/2k.hdr').then(bg => {
  bg.mapping = T.EquirectangularReflectionMapping
  scene.background = bg
  scene.environment = bg
})

gltfLoader.load('./assets/model/newyears_min.glb', glb => {
  console.log(glb.scene)
  scene.add(glb.scene)

  const water = new Water(new T.PlaneGeometry(1e2, 1e2), {
    color: 0xffffff,
    side: T.DoubleSide,
    scale: 4e2,
    textureWidth: 1024,
    textureHeight: 1024
  })
  water.position.y = .25
  water.rotation.x = - Math.PI / 2

  scene.add(water)
})




const flyMaterial = new T.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {},
  side: T.DoubleSide
})

var lightBox = null
gltfLoader.load('./assets/model/flyLight.glb', glb => {
  console.log(40, glb)
  lightBox = glb.scene
  lightBox.children[0].material = flyMaterial

  for (let i = 0; i < 2e2; i++) {
    let flyLight = lightBox.clone(true)
    let x = (Math.random() - .5) * 300,
      z = (Math.random() - .5) * 300,
      y = (Math.random() * 60) + 5
    flyLight.position.set(x, y, z)

    G.gsap.to(flyLight.rotation, {
      y: 2 * Math.PI,
      duration: 10 + Math.random() * 30,
      repeat: -1
    })
    G.gsap.to(flyLight.position, {
      x: `+=${Math.random() * 5}`,
      y: `+=${Math.random() * 20}`,
      yoyo: true,
      duration: 5 + Math.random() * 10,
      repeat: -1
    })
    scene.add(flyLight)
  }
  // lightBox.position.set(0, 10, 0)
  // scene.add(lightBox)

})





const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.outputColorSpace = T.SRGBColorSpace
webgl.toneMapping = T.ACESFilmicToneMapping
webgl.toneMappingExposure = .1

document.body.insertAdjacentElement('beforeend', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)
console.log(27, controls)
// controls.enableDamping = true
controls.addEventListener('change', () => animate)

window.addEventListener('resize', () => {
  webgl.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
var fireworks = []

function animate() {
  controls.update()
  fireworks && fireworks.forEach((f, i) => {
    let type = f?.update()
    if (type) {
      fireworks.splice(i, 1)
    }
  })
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()


// 设置创建烟花函数
function createFireworks() {
  for (let i = 0; i < 10; i++) {

    let color = `hsl(${Math.floor(Math.random() * 360)} , 100%, 80%)`
    /**
     x = (Math.random() - .5) * 300,
        z = (Math.random() - .5) * 300,
        y = (Math.random() * 60) + 5
     */
    let to = {
      x: (Math.random() - .5) * 300,
      z: - (Math.random() - .5) * 300,
      y: 45 + Math.random() * 20
    }
    let from = Object.assign({}, to, { y: Math.random() * 3 / 10 })
    // console.log(158, from)
    // 随机生成颜色和烟花放的位置
    let firework = new Fireworks(color, to, from)
    firework.addScene(scene, camera)
    fireworks && fireworks.push(firework)
  }
}

let timer
window.addEventListener('click', () => {
  // createFireworks
  if (timer) return
  timer = setInterval(() => {
    createFireworks()
  }, 2e3);
})


