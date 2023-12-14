


import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as CC from 'three/examples/jsm/animation/CCDIKSolver'
import { CCDIKSolver, CCDIKHelper } from 'three/examples/jsm/animation/CCDIKSolver'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

console.log(13, CC, CCDIKSolver, CCDIKHelper)
var scene, camera, webgl, oControls, tControls, stats, gui, conf
let mirrorSphereCamera

const OOI = {}, v0 = new T.Vector3()
let IKSolver

init().then(animate)


async function init() {

  conf = {
    followSphere: false,
    turnHead: true,
    ik_solver: true
  }

  scene = new T.Scene()
  scene.fog = new T.FogExp2(0xffffff, .17)
  scene.background = new T.Color(0xdddddd)

  // scene.add(new T.GridHelper(3e3, 3e2, 0xff0000, 0xffff00))
  // scene.add(new T.PolarGridHelper(4e3, 2e1, 10, 32, 0x0000ff, 0x00ffff))

  camera = new T.PerspectiveCamera(55, window.innerWidth / window.innerHeight, .001, 5e3)
  camera.position.set(0.9728517749133652, 1.1044765132727201, 0.7316689528482836)
  camera.lookAt(scene.position)

  const light = new T.AmbientLight(0xffffff, 8)
  scene.add(light)

  webgl = new T.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.outputColorSpace = T.SRGBColorSpace
  webgl.physicallyCorrectLights = true
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  oControls = new OrbitControls(camera, webgl.domElement)
  oControls.minDistance = .2
  oControls.maxDistance = 1.5
  oControls.enableDamping = true

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  const gltf = await gltfLoader.loadAsync('./model/kira.glb')
  console.log(66, gltf)

  gltf.scene.traverse(n => {
    if (n.name === 'head') OOI.head = n;
    if (n.name === 'lowerarm_l') OOI.lowerarm_l = n;
    if (n.name === 'Upperarm_l') OOI.Upperarm_l = n;
    if (n.name === 'hand_l') OOI.hand_l = n;
    if (n.name === 'target_hand_l') OOI.target_hand_l = n;

    if (n.name === 'boule') OOI.sphere = n;
    if (n.name === 'Kira_Shirt_left') OOI.kira = n;

    if (n.isMesh) n.frustumCulled = false;
  })

  scene.add(gltf.scene)

  oControls.target.copy(OOI.sphere.position)
  OOI.hand_l.attach(OOI.sphere)

  // mirror sphere

  const cubeRenderTarget = new T.WebGLCubeRenderTarget(1024)
  mirrorSphereCamera = new T.CubeCamera(.05, 5e1, cubeRenderTarget)
  scene.add(mirrorSphereCamera)
  const mirrorSphereMaterial = new T.MeshBasicMaterial({ envMap: cubeRenderTarget.texture })
  OOI.sphere.material = mirrorSphereMaterial

  tControls = new TransformControls(camera, webgl.domElement)
  tControls.size = .75
  tControls.showX = false
  tControls.space = 'world'
  tControls.attach(OOI.target_hand_l)
  scene.add(tControls)
  // disable orbitControls while using transformControls    在使用变换控件时禁用轨道控件
  tControls.addEventListener('mouseDown', () => oControls.enabled = false)
  tControls.addEventListener('mouseUp', () => oControls.enabled = true)

  OOI.kira.add(OOI.kira.skeleton.bones[0])
  const iks = [
    {
      target: 22, // "target_hand_l"
      effector: 6, // "hand_l"
      links: [
        {
          index: 5, // "lowerarm_l"
          rotationMin: new T.Vector3(1.2, - 1.8, - .4),
          rotationMax: new T.Vector3(1.7, - 1.1, .3)
        },
        {
          index: 4, // "Upperarm_l"
          rotationMin: new T.Vector3(0.1, - 0.7, - 1.8),
          rotationMax: new T.Vector3(1.1, 0, - 1.4)
        },
      ],
    }
  ]

  IKSolver = new CCDIKSolver(OOI.kira, iks)
  console.log(125, OOI.kira, iks)
  // const ccdikHelper = new CCDIKHelper(OOI.kira, iks, .01)
  // scene.add(ccdikHelper)

  gui = new GUI()
  gui.add(conf, 'followSphere').name('follow sphere');
  gui.add(conf, 'turnHead').name('turn head');
  gui.add(conf, 'ik_solver').name('IK auto update');
  gui.add(IKSolver, 'update').name('IK manual update()');
  gui.open();

  window.addEventListener('resize', onWindowResize)

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
}


function animate() {

  if (OOI.sphere && mirrorSphereCamera) {

    OOI.sphere.visible = false;
    OOI.sphere.getWorldPosition(mirrorSphereCamera.position);
    mirrorSphereCamera.update(webgl, scene);
    OOI.sphere.visible = true;

  }

  if (OOI.sphere && conf.followSphere) {

    // orbitControls follows the sphere
    OOI.sphere.getWorldPosition(v0);
    oControls.target.lerp(v0, .1);

  }

  if (OOI.head && OOI.sphere && conf.turnHead) {

    // turn head
    OOI.sphere.getWorldPosition(v0);
    OOI.head.lookAt(v0);
    OOI.head.rotation.set(OOI.head.rotation.x, OOI.head.rotation.y + Math.PI, OOI.head.rotation.z);

  }

  if (conf.ik_solver) {

    if (IKSolver) IKSolver.update();

  }

  webgl.render(scene, camera)
  oControls.update()
  stats.update()

  requestAnimationFrame(animate)

}


