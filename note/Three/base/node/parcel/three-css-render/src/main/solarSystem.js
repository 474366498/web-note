/**
 * threejs 制作太阳系统  https://www.cnblogs.com/vadim-web/p/12077466.html
 * 所有行星图片要单独找 
 * 
 * three.js实现太阳系  https://blog.csdn.net/xi1213/article/details/125726054
 * gitee https://gitee.com/xi1213/three-solarsystem/tree/master
 */

import * as T from 'three'
import gsap, { TweenMax } from 'gsap'
import TWEEN from '@tweenjs/tween.js'

import * as D from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import planetList from './solar/planetData'
var webglCont, planetMsg
var webgl, scene, camera, controls


var textureLoader = new T.TextureLoader(), raycaster = new T.Raycaster()
var gui = new D.GUI()

const animate = {
  rotation: true, // 自转 
  revolution: true  // 公转
}
// dblClick双击归一位置
var mouse = {
  x: 0,
  y: 0
}
var clickPlanet = null // 双击点击选中的星球

console.log(16, gsap, TWEEN)

initGui()

function initGui() {
  // gui   运动
  Object.keys(animate).forEach(key => {
    gui.add(animate, key).name(key == 'rotation' ? '自转' : '公转')
  })
}

init()

function init() {
  webglCont = document.createElement('div')
  webglCont.id = 'webgl-div'
  document.body.insertAdjacentElement('afterbegin', webglCont)

  planetMsg = document.createElement('div')
  planetMsg.id = 'planet-msg'
  webglCont.insertAdjacentElement('afterend', planetMsg)

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
  webglCont.insertAdjacentElement('afterbegin', webgl.domElement)


  createUniverse()

  createStars()

  createLights()

  planetList.forEach(item => {
    // console.log(50, item)
    createSphere(item)
    createTrack(item)
  })

  createControls()

  animation()
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)

})
document.body.addEventListener('dblclick', function (e) {
  console.log(82, e)
  let width = window.innerWidth, height = window.innerHeight
  mouse.x = (e.offsetX / width) * 2 - 1
  mouse.y = -(e.offsetY / height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  //生成星球网格列表
  let planetMeshList = []
  scene.children.forEach(child => {
    if (child.isPlanet) {
      planetMeshList.push(child)
    }
  })
  //获取raycaster直线和星球网格列表相交的集合
  let intersects = raycaster.intersectObjects(planetMeshList)
  console.log(102, planetMeshList, intersects)

  if (!intersects.length) {
    animate.rotation = !animate.rotation
    animate.revolution = !animate.revolution
    planetMsg.innerHTML = ''
    gsap.fromTo('.show', { x: 200 }, {
      x: 0, duration: .5, onComplete: function () {
        console.log('remove show')
        planetMsg.classList.remove('show')

      }
    })
    return
  } else {
    animate.rotation = false
    animate.revolution = false
  }

  if (intersects[0].object.isPlanet) {
    clickPlanet = intersects[0].object
  } else {
    clickPlanet = intersects[0].object.parent
  }

  let planetR = planetList.find(item => item.name == clickPlanet.name)?.size

  console.log(116, planetR, clickPlanet)
  let { x, y, z } = clickPlanet.position

  let newCameraPosition = {
    x,
    y: y + planetR,
    z: z + 2.5 * planetR
  }
  showPlanetMsg(clickPlanet)
  flyTo(camera.position, controls.target, newCameraPosition, { x, y, z }, 2e3)


}, false)

function showPlanetMsg(planet) {
  let { data } = planet.planetMsg
  console.log(148, planet, data)
  let { name } = planet
  let {
    sunDistance,
    weight,
    diameter,
    rotation,
    revolution,
    temp,
    atmosphere,
    msg
  } = data
  let html = `
    <div class="top-r">
      <!--边角样式-->
    </div>
    <div class="bottom-r"></div>
    <div class="parameter-div">
      <div class="name">${name}</div>
      <div>
        距离太阳：<span> ${sunDistance} </span>
      </div>
      <div>
        质量：<span> ${weight} </span>
      </div>
      <div>
        直径：<span> ${diameter} </span>
      </div>
      <div>
        自转：<span> ${rotation} </span>
      </div>
      <div>
        公转：<span> ${revolution} </span>
      </div>
      <div>
        表面温度：<span> ${temp} </span>
      </div>
      <div>
        大气成分：<span> ${atmosphere} </span>
      </div>
    </div>
    <div class="description">
      ${msg}
    </div>
  `
  planetMsg.innerHTML = html
  gsap.fromTo('.show', { x: 200 }, {
    x: 0, duration: .5, onComplete: function () {
      console.log('add show')
      planetMsg.classList.add('show')
    }
  })
  // planetMsg
}

//飞向对象(旧相机位置，旧对象位置，新相机位置，新对象位置，动画时间，回调)
function flyTo(oldP, oldT, newP, newT, time, callback) {
  console.log(135, oldP, oldT, newP, newT, time)
  if (TWEEN) {
    let tween = new TWEEN.Tween({
      x1: oldP.x, // 相机x
      y1: oldP.y, // 相机y
      z1: oldP.z, // 相机z
      x2: oldT.x, // 控制点的中心点x
      y2: oldT.y, // 控制点的中心点y
      z2: oldT.z, // 控制点的中心点z
    })

    tween.to({
      x1: newP.x,
      y1: newP.y,
      z1: newP.z,
      x2: newT.x,
      y2: newT.y,
      z2: newT.z,
    }, time)
    tween.onUpdate(function (object) {
      camera.position.set(object.x1, object.y1, object.z1)
      controls.target.x = object.x2
      controls.target.y = object.y2
      controls.target.z = object.z2
      controls.update()
    })
    tween.onComplete(function () {
      callback && callback()
    })
    tween.easing(TWEEN.Easing.Cubic.InOut)
    tween.start()
  }
}


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
  console.log(296, start)
  start.scale.set(1e4, 1e4, 1e4)
  // start.scale.set(7e3, 7e3, 7e3)
  scene.add(start)

}

