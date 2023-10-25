console.log('index.js')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'

import vertex from '../shaders/water/vertex.glsl'
import fragment from '../shaders/water/fragment.glsl'

const gui = new D.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(3, 4, 3)
camera.aspect = (window.innerWidth / window.innerHeight)
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(5))


const params = {
  uWaresFrequency: 5.0,  // 产品频率
  uScale: .1,           // x 缩放比例
  uXzScale: 1,          // x z缩放比例
  uNoiseFrequency: 45,  // 噪声频率
  uNoiseScale: .5,     // 噪音规模
  uLowColor: '#ff0000',  // 低色
  uHighColor: '#ffff00', // 高色
  uXspeed: .4,         // x速度
  uZspeed: 1.8,         // z速度
  uNoiseSpeed: 1.56,     // 噪音速度
  uOpacity: .56        // 透明度
}

const shaderMaterial = new T.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uWaresFrequency: {
      value: params.uWaresFrequency
    },
    uScale: {
      value: params.uScale
    },
    uXzScale: {
      value: params.uXzScale
    },
    uNoiseFrequency: {
      value: params.uNoiseFrequency
    },
    uNoiseScale: {
      value: params.uNoiseScale
    },
    uLowColor: {
      value: new T.Color(params.uLowColor)
    },
    uHighColor: {
      value: new T.Color(params.uHighColor)
    },
    uXspeed: {
      value: params.uXspeed
    },
    uZspeed: {
      value: params.uZspeed
    },
    uNoiseSpeed: {
      value: params.uNoiseSpeed
    },
    uOpacity: {
      value: params.uOpacity
    },
    uTime: {
      value: params?.uTime | 1
    }
  },
  side: T.DoubleSide,
  transparent: true
})

gui.add(params, 'uWaresFrequency').min(1).max(1e2).step(.1).onChange(val => onChangeMaterialUniforms('uWaresFrequency', val))
gui.add(params, 'uScale').min(0).max(.2).step(.001).onChange(val => onChangeMaterialUniforms('uScale', val))
gui.add(params, 'uXzScale').min(0).max(5).step(.1).onChange(val => onChangeMaterialUniforms('uXzScale', val))
gui.add(params, 'uNoiseFrequency').min(1).max(1e2).step(.1).onChange(val => onChangeMaterialUniforms('uNoiseFrequency', val))
gui.add(params, 'uNoiseScale').min(0).max(5).step(.001).onChange(val => onChangeMaterialUniforms('uNoiseScale', val))
gui.add(params, 'uXspeed').min(0).max(5).step(.001).onChange(val => onChangeMaterialUniforms('uXspeed', val))
gui.add(params, 'uZspeed').min(0).max(5).step(.001).onChange(val => onChangeMaterialUniforms('uZspeed', val))
gui.add(params, 'uNoiseSpeed').min(0).max(5).step(.001).onChange(val => onChangeMaterialUniforms('uNoiseSpeed', val))
gui.add(params, 'uOpacity').min(0).max(1).step(.001).onChange(val => onChangeMaterialUniforms('uOpacity', val))

gui.addColor(params, 'uLowColor').onFinishChange(c => onChangeMaterialUniforms('uLowColor', new T.Color(c)))
gui.addColor(params, 'uHighColor').onFinishChange(c => {
  console.log(95, c)
  onChangeMaterialUniforms('uHighColor', new T.Color(c))
})


function onChangeMaterialUniforms(key, val) {
  shaderMaterial.uniforms[key].value = val
  // console.log(103, shaderMaterial, shaderMaterial.uniforms)
}

const plane = new T.Mesh(
  new T.PlaneGeometry(4, 4, 2 ** 10, 2 ** 10),
  shaderMaterial
)
plane.rotation.x = - Math.PI / 2
scene.add(plane)




















const webgl = new T.WebGLRenderer({ alpha: true, antialias: true })
webgl.setSize(window.innerWidth, window.innerHeight)

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
  shaderMaterial.uniforms.uTime.value = t
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()




