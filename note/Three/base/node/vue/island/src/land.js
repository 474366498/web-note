console.log('main')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Water } from 'three/examples/jsm/objects/Water2'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

var scene, webgl, camera, orbit

init()

render()


function init() {
  scene = new T.Scene()
  // scene.add(new T.AxesHelper(5e2))

  camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 2e3)
  camera.position.set(-5e1, 5e1, 1.3e2)

  webgl = new T.WebGLRenderer({
    // 设置抗锯齿
    antialias: true,
    // 对数深度缓冲区
    logarithmicDepthBuffer: true
  })
  webgl.outputColorSpace = T.SRGBColorSpace

  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setClearColor(0xeeeeee)

  document.body.insertAdjacentElement('beforeend', webgl.domElement)

  orbit = new OrbitControls(camera, webgl.domElement)
  orbit.addEventListener('change', () => {
    render()
  })

  const light = new T.DirectionalLight(0xffffff, 1)
  light.position.set(-1e2, 2e2, 1e1)
  // scene.add(new T.DirectionalLightHelper(light))
  scene.add(light)

  initSky()

  initHdr()

  initWater()

  initIsland()

}

// 天空
function initSky() {
  let texture = new T.TextureLoader().load('./textures/sky.jpg')
  const skyGeo = new T.SphereGeometry(1e3, 6e1, 6e1)
  const skyMat = new T.MeshBasicMaterial({
    map: texture
  })
  skyGeo.scale(1, 1, -1)
  let sky = new T.Mesh(skyGeo, skyMat)
  scene.add(sky)

  const video = document.createElement('video')
  video.src = './textures/sky.mp4'
  video.loop = true
  window.addEventListener('click', () => {
    if (video.paused) {
      video.play()
      let texture = new T.VideoTexture(video)
      skyMat.map = texture
      skyMat.map.needsUpdate = true
    }
  })
}

// 环境纹理
function initHdr() {
  const hdrLoader = new RGBELoader()
  hdrLoader.loadAsync('./assets/050.hdr').then(texture => {
    texture.mapping = T.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })
}

// 添加水面
function initWater() {
  const waterGeo = new T.CircleGeometry(3e2, 64)
  const water = new Water(waterGeo, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new T.Vector2(1, 1),
    scale: 1
  })
  water.position.y = 3
  water.rotation.x = -Math.PI / 2
  scene.add(water)
}

// 添加小岛

function initIsland() {
  const loader = new GLTFLoader(),
    draco = new DRACOLoader()
  draco.setDecoderPath('./draco/')
  loader.setDRACOLoader(draco)
  loader.load('./model/island2.glb', gltf => {
    scene.add(gltf.scene)
  })

}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})

function render() {
  webgl.render(scene, camera)
  requestAnimationFrame(render)
}

