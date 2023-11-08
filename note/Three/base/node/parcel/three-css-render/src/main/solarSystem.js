/**
 * threejs 制作太阳系统  https://www.cnblogs.com/vadim-web/p/12077466.html
 * 所有行星图片要单独找 
 * 
 * three.js实现太阳系  https://blog.csdn.net/xi1213/article/details/125726054
 * gitee https://gitee.com/xi1213/three-solarsystem/tree/master
 */

import * as T from 'three'
import gsap from 'gsap'
import * as D from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import planetList from './solar/planetData'
var webgl, scene, camera, controls

var textureLoader = new T.TextureLoader()

console.log(16, gsap, D, planetList)

init()

function init() {

  scene = new T.Scene()
  scene.add(new T.AxesHelper(1e2))

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5e4)
  camera.position.set(0, 5e2, 27e2)
  camera.lookAt(0, 0, 0)


  webgl = new T.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setClearColor(0x000000, .2)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)


  createUniverse()

  createStars()

  createLights()

  planetList.forEach(item => {
    console.log(50, item)
  })

  createControls()

  animation()
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)

})


// 创建宇宙背景
function createUniverse() {
  let universeGeo = new T.SphereGeometry(7e3),
    material = new T.MeshLambertMaterial({
      map: textureLoader.load('./solarImg/universe.jpg'),
      side: T.DoubleSide
    })
  let universe = new T.Mesh(universeGeo, material)
  universe.name = '宇宙背景'
  scene.add(universe)
}

// 创建星空
function createStars() {

  const positions = [],
    colors = []

  const startsGeo = new T.BufferGeometry()

  for (let i = 0; i < 1e4; i++) {

    let vertex = new T.Vector3()
    vertex.x = Math.random() * 2 - 1
    vertex.y = Math.random() * 2 - 1
    vertex.z = Math.random() * 2 - 1

    positions.push(vertex.x, vertex.y, vertex.z)
    let color = new T.Color()
    color.setRGB(255, 255, 255)
    colors.push(color.r, color.g, color.b)

  }

  startsGeo.setAttribute('position', new T.Float32BufferAttribute(positions, 3))
  startsGeo.setAttribute('color', new T.Float32BufferAttribute(colors, 3))

  let startsMaterial = new T.PointsMaterial({
    map: textureLoader.load('./solarImg/star.jpg'),
    size: 4 + Math.floor(Math.random() * 4),
    blending: T.AdditiveBlending,
    fog: true,
    depthTest: false   //(不能与blending一起使用)
    // depthWrite: false, //(深度写入)防止星辰在球体前面出现黑块
  })

  let start = new T.Points(startsGeo, startsMaterial)
  start.scale.set(7e3, 7e3, 7e3)
  scene.add(start)

}

// 创建光源
function createLights() {
  let ambient = new T.AmbientLight(0xffffff)
  scene.add(ambient)
  let point = new T.PointLight(new T.Color(0xffffff), 2, 1, 0)
  point.visible = true
  point.position.set(1, 0, 1)  //点光源在原点充当太阳
  scene.add(point)
  scene.add(new T.PointLightHelper(point))
}





// controls 配置
function createControls() {
  controls = new OrbitControls(camera, webgl.domElement)
  controls.enablePan = false    //右键平移拖拽
  controls.enableZoom = true    //鼠标缩放
  controls.enableDamping = true //滑动阻尼
  controls.dampingFactor = .05  //(默认.25)
  controls.minDistance = 1e2     //相机距离目标最小距离
  controls.maxDistance = 2.7e3   //相机距离目标最大距离
  controls.autoRotate = true     //自转(相机)
  // controls.autoRotateSpeed = .01 //自转速度
}

function animation() {
  webgl.render(scene, camera)
  requestAnimationFrame(animation)
}







