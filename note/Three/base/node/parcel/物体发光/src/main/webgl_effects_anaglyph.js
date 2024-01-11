

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect'

var container, camera, scene, webgl, effect, control

const spheres = []

let mouseX = 0, mouseY = 0

let halfX = window.innerWidth / 2, halfY = window.innerHeight / 2


function init() {

  container = document.createElement('div')
  document.body.insertAdjacentElement('afterbegin', container)

  camera = new T.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .01, 1e2)
  camera.position.z = 3
  camera.focalLength = 3

  const path = './textures/cube/pisa/'
  const format = '.png'
  const urls = [
    path + 'px' + format, path + 'nx' + format,
    path + 'py' + format, path + 'ny' + format,
    path + 'pz' + format, path + 'nz' + format,
  ]

  const textureCube = new T.CubeTextureLoader().load(urls)
  console.log(34, textureCube)
  scene = new T.Scene()
  scene.background = textureCube

  const geo = new T.SphereGeometry(.1, 32, 32),
    material = new T.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube })

  for (let i = 0; i < 5e2; i++) {
    const mesh = new T.Mesh(geo, material)
    mesh.position.set(
      Math.random() * 1e1 - 5,
      Math.random() * 1e1 - 5,
      Math.random() * 1e1 - 5
    )
    mesh.scale.set(
      Math.random() * 3 + 1,
      Math.random() * 3 + 1,
      Math.random() * 3 + 1
    )

    scene.add(mesh)
    spheres.push(mesh)
  }

  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(webgl.domElement)

  control = new OrbitControls(camera, webgl.domElement)


  effect = new AnaglyphEffect(webgl)
  effect.setSize(window.innerWidth, window.innerHeight)

  window.addEventListener('resize', () => {
    halfX = window.innerWidth / 2
    halfY = window.innerHeight / 2
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
    effect.setSize(window.innerWidth, window.innerHeight)
  })

  window.addEventListener('mousemove', event => {
    // console.log(79, event)
    mouseX = (event.clientX - halfX) / 1e2
    mouseY = (event.clientY - halfY) / 1e2
  })

}

function animate() {
  // debugger
  requestAnimationFrame(animate)
  let t = .0001 * Date.now()
  let { x, y, z } = camera.position
  camera.position.set(
    x + (mouseX - x) * .05,
    y + (-mouseY - y) * .05,
    z
  )
  camera.lookAt(scene.position)

  for (let i = 0, l = spheres.length; i < l; i++) {
    const sphere = spheres[i]
    sphere.position.x = 5 * Math.cos(t + i)
    sphere.position.y = 5 * Math.sin(t + i * 1.25)

  }

  // webgl.render(scene, camera)
  effect.render(scene, camera)
}


init()

animate()
