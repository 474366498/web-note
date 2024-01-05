

import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


var camera, scene, webgl, control, startTime, stats, object, clipMaterial, volumeVisualization, globalClippingPlanes

const planeToMatrix = (function () {

  let xAxis = new T.Vector3(),
    yAxis = new T.Vector3(),
    trans = new T.Vector3()
  return function planeToMatrix(plane) {
    console.log(19, plane)
    const zAxis = plane.normal, matrix = new T.Matrix4()
    if (Math.abs(zAxis.x) > Math.abs(zAxis.z)) {
      yAxis.set(-zAxis.y, zAxis.x, 0)
    } else {
      yAxis.set(0, -zAxis.z, zAxis.y)
    }
    xAxis.crossVectors(yAxis.normalize(), zAxis)
    plane.coplanarPoint(trans)
    return matrix.set(
      xAxis.x, yAxis.x, zAxis.x, trans.x,
      xAxis.y, yAxis.y, zAxis.y, trans.y,
      xAxis.z, yAxis.z, zAxis.z, trans.z,
      0, 0, 0, 1
    )
  }
})()

const planesFromMesh = (vertices, indices) => {
  console.log(33, vertices, indices)
  let n = indices.length / 3, result = new Array(n)

  for (let i = 0, j = 0; i < n; i++, j += 3) {
    let a = vertices[indices[j]],
      b = vertices[indices[j + 1]],
      c = vertices[indices[j + 2]]
    result[i] = new T.Plane().setFromCoplanarPoints(a, b, c)
  }

  return result
}, createPlanes = (n) => {
  const result = new Array(n)
  for (let i = 0; i !== n; i++) {
    result[i] = new T.Plane()
  }
  console.log(55, n, result)
  return result

}, cylindricalPlanes = (n, innerRadius) => {

  const result = createPlanes(n)
  for (let i = 0; i !== n; i++) {
    let plane = result[i], angle = i * Math.PI * 2 / n
    plane.normal.set(Math.cos(angle), 0, Math.sin(angle))
    plane.constant = innerRadius
  }
  return result
}

const Vertices = [
  new T.Vector3(+ 1, 0, + Math.SQRT1_2),
  new T.Vector3(- 1, 0, + Math.SQRT1_2),
  new T.Vector3(0, + 1, - Math.SQRT1_2),
  new T.Vector3(0, - 1, - Math.SQRT1_2)
],

  Indices = [
    0, 1, 2, 0, 2, 3, 0, 3, 1, 1, 3, 2
  ],

  Planes = planesFromMesh(Vertices, Indices),
  PlaneMatrices = Planes.map(planeToMatrix),

  GlobalClippingPlanes = cylindricalPlanes(5, 2.5),

  Empty = Object.freeze([])

const transform = new T.Matrix4(), tmpMatrix = new T.Matrix4()

console.log(56, Planes, PlaneMatrices, GlobalClippingPlanes)




function init() {
  camera = new T.PerspectiveCamera(36, window.innerWidth / window.innerHeight, .25, 64)
  camera.position.set(0, 1.5, 3)

  scene = new T.Scene()
  // scene.add(new T.AxesHelper(10))
  scene.add(new T.AmbientLight(0xffffff, .3))

  addLights()

  addGeometry()

  webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
  webgl.shadowMap.enabled = true
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  globalClippingPlanes = createPlanes(GlobalClippingPlanes.length)
  webgl.clippingPlanes = Empty
  webgl.localClippingEnabled = true

  stats = new Stats()
  document.body.appendChild(stats.dom)

  control = new OrbitControls(camera, webgl.domElement)
  control.minDistance = 1
  control.maxDistance = 16
  control.target.set(0, 1, 0)
  control.update()

  initGui()

  startTime = Date.now();

  window.addEventListener('resize', function () {
    console.log(127)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  })

}

function addLights() {

  const spot = new T.SpotLight(0xffffff, .5)
  spot.angle = Math.PI / 5
  spot.penumbra = .2
  spot.position.set(2, 3, 3)
  spot.castShadow = true
  spot.shadow.camera.near = 3
  spot.shadow.camera.far = 10
  spot.shadow.mapSize.width = 1024
  spot.shadow.mapSize.height = 1024
  scene.add(spot)

  const dir = new T.DirectionalLight(0xffffff, .5)
  dir.position.set(0, 2, 0)
  dir.castShadow = true
  dir.shadow.camera.near = 1
  dir.shadow.camera.far = 10

  dir.shadow.camera.left = -1
  dir.shadow.camera.right = 1
  dir.shadow.camera.top = 1
  dir.shadow.camera.bottom = -1

  dir.shadow.mapSize.width = 1024
  dir.shadow.mapSize.height = 1024
  scene.add(dir)

}

