

import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


var camera, webgl, scene, stats, control




function init() {
  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2e3)
  camera.position.z = 4e2

  scene = new T.Scene()

  const ambient = new T.AmbientLight(0xcccccc, .4)
  scene.add(ambient)

  const point = new T.PointLight(0xffffff, .8)
  camera.add(point)
  scene.add(camera)

  const map = new T.TextureLoader().load('./textures/uv_grid_opengl.jpg')
  map.wrapS = map.wrapT = T.RepeatWrapping
  map.anisotropy = 16

  const material = new T.MeshPhongMaterial({ map, side: T.DoubleSide })

  let obj

  obj = new T.Mesh(new T.SphereGeometry(75, 20, 10), material)
  obj.position.set(-300, 0, 200)
  scene.add(obj)

  obj = new T.Mesh(new T.IcosahedronGeometry(75, 1), material)
  obj.position.set(-100, 0, 200)
  scene.add(obj)

  obj = new T.Mesh(new T.OctahedronGeometry(75, 2), material)
  obj.position.set(100, 0, 200)
  scene.add(obj)

  obj = new T.Mesh(new T.TetrahedronGeometry(75, 0), material)
  obj.position.set(300, 0, 200)
  scene.add(obj)


  obj = new T.Mesh(new T.PlaneGeometry(100, 100, 4, 4), material)
  obj.position.set(-300, 0, 0)
  scene.add(obj)

  obj = new T.Mesh(new T.BoxGeometry(100, 100, 100, 4, 4, 4), material)
  obj.position.set(-100, 0, 0)
  scene.add(obj)

  obj = new T.Mesh(new T.CircleGeometry(50, 20, 0, Math.PI * 2), material)
  obj.position.set(100, 0, 0)
  scene.add(obj)

  obj = new T.Mesh(new T.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), material)
  obj.position.set(300, 0, 0)
  scene.add(obj)

  obj = new T.Mesh(new T.CylinderGeometry(25, 75, 100, 40, 5), material)
  obj.position.set(-300, 0, -200)
  scene.add(obj)

  let points = []
  for (let i = 0; i < 50; i++) {
    points.push(new T.Vector2(Math.sin(i * .2) * Math.sin(i * .1) * 15 + 50, (i - 5) * 2))
  }

  obj = new T.Mesh(new T.LatheGeometry(points, 20), material)
  obj.position.set(-100, 0, -200)
  scene.add(obj)

  obj = new T.Mesh(new T.TorusGeometry(50, 20, 20, 20), material)
  obj.position.set(100, 0, -200)
  scene.add(obj)

  obj = new T.Mesh(new T.TorusKnotGeometry(50, 10, 50, 20), material)
  obj.position.set(300, 0, -200)
  scene.add(obj)




  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  control = new OrbitControls(camera, webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })
}

function animate() {

  requestAnimationFrame(animate)
  let t = Date.now() * .0001
  camera.position.x = Math.cos(t) * 800
  camera.position.z = Math.sin(t) * 800

  camera.lookAt(scene.position)

  scene.traverse(obj => {
    if (obj.isMesh) {
      obj.rotation.x = t * 5
      obj.rotation.y = t * 4
    }
  })

  webgl.render(scene, camera)
  stats.update()
}


init()

animate()
