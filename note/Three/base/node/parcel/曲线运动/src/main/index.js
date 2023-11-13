
console.log('曲线运动')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, webgl, scene, controls, curve

var earth, moon

const textureLoader = new T.TextureLoader()
var clock = new T.Clock()

init()

animation()

function init() {
  const EARTH_RADIUS = 1, MOON_RADIUS = .2

  scene = new T.Scene()
  scene.add(new T.AxesHelper(20))

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e2)
  camera.position.set(0, 5, -10)
  scene.add(camera)

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(0, 0, -1)
  scene.add(dirLight)
  const light = new T.AmbientLight(0xffffff, .7)
  scene.add(light)

  earth = new T.Mesh(
    new T.SphereGeometry(EARTH_RADIUS, 32, 32),
    new T.MeshPhongMaterial({
      specular: 0x333333,
      shininess: 5,
      map: textureLoader.load('textures/planets/earth_atmos_2048.jpg'),
      specularMap: textureLoader.load('textures/planets/earth_specular_2048.jpg'),
      normalMap: textureLoader.load('textures/planets/earth_normal_2048.jpg'),
      normalScale: new T.Vector2(.85, .85)
    })
  )
  scene.add(earth)

  moon = new T.Mesh(
    new T.SphereGeometry(MOON_RADIUS, 16, 16),
    new T.MeshPhongMaterial({
      shininess: 5,
      map: textureLoader.load('textures/planets/moon_1024.jpg')
    })
  )
  scene.add(moon)


  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)

  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  createCurve()

  controls = new OrbitControls(camera, webgl.domElement)
  console.log(63, camera)
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })

}

function createCurve() {
  curve = new T.CatmullRomCurve3(
    [
      new T.Vector3(-5, 5, -5),
      new T.Vector3(-5, 0, 0),
      new T.Vector3(-5, -5, 5),

      new T.Vector3(-10, 0, 10),
      new T.Vector3(-5, 5, 5),
      new T.Vector3(0, 0, 5),
      new T.Vector3(5, -5, 5),
      new T.Vector3(10, 0, 10),

    ],
    true
  )
  let line = new T.Line(
    new T.BufferGeometry().setFromPoints(curve.getPoints(2e2)),
    new T.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 2
    })
  )
  console.log(92, curve)
  console.log(99, curve.getLength(), curve.getLengths(2e2))

  let t = new T.Vector3()
  curve.getTangent(10 / 201, t)
  console.log(103, t, curve.getPoints(2e2))
  scene.add(line)
}

function animation() {
  // console.log(65, clock)
  let time = clock?.getElapsedTime()
  // moon.position.set(Math.sin(time / 5) * 10, 0, Math.cos(time / 5) * 8)
  let point = curve.getPoint(time / 1e2 % 1)
  moon.position.copy(point)
  earth.rotation.y += .005
  webgl.render(scene, camera)
  requestAnimationFrame(animation)
}