function addGeometry() {
  let clippingPlanes = createPlanes(Planes.length)
  // clippingPlanes.forEach((item, index) => {
  //   index < 2 ? item.normal.set(0, 1, 0) : item.normal.set(1, 1, 0)
  // })
  console.log(159, clippingPlanes)
  clipMaterial = new T.MeshPhongMaterial({
    color: 0xee0a10,
    shininess: 1e2,
    side: T.DoubleSide,
    // clipIntersection: true,
    clippingPlanes: clippingPlanes,
    clipShadows: true
  })
  console.log(155, Planes, clipMaterial)

  object = new T.Group()

  const geo = new T.BoxGeometry(.18, .18, .18)
  for (let z = -2; z <= 2; z++)
    for (let y = -2; y <= 2; y++)
      for (let x = -2; x <= 2; x++) {
        const mesh = new T.Mesh(geo, clipMaterial)
        mesh.position.set(x / 5, y / 5, z / 5)
        mesh.castShadow = true
        object.add(mesh)
      }

  scene.add(object)

  const plane = new T.PlaneGeometry(3, 3, 1, 1),
    color = new T.Color()
  volumeVisualization = new T.Group()
  volumeVisualization.visible = false

  for (let i = 0, n = Planes.length; i < n; i++) {
    const material = new T.MeshBasicMaterial({
      color: color.setHSL(i / n, .5, .5).getHex(),
      side: T.DoubleSide,
      opacity: .2,
      transparent: true,
      clippingPlanes: clippingPlanes.filter(function (_, j) {
        return j !== i
      })
    })

    const mesh = new T.Mesh(plane, material)
    mesh.matrixAutoUpdate = false
    volumeVisualization.add(mesh)
  }
  console.log(215, volumeVisualization)
  scene.add(volumeVisualization)

  const ground = new T.Mesh(
    plane,
    new T.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 10,
      side: T.DoubleSide
    })
  )

  ground.rotation.x = -Math.PI / 2
  ground.scale.multiplyScalar(3)
  ground.receiveShadow = true
  scene.add(ground)


}

function initGui() {
  const gui = new GUI(),
    folder = gui.addFolder('Local Clipping'),
    props = {
      get 'Enabled'() {
        return webgl.localClippingEnabled
      },
      set 'Enabled'(v) {
        webgl.localClippingEnabled = v
        if (!v) volumeVisualization.visible = false
      },
      get 'Shadows'() {
        return clipMaterial.clipShadows
      },
      set 'Shadows'(v) {
        clipMaterial.clipShadows = v
      },
      get 'Visualize'() {
        return volumeVisualization.visible
      },
      set 'Visualize'(v) {
        if (webgl.localClippingEnabled)
          volumeVisualization.visible = v
      }
    }

  folder.add(props, 'Enabled')
  folder.add(props, 'Shadows')
  folder.add(props, 'Visualize')

  gui.addFolder('Global Clipping')
    .add({
      get 'Enabled'() {
        return webgl.clippingPlanes !== Empty
      },
      set 'Enabled'(v) {
        webgl.clippingPlanes = v ? globalClippingPlanes : Empty
      }
    }, 'Enabled')
}

const assignTransformedPlanes = (planesOut, planesIn, matrix) => {
  for (let i = 0, n = planesIn.length; i < n; i++)
    planesOut[i].copy(planesIn[i]).applyMatrix4(matrix)
},
  setObjectWorldMatrix = (object, matrix) => {
    const parent = object.parent
    scene.updateMatrixWorld()
    object.matrix.copy(parent.matrixWorld).invert()
    object.applyMatrix4(matrix)
  }

// transform      tmpMatrix
function animate() {
  // debugger
  requestAnimationFrame(animate)
  let currentTime = Date.now(), time = (currentTime - startTime) / 1e3

  object.position.y = 1
  object.rotation.x = time * .5
  object.rotation.y = time * .2
  object.updateMatrix()
  transform.copy(object.matrix)

  const bouncy = Math.cos(time * .5) * .5 + .7
  transform.multiply(tmpMatrix.makeScale(bouncy, bouncy, bouncy))
  assignTransformedPlanes(clipMaterial.clippingPlanes, Planes, transform)

  const planeMeshes = volumeVisualization.children

  for (let i = 0, n = planeMeshes.length; i < n; i++) {
    tmpMatrix.multiplyMatrices(transform, PlaneMatrices[i])
    setObjectWorldMatrix(planeMeshes[i], tmpMatrix)
  }
  transform.makeRotationY(time * .1)
  assignTransformedPlanes(globalClippingPlanes, GlobalClippingPlanes, transform)
  stats.update()
  webgl.render(scene, camera)
}



init()

animate()


