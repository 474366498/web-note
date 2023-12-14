


import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

var stats, clock, gui, mixer, actions, activeAction, previousAction

var camera, scene, webgl, model, face, controls

const api = { state: 'Walking' },
  gltfLoader = new GLTFLoader()

init()

animate()


function init() {

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .25, 1e2)
  camera.position.set(-5, 3, 10)
  camera.lookAt(0, 2, 0)

  scene = new T.Scene()
  scene.background = new T.Color(0xe0e0e0)
  scene.fog = new T.Fog(0xe0e0e0, 50, 1e2)
  clock = new T.Clock()

  const grid = new T.GridHelper(2e2, 1e2, 0xff0000, 0xffff00)
  scene.add(grid)
  const polar = new T.PolarGridHelper(1e2, 24, 10, 32, 0xff0000, 0x00ffff)
  scene.add(polar)
  console.log('grid', grid, 'polar', polar)

  addLights()

  addLoader()

  const mesh = new T.Mesh(
    new T.PlaneGeometry(2e3, 2e3),
    new T.MeshPhongMaterial({
      color: 0x999999,
      side: T.DoubleSide,
      depthWrite: false
    })
  )
  mesh.rotation.x = -Math.PI / 2
  scene.add(mesh)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.outputColorSpace = T.SRGBColorSpace
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResize)
  controls = new OrbitControls(camera, webgl.domElement)

}

function addLights() {

  const hemiLight = new T.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 20, 10)
  scene.add(hemiLight)

  const dirLight = new T.DirectionalLight(0xffffff)
  dirLight.position.set(0, 20, 10)
  scene.add(dirLight)

}

function addLoader() {
  gltfLoader.load('./model/RobotExpressive.glb', gltf => {
    model = gltf.scene
    scene.add(model)
    createGui(model, gltf.animations)
  }, undefined, error => {
    console.log(81, error)
  })
}

function createGui(model, animations) {

  const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'],
    emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

  gui = new GUI()
  mixer = new T.AnimationMixer(model)

  actions = {}

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i],
      action = mixer.clipAction(clip)
    actions[clip.name] = action

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true
      action.loop = T.LoopOnce
    }

  }

  // states 
  const statesFolder = gui.addFolder('States')
  const clipCtrl = statesFolder.add(api, 'state').options(states)

  clipCtrl.onChange(function () {
    fadeToAction(api.state, .5)
  })

  statesFolder.open()

  // emotes 
  const emoteFolder = gui.addFolder('Emotes 面部表情')
  emoteFolder.open()
  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i])
  }

  function createEmoteCallback(name) {
    api[name] = function () {
      fadeToAction(name, .2)
      mixer.addEventListener('finished', restoreState)
    }
    emoteFolder.add(api, name)
  }

  function restoreState() {
    mixer.removeEventListener('finished', restoreState)
    fadeToAction(api.state, .2)
  }

  // expressions
  face = model.getObjectByName('Head_4')
  const expressions = Object.keys(face.morphTargetDictionary)
  const expressionFolder = gui.addFolder('Expression 表情幅度')
  expressionFolder.open()

  console.log(face, 'expressions', expressions)
  for (let i = 0; i < expressions.length; i++) {
    expressionFolder.add(face.morphTargetInfluences, i, 0, 2, .01).name(expressions[i])
  }

  activeAction = actions['Walking']
  activeAction.play()

}

function fadeToAction(name, duration) {
  console.log(142, name, actions)
  previousAction = activeAction
  activeAction = actions[name]

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration)
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play()

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  stats && stats.update()
  let d = clock.getDelta()
  mixer && mixer.update(d)
  webgl.render(scene, camera)

}







