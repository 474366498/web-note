console.log('粒子')

import * as T from 'three'
import * as　G from 'gsap'
import * as D from 'dat.gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from '../shader/basic/vertex.glsl'
import fragmentShader from '../shader/basic/fragment.glsl'

const gui = new D.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1e3)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.position.set(3, 3, 5)
scene.add(camera)

scene.add(new T.AxesHelper(5))
scene.add(new T.GridHelper(5, 50, 50));


const textureLoader = new T.TextureLoader()
const texture_10 = textureLoader.load('./textures/particles/10.png')

console.log(27, texture_10)

const geo = new T.BufferGeometry()
const positions = new Float32Array([1, 1, 1])
geo.setAttribute('position', new T.BufferAttribute(positions, 3))

// const material = new T.PointsMaterial({
//   color: 0xff0000,
//   size: 1,
// })

const material = new T.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: T.DoubleSide,
  transparent: true,
  uniforms: {
    uTexture: {
      value: texture_10
    }
  }
})

const points = new T.Points(geo, material)
// points.geometry.position.set(1, 1, 1)
console.log(31, points)
scene.add(points)















const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

document.body.insertAdjacentElement('beforebegin', webgl.domElement)

const controls = new OrbitControls(camera, webgl.domElement)
controls.enableDamping = true

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})

function animate() {
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()