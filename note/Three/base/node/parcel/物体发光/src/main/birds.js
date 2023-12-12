
import * as T from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'







/**
 * world 
 */
const clock = new T.Clock()
var camera, controls, webgl, scene, loop

class World {

  constructor(dom) {
    camera = createCamera()
    webgl = createWebgl()
    scene = createScene()
    loop = new Loop(camera, scene, webgl)
    dom.append(webgl.domElement)
    controls = createControls(camera, webgl.domElement)

    const { ambientLight, mainLight } = createLights()
    loop.tables.push(controls)
    scene.add(ambientLight, mainLight)
    const resize = new Resize(dom, camera, webgl)
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()
    // console.log(37, parrot, flamingo, stork)  
    controls.target.copy(parrot.position)
    loop.tables.push(parrot, flamingo, stork)
    scene.add(parrot, flamingo, stork)
  }
  render() {
    webgl.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }

}


function createCamera() {

  const camera = new T.PerspectiveCamera(35, 1, .1, 1e2)
  camera.position.set(-1.5, 1.5, 6.5)
  return camera
}

function createWebgl() {
  const webgl = new T.WebGLRenderer({ antialias: true })
  webgl.physicallyCorrectLights = true
  return webgl
}

function createScene() {
  const scene = new T.Scene()
  scene.background = new T.Color('skyblue')
  return scene
}

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.tick = () => controls.update()
  return controls
}

function createLights() {
  const ambientLight = new T.HemisphereLight('white', 'darkslategrey', 5)
  const mainLight = new T.DirectionalLight('white', 4)
  mainLight.position.set(10, 10, 10)
  return {
    ambientLight,
    mainLight
  }
}

async function loadBirds() {
  const loader = new GLTFLoader()
  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('./birds/Parrot.glb'),
    loader.loadAsync('./birds/Flamingo.glb'),
    loader.loadAsync('./birds/Stork.glb'),

  ])
  console.log(100, parrotData)
  const parrot = setupModel(parrotData),
    flamingo = setupModel(flamingoData),
    stork = setupModel(storkData)

  parrot.position.set(0, 0, 2.5)
  flamingo.position.set(7.5, 0, -10)
  stork.position.set(0, -2.5, -10)
  return {
    parrot,
    flamingo,
    stork
  }
}


function setupModel(data) {
  let model = data.scene.children[0],
    clip = data.animations[0]

  const mixer = new T.AnimationMixer(model),
    action = mixer.clipAction(clip, model)
  // existing = mixer.existingAction(clip, model)//

  console.log(120, data, mixer)
  action.play()
  model.tick = (delta) => mixer.update(delta)

  return model
}



/**
 * loop 
 */
class Loop {
  constructor(camera, scene, webgl) {
    this.camera = camera
    this.scene = scene
    this.webgl = webgl

    this.tables = []
  }

  start() {
    this.webgl.setAnimationLoop(() => {
      this.tick()
      this.webgl.render(this.scene, this.camera)
    })
  }
  stop() {
    this.webgl.setAnimationLoop(null)
  }
  tick() {
    const delta = clock.getDelta()
    for (let obj of this.tables) {
      obj.tick(delta)
    }
  }
}


/**
 * Resizer
 */

class Resize {
  constructor(dom, camera, webgl) {
    setSize(dom, camera, webgl)
    window.addEventListener('resize', () => {
      setSize(dom, camera, webgl);
      this.onResize()
    })
  }
  onResize() { }
}

function setSize(dom, camera, webgl) {
  let w = dom.clientWidth, h = dom.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  webgl.setSize(w, h)
  webgl.setPixelRatio(window.devicePixelRatio)
}



async function main() {
  let dom = document.createElement('div')
  dom.style.width = '100vw'
  dom.style.height = '100vh'
  document.body.appendChild(dom)
  const world = new World(dom)
  await world.init()
  world.start()

}

main().catch(error => {
  console.error(error)
})