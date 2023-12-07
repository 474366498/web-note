

import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'


var controls, camera, scene, webgl, stats, singleMaterial, zmaterial, parameters, nobjects, cubeMaterial

let mouseX = 0, mouseY = 0

let width = window.innerWidth, height = window.innerHeight, halfX = width / 2, halfY = height / 2

const materials = [], objects = []

const postprocessing = {}

init()

animate()

function init() {
  camera = new T.PerspectiveCamera(70, width / height, 1, 5e3)
  camera.position.z = 2e3

  scene = new T.Scene()
  scene.add(new T.AxesHelper(5e3))

  let spot = new T.SpotLight(0xffffff)
  spot.position.set(0, 0, 2e3)
  scene.add(new T.SpotLightHelper(spot))

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(width, height)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  let path = './textures/SwedishRoyalCastle/'
  const urls = [
    path + 'px.jpg', path + 'nx.jpg',
    path + 'py.jpg', path + 'ny.jpg',
    path + 'pz.jpg', path + 'nz.jpg',
  ]

  const textureCube = new T.CubeTextureLoader().load(urls)

  parameters = { color: 0xff1100, envMap: textureCube }
  cubeMaterial = new T.MeshBasicMaterial(parameters)

  singleMaterial = false

  if (singleMaterial) zmaterial = [cubeMaterial]

  const geo = new T.SphereGeometry(1, 2e1, 2e1)
  const grid = 16
  nobjects = grid ** 3

  const s = 60
  let count = 0

  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      for (let k = 0; k < grid; k++) {
        let mesh
        if (singleMaterial) {
          mesh = new T.Mesh(geo, zmaterial)
        } else {
          mesh = new T.Mesh(geo, new T.MeshBasicMaterial(parameters))
          materials[count] = mesh.material
        }

        const x = 2e2 * (i - grid / 2), y = 2e2 * (j - grid / 2), z = 2e2 * (k - grid / 2)
        mesh.position.set(x, y, z)
        mesh.scale.set(s, s, s)

        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()
        scene.add(mesh)
        objects.push(mesh)
        count++
      }
    }
  }
  console.log(82, objects)
  initPostprocessing()
  webgl.autoClear = false

  stats = new Stats()
  document.body.appendChild(stats.dom)

  document.body.style.touchAction = 'none'
  document.body.addEventListener('pointermove', event => onPointerMove(event))
  window.addEventListener('resize', event => onWindowResize(event))

  controls = new OrbitControls(camera, webgl.domElement)
  controls.enableZoom = true

  initGui()

}

function initGui() {
  const effectController = {
    focus: 5e2,
    aperture: 5,
    maxblur: .01
  }

  const matChange = function () {
    postprocessing.bokeh.uniforms['focus'] = effectController.focus
    postprocessing.bokeh.uniforms['aperture'] = effectController.aperture * .00001
    postprocessing.bokeh.uniforms['maxblur'] = effectController.maxblur
    console.log(effectController)
  }

  const gui = new GUI()

  gui.add(effectController, 'focus', 10, 3e3, 10).onChange(matChange)
  gui.add(effectController, 'aperture', 0, 10, .1).onChange(matChange)
  gui.add(effectController, 'maxblur', 0, .01, .001).onChange(matChange)
  gui.close()

  matChange()

}


function animate() {
  // console.log(133, camera.position)
  requestAnimationFrame(animate)
  stats.update()
  const time = Date.now() * .00005
  camera.position.x += (mouseX - camera.position.x) * .036
  camera.position.y += (- (mouseY) - camera.position.y) * .036
  camera.lookAt(scene.position)

  if (!singleMaterial) {
    for (let i = 0; i < nobjects; i++) {
      const h = (360 * (i / nobjects + time) % 360) / 360
      materials[i].color.setHSL(h, 1, .5)
    }
  }
  postprocessing.composer.render(.1)
}
//  bokeh 
function initPostprocessing() {
  const renderPass = new RenderPass(scene, camera),
    bokehPass = new BokehPass(scene, camera, {
      focus: 1,
      aperture: .025,
      maxblur: .01
    }),
    composer = new EffectComposer(webgl)

  composer.addPass(renderPass)
  composer.addPass(bokehPass)

  postprocessing.composer = composer
  postprocessing.bokeh = bokehPass

}

const onPointerMove = event => {
  // console.log('pointermove', event)
  if (event.isPrimary === false) return
  mouseX = event.clientX - halfX
  mouseY = event.clientY - halfY
}

const onWindowResize = event => {
  // console.log('resize', event)
  width = window.innerWidth
  height = window.innerHeight
  halfX = width / 2
  halfY = height / 2

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  webgl.setSize(width, height)
  postprocessing.composer.setSize(width, height)

}








