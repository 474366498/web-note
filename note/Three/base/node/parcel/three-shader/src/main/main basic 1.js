//  [!《图形编程技术学习》（五十七）GLSL的基本语法 知乎 ](https://zhuanlan.zhihu.com/p/94252268)

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import basicVertexShader from '../shader/basic/vertex.glsl'
import basicFragmentShader from '../shader/basic/fragment.glsl'


const scene = new T.Scene()
const camera = new T.PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1e3)
camera.position.set(0, 0, 2)
scene.add(camera)

scene.add(new T.AxesHelper(2e2))

const textureLoader = new T.TextureLoader()

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

const shaderMaterial = new T.ShaderMaterial({
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
  side: T.DoubleSide
})

const floor = new T.Mesh(
  new T.PlaneGeometry(2, 2),
  // new T.MeshBasicMaterial(0xff0000)
  shaderMaterial
)
console.log(43, floor, floor.geometry, shaderMaterial)
scene.add(floor)

const webgl = new T.WebGLRenderer({ alpha: true, antialias: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

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
  requestAnimationFrame(animation)
  webgl.render(scene, camera)
}
animation()

