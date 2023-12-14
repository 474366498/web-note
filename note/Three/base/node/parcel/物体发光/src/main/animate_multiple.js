

import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var camera, scene, webgl, clock, controls
var mixers = []
const glbLoader = new GLTFLoader()

init()

animate()


function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.set(2, 3, -6)
  camera.lookAt(0, 1, 0)

  clock = new T.Clock()

  scene = new T.Scene()
  scene.add(new T.AxesHelper(5e2))
  scene.background = new T.Color(0xa0a0a0)
  scene.fog = new T.Fog(0xa0a0a0, 10, 50)

  const hemiLight = new T.HemisphereLight(0XFFFFFF, 0X444444)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(-3, 10, -10)
  dirLight.castShadow = true
  dirLight.shadow.camera.top = 4
  dirLight.shadow.camera.bottom = -4
  dirLight.shadow.camera.left = -4
  dirLight.shadow.camera.right = 4
  dirLight.shadow.camera.near = .1
  dirLight.shadow.camera.far = 40
  scene.add(dirLight)

  const mesh = new T.Mesh(
    new T.PlaneGeometry(2E2, 2E2),
    new T.MeshPhongMaterial({
      color: 0xff9999,
      side: T.DoubleSide,
      depthWrite: false
    })
  )
  mesh.position.set(0, 0, 0)
  mesh.rotation.x = -Math.PI / 2
  scene.add(mesh)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.outputColorSpace = T.SRGBColorSpace
  webgl.shadowMap.enabled = true
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  loaderGlb()

  controls = new OrbitControls(camera, webgl.domElement)
  window.addEventListener('resize', onWindowResize)
}

function loaderGlb() {
  glbLoader.load('./model/Soldier.glb', gltf => {
    console.log(72, gltf)

    gltf.scene.traverse(obj => obj.isMesh && (obj.castShadow = true))

    var models = []
    var animations = gltf.animations
    console.log(78, animations)
    for (let i = 0; i < animations.length; i++) {
      let model = SkeletonUtils.clone(gltf.scene)
      let mixer = new T.AnimationMixer(model)
      console.log(85, i, model, mixer)
      mixer.clipAction(animations[i]).play()
      model.position.x = 2 * i - 2
      models.push(model)
      mixers.push(mixer)
      scene.add(model)
    }
    console.log(89, models)
  })
  console.log(91, mixers, mixers.length)

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  let delta = clock.getDelta()
  for (let mixer of mixers) mixer.update(delta)
  webgl.render(scene, camera)
}





