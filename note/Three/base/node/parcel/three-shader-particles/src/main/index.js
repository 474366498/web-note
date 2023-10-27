console.log('粒子')

import * as T from 'three'
import * as　G from 'gsap'
import * as D from 'dat.gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from '../shader/particles/vertex.glsl'
import fragmentShader from '../shader/particles/fragment.glsl'

const gui = new D.GUI()

const scene = new T.Scene()

const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1e3)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.position.set(3, 3, 5)
scene.add(camera)

scene.add(new T.AxesHelper(30))
// scene.add(new T.GridHelper(60, 50, 50));


const textureLoader = new T.TextureLoader()
const texture_5 = textureLoader.load('./textures/particles/5.png')
const texture_8 = textureLoader.load('./textures/particles/8.png')
const texture_9 = textureLoader.load('./textures/particles/9.png')
const texture_10 = textureLoader.load('./textures/particles/10.png')

console.log(27, texture_10)
/*
const geo = new T.BufferGeometry()
const positions = new Float32Array([1, 1, 1])
geo.setAttribute('position', new T.BufferAttribute(positions, 3))
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
*/

let geo = null,
  points = null

const params = {
  count: 3e3,
  size: .1,
  radius: 5,
  branches: 4,
  spin: .5,
  color: '#ff6030',
  outColor: '#1b3984'
}

let galaxyColor = new T.Color(params.color),
  outGalaxyColor = new T.Color(params.outColor)
let material;

function generateGalaxy() {
  if (points) {
    geo.dispose()
    material.dispose()
    scene.remove(points)
  }

  geo = new T.BufferGeometry()

  const positions = new Float32Array(params.count * 3),
    colors = new Float32Array(params.count * 3),
    scales = new Float32Array(params.count),
    imgIndex = new Float32Array(params.count)

  //   循环生成点
  for (let i = 0; i < params.count; i++) {
    let current = i * 3
    // 计算分支的角度 = (计算当前的点在第几个分支)*(2*Math.PI/多少个分支)
    let branchAngel = (i % params.branches) * (2 * Math.PI / params.branches),
      radius = Math.random() * params.radius

    // let randomX = Math.pow(Math.random() * 2 - 1, 3) * .5 * (params.radius - radius) * .3,
    //   randomY = Math.pow(Math.random() * 2 - 1, 3) * .5 * (params.radius - radius) * .3,
    //   randomZ = Math.pow(Math.random() * 2 - 1, 3) * .5 * (params.radius - radius) * .3

    let randomX = Math.pow(Math.random() * 4 - 1, 3) * .5 * (params.radius - radius) * .3,
      randomY = Math.pow(Math.random() * 2 - 1, 3) * .5 * (params.radius - radius) * .3,
      randomZ = Math.pow(Math.random() * 4 - 1, 3) * .5 * (params.radius - radius) * .3

    randomX = Math.random() < .5 ? randomX : 0 - randomX
    randomZ = Math.random() < .5 ? randomZ : 0 - randomZ

    // 设置当前点x值坐标
    positions[current] = Math.cos(branchAngel) * radius + randomX
    // 设置当前点y值坐标
    positions[current + 1] = randomY
    // 设置当前点z值坐标
    positions[current + 2] = Math.sin(branchAngel) * radius + randomZ

    const mixColor = galaxyColor.clone()
    mixColor.lerp(outGalaxyColor, radius / params.radius)

    //   设置颜色
    colors[current] = mixColor.r
    colors[current + 1] = mixColor.g
    colors[current + 2] = mixColor.b

    // 顶点的大小
    scales[current] = Math.random() * 2

    // 根据索引值设置不同的图案；
    imgIndex[current] = i % 3;

  }
  console.log(117, positions, colors)
  geo.setAttribute('position', new T.BufferAttribute(positions, 3))
  geo.setAttribute('color', new T.BufferAttribute(colors, 3))
  geo.setAttribute('aScale', new T.BufferAttribute(scales, 1))
  geo.setAttribute('imgIndex', new T.BufferAttribute(imgIndex, 1))

  material = new T.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    vertexColors: true,   // Program Info Log: Must have a compiled vertex shader attached:SHADER_INFO_LOG:  改成true就不会报错了
    blending: T.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uTime: {
        value: 0
      },
      uTexture_5: {
        value: texture_5
      },
      uTexture_8: {
        value: texture_8
      },
      uTexture_9: {
        value: texture_9
      },
      uColor: {
        value: galaxyColor
      }
    }

  })

  points = new T.Points(geo, material)
  scene.add(points)
  console.log(147, points)


}

generateGalaxy()

















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
const clock = new T.Clock()
function animate() {
  material.uniforms.uTime.value = clock.getElapsedTime()
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}

animate()