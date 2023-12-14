


import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

var scene, webgl, camera, stats, controls, model, animations, skeleton, mixer, clock

const crossFadeControls = []

var idleAction, walkAction, runAction
var idleWeight, walkWeight, runWeight

var actions, settings

let singleStepMode = false, sizeOfNextStep = 0

init()
animate()

function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.set(1, 2, -3)
  camera.lookAt(0, 1, 0)

  clock = new T.Clock()

  scene = new T.Scene()
  scene.background = new T.Clock(0xa0a0a0)
  scene.fog = new T.Fog(0xa0a0a0, 1e1, 5e1)

  addLights()

  const mesh = new T.Mesh(
    new T.PlaneGeometry(1e2, 1e2),
    new T.MeshPhongMaterial({
      color: 0x999999,
      depthWrite: false
    })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  const loader = new GLTFLoader()
  loader.load('./model/Soldier.glb', gltf => {
    console.log(51, gltf)
    model = gltf.scene
    animations = gltf.animations
    scene.add(model)

    model.traverse(obj => {
      if (obj.isMesh) obj.castShadow = true
    })

    skeleton = new T.SkeletonHelper(model)
    skeleton.visible = false
    scene.add(skeleton)

    createPanel()

    mixer = new T.AnimationMixer(model)

    idleAction = mixer.clipAction(animations[0])
    walkAction = mixer.clipAction(animations[3])
    runAction = mixer.clipAction(animations[1])

    actions = [idleAction, walkAction, runAction]

    activateAllActions()



  })




  webgl = new T.WebGLRenderer({
    antialias: true
  })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.outputColorSpace = T.SRGBColorSpace
  webgl.shadowMap.enabled = true
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)

  controls = new OrbitControls(camera, webgl.domElement)

}

function addLights() {
  scene.add(new T.GridHelper(4e2, 5e1, 0xff0000, 0xffff00))
  const hemiLight = new T.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)
  scene.add(new T.HemisphereLightHelper(hemiLight))

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(-3, 10, -10)
  dirLight.castShadow = true
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = - 2;
  dirLight.shadow.camera.left = - 2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight)
  scene.add(new T.DirectionalLightHelper(dirLight))

}

function createPanel() {

  const panel = new GUI({ width: 320 })




}

function activateAllActions() {



}

function onWindowResize() {




}

function animate() {
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
}