// 创建光源
function createLights() {
  let ambient = new T.AmbientLight(0xffffff)
  scene.add(ambient)
  let point = new T.PointLight(new T.Color(0xffffff), 2, 1, 0)
  point.visible = true
  point.position.set(0, 0, 0)  //点光源在原点充当太阳
  scene.add(point)
  scene.add(new T.PointLightHelper(point))
}

// 创建球体 
function createSphere(item) {
  if (item.name === '太阳') {
    createSun(item)
  } else if (item.name === '地球') {
    createEarth(item)
  } else if (item.name === '金星') {
    createVenus(item)
  } else if (item.name === '土星') {
    createSaturn(item)
  } else {
    let sphereGeo = new T.SphereGeometry(item.size, 1e2, 1e2)
    let sphereMaterial = new T.MeshLambertMaterial({
      map: textureLoader.load(item.mapImg)
    })
    let sphere = new T.Mesh(sphereGeo, sphereMaterial)
    sphere.name = item.name
    sphere.planetMsg = item
    sphere.isPlanet = true
    sphere.angle = 0

    sphere.position.set(item.position[0], item.position[1], item.position[2])
    scene.add(sphere)

  }
}

// 创建太阳
function createSun(item) {

  let sunGroup = new T.Group()
  let sunGeo = new T.SphereGeometry(item.size, 128, 128)
  let sunMaterial = new T.MeshLambertMaterial({
    color: 0xffffff,
    map: textureLoader.load(item.mapImg)
  })
  let sun = new T.Mesh(sunGeo, sunMaterial)
  sunGroup.add(sun)
  // 太阳大气几何体
  let sunAtmosphereGeo = new T.SphereGeometry(item.size + 8, 128, 128)
  let sunAtmosphereMaterial = new T.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: .2
  })
  let sunAtmosphere = new T.Mesh(sunAtmosphereGeo, sunAtmosphereMaterial)
  sunGroup.add(sunAtmosphere)

  sunGroup.name = item.name  // name 
  sunGroup.planetMsg = item  //绑定数据源
  sunGroup.isPlanet = true   // 标识星球
  sunGroup.angle = 0         // 初始角度
  sunGroup.position.set(item.position[0], item.position[1], item.position[2])
  // sunGroup.setAttribute('position', item.position)
  scene.add(sunGroup)

}

// 创建金星
function createVenus(item) {
  let venusGroup = new T.Group()
  let venus = new T.Mesh(
    new T.SphereGeometry(item.size, 1e2, 1e2),
    new T.MeshLambertMaterial({
      color: 0xffffff,
      map: textureLoader.load(item.mapImg)
    })
  )
  venusGroup.add(venus)

  let venusAtmosphere = new T.Mesh(
    new T.SphereGeometry(item.size + 2, 1e2, 1e2),
    new T.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: .4,
      map: textureLoader.load('./solarImg/venusAtmosphere.jpg')
    })
  )
  venusGroup.add(venusAtmosphere)
  venusGroup.name = item.name
  venusGroup.planetMsg = item
  venusGroup.isPlanet = true
  venusGroup.angle = 0

  venusGroup.position.set(item.position[0], item.position[1], item.position[2])

  scene.add(venusGroup)

}

// 创建地球
function createEarth(item) {

  let earthGroup = new T.Group()

  let earth = new T.Mesh(
    new T.SphereGeometry(item.size, 1e2, 1e2),
    new T.MeshPhysicalMaterial({
      map: textureLoader.load(item.mapImg),
      normalMap: textureLoader.load('./solarImg/earthNormal.jpg'),
      normalScale: new T.Vector2(1e1, 1e1)
    })
  )
  earthGroup.add(earth)

  let earthClouds = new T.Mesh(
    new T.SphereGeometry(item.size + 2, 1e2, 1e2),
    new T.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: .4,
      map: textureLoader.load('./solarImg/earthClouds.jpg')
    })
  )
  earthGroup.add(earthClouds)


  let moon = new T.Mesh(
    new T.SphereGeometry(10, 1e2, 1e2),
    new T.MeshPhysicalMaterial({
      map: textureLoader.load('./solarImg/moon.jpg'),
      normalScale: new T.Vector2(1e1, 1e1)
    })
  )
  moon.position.set(item.size + 40, 0, 0)
  earthGroup.add(moon)

  let moonTrack = new T.Mesh(
    new T.RingGeometry(item.size + 40, item.size + 41, 1e2),
    new T.MeshLambertMaterial({
      color: 0xffffff,
      side: T.DoubleSide
    })
  )
  moonTrack.rotation.x = Math.PI / 2
  earthGroup.add(moonTrack)

  earthGroup.name = item.name
  earthGroup.planetMsg = item
  earthGroup.isPlanet = true
  earthGroup.angle = 0
  earthGroup.position.set(item.position[0], item.position[1], item.position[2])
  scene.add(earthGroup)




}

