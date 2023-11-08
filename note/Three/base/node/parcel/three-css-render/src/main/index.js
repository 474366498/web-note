console.log('css render ')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

var camera, scene, webgl, controls, labelRender

const textureLoader = new T.TextureLoader()

var moon, earth, ellipse, chinaLabel
const raycaster = new T.Raycaster()
const clock = new T.Clock()

var EARTH_RADIUS = 1, MOON_RADIUS = .25

init()

animation()

function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 2e2)
  camera.position.set(0, 5, -20)

  scene = new T.Scene()
  scene.add(new T.AxesHelper(5))

  const direction = new T.DirectionalLight(0xffffff)
  direction.position.set(0, 0, -10)
  scene.add(direction)

  const ambient = new T.AmbientLight(0xfffffff, .5)
  scene.add(ambient)

  earthMoonInit()

  webgl = new T.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)


}


function earthMoonInit() {
  const earthGeo = new T.SphereGeometry(EARTH_RADIUS, 32, 32)
  const earthMaterial = new T.MeshPhongMaterial({
    specular: 0x333333,
    shininess: 5,
    map: textureLoader.load('textures/planets/earth_atmos_2048.jpg'),
    specularMap: textureLoader.load('textures/planets/earth_specular_2048.jpg'),
    normalMap: textureLoader.load('textures/planets/earth_normal_2048.jpg'),
    normalScale: new T.Vector2(.85)
  })
  earth = new T.Mesh(earthGeo, earthMaterial)
  scene.add(earth)

  const moonGeo = new T.SphereGeometry(MOON_RADIUS, 16, 16)
  const moonMaterial = new T.MeshPhongMaterial({
    shininess: 4,
    map: textureLoader.load('textures/planets/moon_1024.jpg')
  })
  moon = new T.Mesh(moonGeo, moonMaterial)
  scene.add(moon)

  const curve = new T.EllipseCurve(0, 0, 5, 4, 0, 2 * Math.PI, 0)
  const points = curve.getPoints(64)
  const geo = new T.BufferGeometry().setFromPoints(points)
  const material = new T.LineDashedMaterial({
    color: 0xff0000,
    linewidth: 1,
    scale: 2,
    dashSize: 3,
    gapSize: 1,
  })
  ellipse = new T.Line(geo, material)
  scene.add(ellipse)
  geo.rotateX(Math.PI / 2)
  labelInit()
}

function labelInit() {
  let earthDiv = document.createElement('div')
  earthDiv.className = 'earth-div'
  earthDiv.style.color = 'red'
  earthDiv.innerHTML = '地球'
  let earthLabel = new CSS2DObject(earthDiv)
  earthLabel.position.set(0, 1, 0)
  earth.add(earthLabel)

  let chinaSpan = document.createElement('span')
  chinaSpan.className = 'china-span'
  chinaSpan.innerText = '中国'
  chinaLabel = new CSS2DObject(chinaSpan)
  chinaLabel.position.set(-.3, .5, -.9)
  earth.add(chinaLabel)

  let moonSpan = document.createElement('span')
  moonSpan.className = 'moon-span'
  moonSpan.innerText = '月球'
  let moonLabel = new CSS2DObject(moonSpan)
  moonLabel.position.set(0, .3, 0)
  moon.add(moonLabel)

  labelRender = new CSS2DRenderer()
  labelRender.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('beforeend', labelRender.domElement)
  labelRender.domElement.style.position = 'fixed';
  labelRender.domElement.style.top = '0px';
  labelRender.domElement.style.left = '0px';
  labelRender.domElement.style.zIndex = '10';


  controls = new OrbitControls(camera, labelRender.domElement)
  controls.minDistance = 5
  controls.maxDistance = 1e2
}

// console.log(74, earth)
function animation() {
  let t = clock.getElapsedTime()
  // console.log(76, Math.sin(t), Math.cos(t))
  earth.rotation.y += .01
  moon.position.x = Math.sin(t / 5) * 5
  moon.position.z = Math.cos(t / 5) * 4
  moon.rotation.y += .0051

  rayInit()
  // console.log(58, scene, webgl)
  requestAnimationFrame(animation)
  webgl.render(scene, camera)
  labelRender.render(scene, camera)
}

function rayInit() {
  // 运动中的 childLabel 位置
  let labelPosition = chinaLabel.getWorldPosition(new T.Vector3(0, 5, -20))
  let _labelDistance = labelPosition.distanceTo(camera.position)
  // console.log(142, _labelDistance)

  // 复制chinaLabel 位置
  let chinaLabelPosition = chinaLabel.position.clone()

  // 计算出标签跟摄像机的距离
  let labelDistance = chinaLabelPosition.distanceTo(camera.position)

  // 计算出地球跟摄像机的距离
  let earthDistance = earth.position.distanceTo(camera.position)

  // 向量(坐标)从世界空间投影到相机的标准化设备坐标 (NDC) 空间。
  chinaLabelPosition.project(camera)
  raycaster.setFromCamera(chinaLabelPosition, camera)

  const intersects = raycaster.intersectObjects(scene.children, true)
  if (!intersects || intersects.length == 0) return
  // console.log(152, labelDistance, earthDistance)

  if (earthDistance < labelDistance || earthDistance < _labelDistance) {
    // console.log('hidden')
    chinaLabel.element.classList.remove('visible')
  } else {
    // console.log('show')
    chinaLabel.element.classList.add('visible')
  }
  // let intersect = intersects[0]
  // if (intersect.object.type !== 'Mesh') {
  //   // console.log('show')
  //   chinaLabel.element.style.display = 'inline-block'
  // } else {
  //   let minDistance = intersect.distance
  //   // console.log(159, minDistance, labelDistance)
  //   if (minDistance < labelDistance) {
  //     console.log('hidden', chinaLabel.element)
  //     chinaLabel.element.style.display = 'none'
  //   } else {
  //     // console.log('show')
  //     chinaLabel.element.style.display = 'inline-block'
  //   }
  // }

}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)
  labelRender.setSize(window.innerWidth, window.innerHeight)

})

