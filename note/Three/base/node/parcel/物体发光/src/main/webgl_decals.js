

import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry'

var webgl, scene, camera, stats, control
var mesh, ray = new T.Raycaster(), line

const intersection = {
  intersects: false,
  point: new T.Vector3(),
  normal: new T.Vector3()
}

const mouse = new T.Vector2()

const intersects = []

const textureLoader = new T.TextureLoader(),
  decalDiffuse = textureLoader.load('./textures/decal/decal-diffuse.png'),
  decalNormal = textureLoader.load('./textures/decal/decal-normal.png')

const decalMaterial = new T.MeshPhongMaterial({
  specular: 0x444444,
  map: decalDiffuse,
  normalMap: decalNormal,
  normalScale: new T.Vector2(1, 1),
  shininess: 30,
  transparent: true,
  depthTest: true,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -4,
  wireframe: false
})

const decals = []
let mouseHelper

const position = new T.Vector3(), orientation = new T.Euler(), size = new T.Vector3(10, 10, 10)

const params = {
  minScale: 10,
  maxScale: 20,
  rotate: true,
  clear: () => {
    removeDecals()
  }
}


function removeDecals() {

  decals.forEach(d => {
    scene.remove(d)
  })
  decals.length = 0

}

const addLights = () => {
  const dir1 = new T.DirectionalLight(0xffddcc, 1)
  dir1.position.set(1, .75, .5)
  scene.add(dir1)

  const dir2 = new T.DirectionalLight(0xccccff, 1)
  dir2.position.set(-1, .75, -.5)
  scene.add(dir2)

},
  loadLeePerrySmith = () => {
    const loader = new GLTFLoader()
    loader.load('./model/LeePerrySmith.glb', gltf => {
      mesh = gltf.scene.children[0]
      mesh.material = new T.MeshPhongMaterial({
        specular: 0x111111,
        map: textureLoader.load('./model/gltf/LeePerrySmith/Map-COL.jpg'),
        specularMap: textureLoader.load('./model/gltf/LeePerrySmith/Map-SPEC.jpg'),
        normalMap: textureLoader.load('./model/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'),
        shininess: 25
      })
      scene.add(mesh)
      mesh.scale.set(10, 10, 10)
    })

  }

function init() {

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  scene = new T.Scene()

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1e3)
  camera.position.z = 1e2

  control = new OrbitControls(camera, webgl.domElement)
  control.minDistance = 1
  control.maxDistance = 2e2

  scene.add(new T.AmbientLight(0x443333))



  addLights()

  const geo = new T.BufferGeometry()
  geo.setFromPoints([new T.Vector3(), new T.Vector3()])

  line = new T.Line(geo, new T.LineBasicMaterial())
  scene.add(line)

  loadLeePerrySmith()

  mouseHelper = new T.Mesh(
    new T.BoxGeometry(1, 1, 10),
    new T.MeshNormalMaterial()
  )

  mouseHelper.visible = false
  scene.add(mouseHelper)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })


  let moved = false

  control.addEventListener('change', () => moved = true)
  window.addEventListener('pointerdown', () => moved = false)
  window.addEventListener('pointerup', event => {
    if (moved === false) {
      checkIntersection(event.clientX, event.clientY)
      if (intersection.intersects) shoot()
    }
  })
  window.addEventListener('pointermove', event => {
    if (event.isPrimary) {
      checkIntersection(event.clientX, event.clientY)
    }
  })

  function checkIntersection(x, y) {
    if (!mesh) return

    mouse.x = (x / window.innerWidth) * 2 - 1
    mouse.y = -(y / window.innerHeight) * 2 + 1

    ray.setFromCamera(mouse, camera)
    ray.intersectObject(mesh, false, intersects)

    if (intersects.length > 0) {
      const p = intersects[0].point
      mouseHelper.position.copy(p)
      intersection.point.copy(p)

      const n = intersects[0].face.normal.clone()
      n.transformDirection(mesh.matrixWorld)
      n.multiplyScalar(10)
      n.add(intersects[0].point)

      intersection.normal.copy(intersects[0].face.normal)
      mouseHelper.lookAt(n)

      const positions = line.geometry.attributes.position
      positions.setXYZ(0, p.x, p.y, p.z)
      positions.setXYZ(1, n.x, n.y, n.z)
      positions.needsUpdate = true

      intersection.intersects = true
      intersects.length = 0

    } else {
      intersection.intersects = false
    }

  }

  function shoot() {
    position.copy(intersection.point)
    orientation.copy(mouseHelper.rotation)

    if (params.rotate) orientation.z = Math.random() * 2 * Math.PI

    const scale = params.minScale + Math.random() * (params.maxScale - params.minScale)
    size.set(scale, scale, scale)

    const material = decalMaterial.clone()
    material.color.setHex(Math.random() * 0xffffff)

    const m = new T.Mesh(new DecalGeometry(mesh, position, orientation, size), material)

    decals.push(m)
    scene.add(m)

  }


  const gui = new GUI()
  gui.add(params, 'minScale', 1, 30)
  gui.add(params, 'maxScale', 10, 40)
  gui.add(params, 'rotate')
  gui.add(params, 'clear')
  gui.open()

}

function animate() {
  // debugger
  requestAnimationFrame(animate)
  webgl.render(scene, camera)
  stats.update()
}

init()
animate()