// 创建土星
function createSaturn(item) {

  let saturnGroup = new T.Group()

  let saturn = new T.Mesh(
    new T.SphereGeometry(item.size, 1e2, 1e2),
    new T.MeshLambertMaterial({
      map: textureLoader.load(item.mapImg)
    })
  )
  saturnGroup.add(saturn)

  // 土星环一
  let saturnTrack1 = new T.Mesh(
    new T.RingGeometry(item.size + 10, item.size + 25, 1e2),
    new T.MeshLambertMaterial({
      color: 0xc0ad87,
      transparent: true,
      opacity: .8,
      side: T.DoubleSide,
    })
  )
  saturnTrack1.rotation.x = Math.PI / 2
  saturnGroup.add(saturnTrack1)

  let saturnTrack2 = new T.Mesh(
    new T.RingGeometry(item.size + 26, item.size + 30, 1e2),
    new T.MeshLambertMaterial({
      color: 0xc0ad87,
      transparent: true,
      opacity: .5,
      side: T.DoubleSide
    })
  )
  saturnTrack2.rotation.x = Math.PI / 2
  saturnGroup.add(saturnTrack2)

  let saturnTrack3 = new T.Mesh(
    new T.RingGeometry(item.size + 30.1, item.size + 32, 1e2),
    new T.MeshLambertMaterial({
      color: 0xc0ad87,
      transparent: true,
      opacity: .3,
      side: T.DoubleSide
    })
  )
  saturnTrack3.rotation.x = Math.PI / 2
  saturnGroup.add(saturnTrack3)

  saturnGroup.name = item.name
  saturnGroup.planetMsg = item
  saturnGroup.isPlanet = true
  saturnGroup.angle = 0
  saturnGroup.position.set(item.position[0], item.position[1], item.position[2])
  scene.add(saturnGroup)


}

//创建行星运动轨迹圆 
function createTrack(item) {
  // 去除太阳中心由圆环形成的圆形
  if (item.name == '太阳') {
    return
  }

  // 创建运动轨迹
  let trackGeo = new T.RingBufferGeometry(
    item.position[0],
    item.position[0] + 2,
    3e2
  )
  let trackMaterial = new T.LineBasicMaterial({
    color: 0xffffff,
    side: T.DoubleSide
  })
  let track = new T.Mesh(trackGeo, trackMaterial)
  track.name = item.name
  track.position.set(0, 0, 0)
  track.rotation.set(Math.PI / 2, 0, 0)
  scene.add(track)

}


// controls 配置
function createControls() {
  controls = new OrbitControls(camera, webgl.domElement)
  controls.enablePan = false    //右键平移拖拽
  controls.enableZoom = true    //鼠标缩放
  controls.enableDamping = true //滑动阻尼
  controls.dampingFactor = .05  //(默认.25)
  controls.minDistance = 1e2     //相机距离目标最小距离
  controls.maxDistance = 5e3   //相机距离目标最大距离
  controls.autoRotate = true     //自转(相机)
  controls.autoRotateSpeed = .25 //自转速度
}

function animation() {
  webgl.render(scene, camera)
  if (animate.revolution) {  // 公转
    sphereRevolution()
  }
  if (animate.rotation) {    // 自转
    sphereRotation()
  }
  TWEEN?.update()
  controls?.update()
  requestAnimationFrame(animation)
}

// 球体公转
function sphereRevolution() {
  scene.children.forEach(child => {
    if (child.isPlanet) {
      let planetData = planetList.find(item => item.name == child.name)
      child.angle = child.angle + planetData.revolution >= 2 * Math.PI ? 0 : child.angle + planetData.revolution
      child.position.set(
        planetData.position[0] * Math.sin(child.angle),
        0,
        planetData.position[0] * Math.cos(child.angle)
      )
    }
  })
}

// 球体自转
function sphereRotation() {
  scene.children.forEach(child => {
    if (child.isPlanet) {
      let planetData = planetList.filter(item => item.name == child.name)[0]
      // console.log(402, child, planetData)
      if (child.name == '土星') {
        child.rotation.x = .05 * 2 * Math.PI
      }
      if (child.name == '天王星') {
        child.rotation.z = child.rotation.z + planetData.rotation >= 2 * Math.PI ? 0 : child.rotation.z + planetData.rotation
        return
      }
      child.rotation.y = child.rotation.y + planetData.rotation >= 2 * Math.PI ? 0 : child.rotation.y + planetData.rotation
    }
  })

}





