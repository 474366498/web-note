


import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'


var camera, scene, webgl, controls, stats, gui
var composer, effectEXAA, outlinePass

let selectObjects = []

const raycaster = new T.Raycaster(),
  mouse = new T.Vector2(),
  obj3D = new T.Object3D(),
  group = new T.Group()

const params = {
  edgeStrength: 3,
  edgeGlow: 0,
  edgeThickness: 1,
  pulsePeriod: 0,
  rotate: false,
  usePatternTexture: false
}


initGui()
init()
animate()


function initGui() {
  gui = new GUI({ width: 280 });

  gui.add(params, 'edgeStrength', 0.01, 10).onChange(function (value) {

    outlinePass.edgeStrength = Number(value);

  });

  gui.add(params, 'edgeGlow', 0.0, 1).onChange(function (value) {

    outlinePass.edgeGlow = Number(value);

  });

  gui.add(params, 'edgeThickness', 1, 4).onChange(function (value) {

    outlinePass.edgeThickness = Number(value);

  });

  gui.add(params, 'pulsePeriod', 0.0, 5).onChange(function (value) {

    outlinePass.pulsePeriod = Number(value);

  });

  gui.add(params, 'rotate');

  gui.add(params, 'usePatternTexture').onChange(function (value) {

    outlinePass.usePatternTexture = value;

  });

  function Configuration() {

    this.visibleEdgeColor = '#ffffff';
    this.hiddenEdgeColor = '#190a05';

  }

  const conf = new Configuration();

  gui.addColor(conf, 'visibleEdgeColor').onChange(function (value) {

    outlinePass.visibleEdgeColor.set(value);

  });

  gui.addColor(conf, 'hiddenEdgeColor').onChange(function (value) {

    outlinePass.hiddenEdgeColor.set(value);

  });
}

function init() {
  webgl = new T.WebGLRenderer({
    antialias: true
  })

  webgl.shadowMap.enabled = true
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  scene = new T.Scene()
  scene.add(new T.AxesHelper(40))

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e2)
  camera.position.set(0, 0, 8)

  controls = new OrbitControls(camera, webgl.domElement)
  controls.minDistance = 5
  controls.maxDistance = 20
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = .05

  scene.add(new T.AmbientLight(0xaaaaaa, .2))
  const light = new T.DirectionalLight(0xddffdd, .6)
  light.position.set(1, 1, 1)
  light.castShadow = true
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024

  const d = 1e1
  light.shadow.camera.left = -d
  light.shadow.camera.right = d
  light.shadow.camera.top = d
  light.shadow.camera.bottom = -d
  light.shadow.camera.far = 1e3
  scene.add(light)

  const loader = new OBJLoader()
  loader.load('./model/tree.obj', function (obj) {
    console.log(137, obj)
    let scale = 1.0
    obj.traverse(child => {
      if (child instanceof T.Mesh) {
        child.geometry.center()
        // computeBoundingSphere
        child.geometry.computeBoundingSphere()
        scale = .2 * child.geometry.boundingSphere.radius

        const phongMaterial = new T.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shininess: 5 })
        child.material = phongMaterial
        child.receiveShadow = true
        child.castShadow = true
      }
    })
    obj.position.y = 1
    obj.scale.divideScalar(scale)
    obj3D.add(obj)
  })

  scene.add(group)
  group.add(obj3D)

  const geo = new T.SphereGeometry(2, 24, 24)
  for (let i = 0; i < 30; i++) {
    let material = new T.MeshLambertMaterial()
    material.color.setHSL(Math.random(), 1, .3)

    const mesh = new T.Mesh(geo, material)
    mesh.position.x = Math.random() * 6 - 2
    mesh.position.y = Math.random() * 6 - 2
    mesh.position.z = Math.random() * 6 - 2
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.scale.multiplyScalar(Math.random() * .3 + .1)
    group.add(mesh)
  }

  const floorMaterial = new T.MeshLambertMaterial({ side: T.DoubleSide })

  const floorGeo = new T.PlaneGeometry(12, 12)
  const floorMesh = new T.Mesh(floorGeo, floorMaterial)
  floorMesh.rotation.x -= Math.PI * .5
  floorMesh.position.y -= 1.5
  group.add(floorMesh)
  floorMesh.receiveShadow = true

  const torus = new T.Mesh(
    new T.TorusGeometry(1, .3, 16, 1e2),
    new T.MeshPhongMaterial({ color: 0xffaaff })
  )
  torus.position.z = -4
  group.add(torus)
  torus.receiveShadow = true
  torus.castShadow = true

  stats = new Stats()
  document.body.insertAdjacentElement('afterbegin', stats.dom)

  // postprocessing 
  composer = new EffectComposer(webgl)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  outlinePass = new OutlinePass(new T.Vector2(window.innerWidth, window.innerHeight), scene, camera)
  composer.addPass(outlinePass)

  const textureLoader = new T.TextureLoader()
  textureLoader.load('./textures/cloth_pos.png', texture => {
    outlinePass.patternTexture = texture
    texture.wrapS = T.RepeatWrapping
    texture.wrapT = T.RepeatWrapping
  })

  effectEXAA = new ShaderPass(FXAAShader)
  effectEXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
  composer.addPass(effectEXAA)

  window.addEventListener('resize', onWindowResize)

  webgl.domElement.style.touchAction = 'none'  // https://blog.csdn.net/qq_52697994/article/details/120746796
  // https://blog.csdn.net/wsln_123456/article/details/127185988
  webgl.domElement.addEventListener('click', (event) => {
    // if (event.isPrimary) return
    // console.log(220, event)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectObject(scene, true)
    if (intersects.length < 1) return
    let select = intersects[0].object
    outlinePass.selectedObjects = [select]
    console.log(229, intersects, outlinePass)
  })


}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
  effectEXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
}

function animate() {
  requestAnimationFrame(animate)
  // webgl.render(scene, camera)
  stats?.begin()
  composer.render()
  controls?.update()
  stats?.end()
}