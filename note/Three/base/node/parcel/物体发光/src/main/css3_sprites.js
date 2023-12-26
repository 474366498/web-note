
import * as T from 'three'

import TWEEN from 'three/examples/jsm/libs/tween.module.min'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'


var camera, scene, webgl, control

const particlesTotal = 512, positions = [], objects = []
let current = 0

console.log(14, TWEEN)

init()

animate()

function init() {

  camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5e3)
  camera.position.set(6e2, 4e2, 1.5e3)
  camera.lookAt(0, 0, 0)

  scene = new T.Scene()
  scene.add(new T.AxesHelper(2e3))

  // 加载图片
  const image = document.createElement('img')
  image.src = './textures/sprite.png'
  image.onload = function () {
    for (let i = 0; i < particlesTotal; i++) {
      const object = new CSS3DObject(image.cloneNode())
      object.position.set(
        Math.random() * 4e3 - 2e3,
        Math.random() * 4e3 - 2e3,
        Math.random() * 4e3 - 2e3
      )
      scene.add(object)
      objects.push(object)
    }
    transition()
  }
  console.log(31, image)

  // Plane

  const amountX = 16, amountZ = 32, separationPlane = 1.5e2, offsetX = ((amountX - 1) * separationPlane) / 2, offsetZ = ((amountZ - 1) * separationPlane) / 2
  for (let i = 0; i < particlesTotal; i++) {
    const x = (i % amountX) * separationPlane,
      y = (Math.sin(x * .5) + Math.sin(z * .5)) * 2e2,
      z = Math.floor(i / amountX) * separationPlane

    positions.push(x - offsetX, y, z - offsetZ)
  }

  // Cube
  const amount = 8, separationCube = 1.5e2, offset = ((amount - 1) * separationCube) / 2

  for (let i = 0; i < particlesTotal; i++) {
    const x = (i % amount) * separationCube,
      y = Math.floor((i / amount) % amount) * separationCube,
      z = Math.floor(i / (amount ** 2)) * separationCube

    positions.push(x - offset, y - offset, z - offset)
  }

  // Random 
  for (let i = 0; i < particlesTotal; i++) {
    positions.push(
      Math.random() * 4e3 - 2e3,
      Math.random() * 4e3 - 2e3,
      Math.random() * 4e3 - 2e3
    )
  }

  // Sphere
  const radius = 7.5e2
  for (let i = 0; i < particlesTotal; i++) {
    const phi = Math.acos(-1 + (2 * 1) / particlesTotal), theta = Math.sqrt(particlesTotal * Math.PI) * phi
    positions.push(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    )

  }

  webgl = new CSS3DRenderer()
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  control = new TrackballControls(camera, webgl.domElement)
  control.maxDistance = 4e3

  // webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  // webgl.setSize(window.innerWidth, window.innerHeight)
  // webgl.setPixelRatio(window.devicePixelRatio)
  // document.body.insertAdjacentElement('afterbegin', webgl.domElement)

}

function transition() {

  const offset = current * particlesTotal * 3, duration = 2e3

  for (let i = 0, j = offset; i < particlesTotal; i++, j += 3) {
    const object = objects[i]
    new TWEEN.Tween(object.position)
      .to({
        x: positions[j],
        y: positions[j + 1],
        z: positions[j + 2]
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start
  }

  new TWEEN.Tween(this)
    .to({}, duration * 3)
    .onComplete(transition)
    .start
  current = (current + 1) % 4

}


function animate() {
  requestAnimationFrame(animate)
  // debugger
  TWEEN.update()
  control.update()
  let time = performance.now()
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    const scale = Math.sin((Math.floor(obj.position.x) + time) * .002) * .3 + 1
    obj.scale.set(scale, scale, scale)
  }
  webgl.render(scene, camera)
}










