console.log('后期')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'


import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass'
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { MaskPass } from 'three/examples/jsm/postprocessing/MaskPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'

console.log(37, T)
const gui = new D.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(0, 0, 2)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(5))

const cubeTextureLoader = new T.CubeTextureLoader()
const envMapTexture = cubeTextureLoader.load([
  "textures/environmentMaps/0/px.jpg",
  "textures/environmentMaps/0/nx.jpg",
  "textures/environmentMaps/0/py.jpg",
  "textures/environmentMaps/0/ny.jpg",
  "textures/environmentMaps/0/pz.jpg",
  "textures/environmentMaps/0/nz.jpg",
])

scene.background = envMapTexture
scene.environment = envMapTexture

const directionLight = new T.DirectionalLight(0xffffff, 1)
directionLight.castShadow = true // 抽射阴影
directionLight.position.set(0, 0, 2e2)
scene.add(directionLight)

const gltfLoader = new GLTFLoader()
gltfLoader.load('./models/DamagedHelmet/glTF/DamagedHelmet.gltf', gltf => {
  console.log(47, gltf)
  const mesh = gltf.scene.children[0]
  scene.add(mesh)
})




const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

webgl.shadowMap.enabled = true

// 合成效果
const effectComposer = new EffectComposer(webgl)
effectComposer.setSize(window.innerWidth, window.innerHeight)

console.log(73, effectComposer)


// 合成渲染通道
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// 点效果  class DotScreenPass 继承 同级 的pass.js 中的 class Pass  
const dotScreenPass = new DotScreenPass({ x: window.innerWidth, y: window.innerHeight }, 50, 10)
dotScreenPass.enabled = false
// dotScreenPass.needsSwap = false
effectComposer.addPass(dotScreenPass)
console.log(80, DotScreenPass)

// 抗锯齿
const smaaPass = new SMAAPass()
effectComposer.addPass(smaaPass)

// 抗锯齿2
// const smaaRenderPass = new SSAARenderPass(scene, camera, 0xff0000, .1)
// effectComposer.addPass(smaaRenderPass)

// 发光效果   resolution, strength, radius, threshold
const unrealBloomPass = new UnrealBloomPass(new T.Vector2(128, 128), .2, 0, .1)
effectComposer.addPass(unrealBloomPass)

webgl.toneMapping = T.ACESFilmicToneMapping
webgl.toneMappingExposure = 1
unrealBloomPass.strength = .2

gui.add(webgl, 'toneMappingExposure').min(0).max(3).step(.05)

const unrealBloomPassGui = gui.addFolder('发光效果')
// console.log(101, unrealBloomPassGui)
unrealBloomPassGui.name = '发光~效果'
for (let key of ['strength', 'radius', 'threshold']) {
  // console.log(101, key)
  unrealBloomPassGui.add(unrealBloomPass, key).min(0).max(2).step(.05)
}

// 闪烁效果
const glitchPass = new GlitchPass(128)
// glitchPass.enabled = false
effectComposer.addPass(glitchPass)
// console.log(117, glitchPass)

setTimeout(() => {
  effectComposer.removePass(glitchPass)
}, 2e3);

const colorParams = {
  r: 0,
  g: 0,
  b: 0
}

// glsl 自定义着色器通道
const shaderPass = new ShaderPass({
  uniforms: {
    tDiffuse: {
      value: null
    },
    uColor: {
      value: new T.Color(colorParams.r, colorParams.g, colorParams.b)
    }
  },
  vertexShader: `
    varying vec2 vUv ; 
    void main () {
      vUv = uv ;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0) ;
    }
  
  ` ,
  fragmentShader: `
    varying vec2 vUv ;
    uniform sampler2D tDiffuse ;
    uniform vec3 uColor ;
    void main () {
      vec4 color = texture2D(tDiffuse , vUv);
      color.xyz += uColor ;
      gl_FragColor = color ;
    }

  `
})
// console.log(shaderPass)
effectComposer.addPass(shaderPass)

const shaderPassColor = gui.addFolder('着色器通道')
Object.keys(colorParams).forEach(key => {
  shaderPassColor.add(colorParams, key).min(-1).max(1).step(.05).onChange(val => {
    // console.log(167, key, val)
    shaderPass.uniforms.uColor.value[key] = val
  })
})

// 色调映射通道
const adPass = new AdaptiveToneMappingPass(true, 512)
effectComposer.addPass(adPass)
const adPassGui = gui.add(adPass, 'enabled').name('色调映射通道').onChange(val => {
  adPass.enabled = val
})
// console.log(176, adPassGui)

// 后像通道
const afterimageOptions = {
  damp: .96
}
const afterimagePass = new AfterimagePass(afterimageOptions.damp)
effectComposer.addPass(afterimagePass)
// console.log(182, afterimagePass)

gui.add(afterimageOptions, 'damp').name('后像通道 damp').min(0).max(2).step(.05).onChange(val => afterimagePass.uniforms.damp.value = val)

// 散景通道
const bokehOptions = {
  aperture: .01,
  aspect: .01,
  farClip: 1e3,
  focus: true,
  maxblur: 0,
  nearClip: .1
}

const bokehPass = new BokehPass(scene, camera, { ...bokehOptions })
effectComposer.addPass(bokehPass)
// console.log(195, bokehPass)

const bokehPassFolder = gui.addFolder('散景通道')
Object.keys(bokehOptions).forEach(key => {
  if (key !== 'focus') {
    bokehPassFolder.add(bokehOptions, key).min(0).max(key !== 'farClip' ? 1 : 1e4).step(key !== 'farClip' ? .01 : 1).onChange(val => bokehPass.uniforms[key].value = val)
  } else {
    bokehPassFolder.add(bokehOptions, key).onChange(val => bokehPass.uniforms[key].value = val)
  }
})

// ClearPass addPass 无效果 没有找到demo 
const clearPass = new ClearPass(0xffff00, .01)
clearPass.enabled = false
effectComposer.addPass(clearPass)

// CubeTexturePass addPass 无效果 没有找到demo
const cubePass = new CubeTexturePass(camera, { isCubeTexture: true, isRenderTargetTexture: false }, .01)
cubePass.enabled = false
effectComposer.addPass(cubePass)
console.log(234, cubePass)
// FilmPass
// HalftonePass
// LUTPass
// MaskPass
// OutlinePass

// SAOPass
// SavePass
// SSAOPass
// TexturePass






const controls = new OrbitControls(camera, webgl.domElement)
controls.enableDamping = true

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)

})

document.body.insertAdjacentElement('afterbegin', webgl.domElement)

animation()

const clock = new T.Clock()
function animation() {
  // webgl.render(scene, camera)
  effectComposer.render()
  requestAnimationFrame(animation)
}

