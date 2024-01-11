


import * as T from 'three'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

var camera, control, scene, webgl, effect

var sphere, plane

const start = Date.now()


function init() {



  camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.y = 150
  camera.position.z = 5e2

  scene = new T.Scene()
  // scene.add(new T.AxesHelper(5e3))
  scene.background = new T.Color(0, 0, 0)

  const point1 = new T.PointLight(0xffffff)
  point1.position.set(5e2, 5e2, 5e2)
  scene.add(point1)

  const point2 = new T.PointLight(0xffffff, .25)
  point2.position.set(-5e2, -5e2, -5e2)
  scene.add(point2)

  sphere = new T.Mesh(
    new T.SphereGeometry(200, 20, 20),
    new T.MeshPhongMaterial({ flatShading: true })
  )
  scene.add(sphere)

  plane = new T.Mesh(
    new T.PlaneGeometry(4e2, 4e2),
    new T.MeshBasicMaterial({ color: 0xe0e0e0 })
  )
  plane.position.y = -2e2
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)




  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  // document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  effect = new AsciiEffect(webgl, ' !@#$%^&* ', { invert: true })
  effect.setSize(window.innerWidth, window.innerHeight)
  effect.domElement.style.color = 'white'
  effect.domElement.style.backgroundColor = 'black'
  document.body.insertAdjacentElement('afterbegin', effect.domElement)
  document.body.style.overflow = 'hidden'
  control = new TrackballControls(camera, effect.domElement)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
    effect.setSize(window.innerWidth, window.innerHeight)
  })

}
function animate() {
  requestAnimationFrame(animate)
  // webgl.render(scene, camera)
  let t = Date.now() - start
  sphere.position.y = Math.abs(Math.sin(t * .0015)) * 2e2
  sphere.rotation.x = t * 2e-4
  sphere.rotation.z = t * 3e-4
  control.update()
  effect.render(scene, camera)

}





init()

animate()
