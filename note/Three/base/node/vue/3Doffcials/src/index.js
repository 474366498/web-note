

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { gsap } from "gsap"

var scene, camera, webgl, orbit, page = 0
var canvas = document.querySelector('.canvas-container'),
  pageDom = document.querySelector('.pages')

init()
render()

function init() {
  scene = new T.Scene()
  // scene.add(new T.AxesHelper(1e3))

  let texture = new T.TextureLoader().load('./assets/25s.jpg')
  texture.mapping = T.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e5)

  camera.position.set(0, 0, 10)

  webgl = new T.WebGLRenderer({ antialias: true })

  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)

  canvas.insertAdjacentElement('beforeend', webgl.domElement)
  orbit = new OrbitControls(camera, webgl.domElement)
  orbit.enableZoom = false
  orbit.enableRotate = false
  orbit.enablePan = false
  orbit.addEventListener('change', () => {
    // console.log(36)
    webgl.render(scene, camera)
  })
  lightInit()
  loaderInit()
}

function lightInit() {
  let positions = [
    {
      x: 0,
      y: 0,
      z: 1
    },
    {
      x: 0,
      y: 0,
      z: -1
    },
    {
      x: -1,
      y: 1,
      z: 1
    }
  ]
  for (let i = 0; i < positions.length; i++) {
    let { x, y, z } = positions[i]
    let light = new T.DirectionalLight(0xffffff, 1)
    light.position.set(x, y, z)
    scene.add(light)
    // scene.add(new T.DirectionalLightHelper(light))
  }
}

function loaderInit() {
  let dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/gltf/')
  dracoLoader.setDecoderConfig({ type: 'js' })
  let loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load('./model/xz.glb', glb => {
    glb.scene.scale.set(.1, .1, .1)
    glb.scene.position.set(3, 0, 0)
    scene.add(glb.scene)

    window.addEventListener('mousemove', e => {
      let x = (e.clientX / window.innerWidth) * 2 - 1,
        y = (e.clientY / window.innerHeight) * 2 - 1

      let timeline = gsap.timeline()
      timeline.to(glb.scene.rotation, {
        duration: .5,
        x: y,
        y: x,
        duration: 1
      })
    })
  })

  loader.load('./model/xq6.glb', glb => {
    glb.scene.scale.set(.06, .06, .06)
    glb.scene.position.set(3, -8, 0)
    scene.add(glb.scene)

    window.addEventListener('mousemove', e => {
      let x = (e.clientX / window.innerWidth) * 2 - 1,
        y = (e.clientY / window.innerHeight) * 2 - 1

      let timeline = gsap.timeline()
      timeline.to(glb.scene.rotation, {
        duration: .5,
        x: y,
        y: x,
        duration: 1
      })
    })

  })

  loader.load('./model/gr75.glb', glb => {
    glb.scene.scale.set(1.1, 1.1, 1.1)
    glb.scene.position.set(3, -16, 0)
    scene.add(glb.scene)

    window.addEventListener('mousemove', e => {
      let x = (e.clientX / window.innerWidth) * 2 - 1,
        y = (e.clientY / window.innerHeight) * 2 - 1

      let timeline = gsap.timeline()
      timeline.to(glb.scene.rotation, {
        duration: .5,
        x: y,
        y: x,
        duration: 1
      })
    })

  })

  loader.load('./model/moon.glb', glb => {
    let moon = glb.scene.children[0]

    for (let i = 0; i < 1e1; i++) {
      let moonInstance = new T.InstancedMesh(moon.geometry, moon.material, 100)
      for (let j = 0; j < 1e2; j++) {
        let x = Math.random() * 1e3 - 5e2,
          y = Math.random() * 1e3 - 5e2,
          z = Math.random() * 1e3 - 5e2
        let matrix = new T.Matrix4()
        let size = Math.random() * 2e1 - 8
        matrix.makeScale(size)
        matrix.makeTranslation(x, y, z)
        moonInstance.setMatrixAt(j, matrix)
      }
      gsap.to(moonInstance.position, {
        duration: Math.random() * 1e1 + 2,
        z: -1e3,
        ease: 'linear',
        repeat: -1
      })
      scene.add(moonInstance)
    }
  })
}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})


var timeWheel = gsap.timeline()
window.addEventListener('mousewheel', e => {
  if (e.wheelDelta < 0) {
    page++
    if (page > 2) {
      page = 2
    }
  } else {
    page--
    if (page < 0) {
      page = 0
    }
  }
  if (!timeWheel.isActive()) {
    timeWheel.to(camera.position, {
      duration: .5,
      y: -page * 8,
      duration: 1
    })
    gsap.to(pageDom, {
      duration: 1,
      y: -page * window.innerHeight,
      duration: 1
    })
  }
})


function render() {
  requestAnimationFrame(render)
  webgl.render(scene, camera)
}



