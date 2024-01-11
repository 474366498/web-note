


import * as T from 'three'

import { Curves } from 'three/examples/jsm/curves/CurveExtras'

import Stats from 'three/examples/jsm/libs/stats.module'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries'



var camera, scene, webgl, control, stats

function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2e3)
  camera.position.y = 4e2

  scene = new T.Scene()

  const ambient = new T.AmbientLight(0xcccccc, .4)
  scene.add(ambient)

  const point = new T.PointLight(0xffffff, .8)
  camera.add(point)
  scene.add(camera)

  const map = new T.TextureLoader().load('./textures/uv_grid_opengl.jpg')
  map.wrapS = map.wrapT = T.RepeatWrapping
  map.anisotropy = 32

  const material = new T.MeshPhongMaterial({ map, side: T.DoubleSide })

  let geo, obj

  geo = new ParametricGeometry(ParametricGeometries.plane(1e2, 1e2), 1e1, 1e1)
  geo.center()
  obj = new T.Mesh(geo, material)
  obj.position.set(-200, 0, 2e2)
  scene.add(obj)

  geo = new ParametricGeometry(ParametricGeometries.klein, 2e1, 2e1)
  obj = new T.Mesh(geo, material)
  obj.position.set(0, 0, 2e2)
  obj.scale.multiplyScalar(5)
  scene.add(obj)

  geo = new ParametricGeometry(ParametricGeometries.mobius, 2e1, 2e1)
  obj = new T.Mesh(geo, material)
  obj.position.set(2e2, 0, 2e2)
  obj.scale.multiplyScalar(30)
  scene.add(obj)

  console.log(59, Curves)
  // debugger
  const GrannyKnot = new Curves.GrannyKnot(),
    torus = new ParametricGeometries.TorusKnotGeometry(50, 10, 50, 20, 2, 3),
    sphere = new ParametricGeometries.SphereGeometry(50, 20, 10),
    tube = new ParametricGeometries.TubeGeometry(GrannyKnot, 1e2, 3, 8, true)

  obj = new T.Mesh(torus, material)
  obj.position.set(-200, 0, -200)
  scene.add(obj)

  obj = new T.Mesh(sphere, material)
  obj.position.set(0, 0, -200)
  scene.add(obj)

  obj = new T.Mesh(tube, material)
  obj.position.set(200, 0, -200)
  obj.scale.multiplyScalar(2)
  scene.add(obj)


  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  control = new OrbitControls(camera, webgl.domElement)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })
}
function animate() {
  requestAnimationFrame(animate)
  const t = Date.now() * .0001
  camera.position.x = Math.cos(t) * 5e2
  camera.position.z = Math.cos(t) * 5e2
  camera.lookAt(scene.position)
  scene.traverse(obj => {
    if (obj.isMesh) {
      obj.rotation.x = t * 5;
      obj.rotation.y = t * 5 / 2
    }
  })
  webgl.render(scene, camera)
  stats.update()
}


init()

animate()
