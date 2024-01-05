
import * as T from 'three'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, scene, webgl, control, geoGroup, helperGroup

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false
},
  clipPlanes = [
    new T.Plane(new T.Vector3(1, 0, 0), 0),
    // new T.Plane(new T.Vector3(-1, 0, 0), 0),
    new T.Plane(new T.Vector3(0, -1, 0), 0),
    new T.Plane(new T.Vector3(0, 0, -1), 0)
  ]

const addGeometry = () => {
  geoGroup = new T.Group()

  for (let i = 1; i < 31; i += 2) {
    const geo = new T.SphereGeometry(i / 30, 48, 24)
    const material = new T.MeshLambertMaterial({
      color: new T.Color().setHSL(Math.random(), .5, .5),
      side: T.DoubleSide,
      clippingPlanes: clipPlanes,
      clipIntersection: params.clipIntersection
    })
    geoGroup.add(new T.Mesh(geo, material))
  }
  scene.add(geoGroup)
},
  addHelpers = () => {
    helperGroup = new T.Group()
    for (let i = 0; i < clipPlanes.length; i++) {
      let color = i == 0 ? 0xff0000 : i == 1 ? 0x00ff00 : 0x0000ff
      helperGroup.add(new T.PlaneHelper(clipPlanes[i], 2, color))
    }
    helperGroup.visible = false
    scene.add(helperGroup)
  },
  addGUI = () => {
    const gui = new GUI()
    gui.add(params, 'clipIntersection').name('clip intersection')
      .onChange(val => {
        const children = geoGroup.children
        for (let i = 0; i < children.length; i++) {
          children[i].material.clipIntersection = val
        }
        render()
      })

    gui.add(params, 'planeConstant', -1, 1).step(.01).name('plane constant')
      .onChange(value => {
        for (let i = 0; i < clipPlanes.length; i++) {
          clipPlanes[i].constant = value
        }
        render()
      })

    gui.add(params, 'showHelpers').name('show helpers')
      .onChange(value => {
        helperGroup.visible = value
        render()
      })

  }

function init() {

  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.localClippingEnabled = true
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  scene = new T.Scene()
  scene.add(new T.AxesHelper(10))

  camera = new T.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2e2)
  camera.position.set(-1.5, 2.5, 3)

  control = new OrbitControls(camera, webgl.domElement)
  control.addEventListener('change', render)
  control.minDistance = 1
  control.maxDistance = 32
  control.enablePan = false

  const light = new T.HemisphereLight(0xffffff, 0x080808, 1.5)
  light.position.set(-1.25, 1, 1.25)
  scene.add(light)

  addGeometry()

  addHelpers()

  addGUI()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })
}

function animate() {
  requestAnimationFrame(animate)
  render()

}

function render() {
  webgl.render(scene, camera)
}

init()

animate()

