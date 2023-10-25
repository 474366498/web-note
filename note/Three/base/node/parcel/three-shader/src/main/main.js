//  [!《图形编程技术学习》（五十七）GLSL的基本语法 知乎 ](https://zhuanlan.zhihu.com/p/94252268)

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import rawVertexShader from '../shader/deep/vertex.glsl'
import rawFragmentShader from '../shader/deep/fragment.glsl'
// import waterFragmentShader from '../shader/deep/water.glsl'


const scene = new T.Scene()
const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(0, 0, 2)
scene.add(camera)

scene.add(new T.AxesHelper(2e2))
const light = new T.SpotLight(0xffffff, 1)
light.position.set(0, 3, 3)
scene.add(new T.SpotLightHelper(light))

const textureLoader = new T.TextureLoader()
const texture = textureLoader.load('./texture/v2.jpg')
// const shaderMaterial = new T.ShaderMaterial({
//   vertexShader: `
//     void main () {
//       gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position , 1.0) ;
//     }
//   ` ,
//   fragmentShader: `
//     void main () {
//       gl_FragColor = vec4(1.0,1.0,0.0,1.0) ;
//     }
//   `,
//   side: T.DoubleSide
// })

const rawShaderMaterial = new T.RawShaderMaterial({
  vertexShader: rawVertexShader,
  fragmentShader: rawFragmentShader,
  side: T.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uTexture: {
      value: texture
    },
    uScale: {
      value: .1
    }
  }
})

const floor = new T.Mesh(
  new T.PlaneGeometry(2, 2, 2 ** 6, 2 ** 6),
  // new T.MeshBasicMaterial(0xff0000)
  rawShaderMaterial
)
console.log(43, floor, floor.geometry, rawShaderMaterial)
scene.add(floor)

const webgl = new T.WebGLRenderer({ alpha: true, antialias: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
webgl.setClearColor(0x00ff00, .25)

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)

})

document.body.insertAdjacentElement('afterbegin', webgl.domElement)

const control = new OrbitControls(camera, webgl.domElement)
control.enableDamping = true

const clock = new T.Clock()

function animation() {
  const t = clock.getElapsedTime()
  rawShaderMaterial.uniforms.uTime.value = t
  requestAnimationFrame(animation)
  webgl.render(scene, camera)
}
animation()

