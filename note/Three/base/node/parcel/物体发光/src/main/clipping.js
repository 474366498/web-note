

import * as T from 'three'

import Stats from 'three/examples/jsm/libs/stats.module'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


var camera, scene, webgl, startTime, object, stats, control

init()

animate()

function init() {

  camera = new T.PerspectiveCamera(36, window.innerWidth / window.innerHeight, .25, 16)
  camera.position.set(0, 1.3, 3)

  scene = new T.Scene()
  // scene.add(new T.GridHelper(1e2, 1e2, 0xff0000, 0xfffff00))

  scene.add(new T.AmbientLight(0x505050))

  const spot = new T.SpotLight(0xffffff)
  spot.angle = Math.PI / 5
  spot.penumbra = .2
  spot.position.set(2, 3, 3)
  spot.castShadow = true
  spot.shadow.camera.near = 3
  spot.shadow.camera.far = 10
  spot.shadow.mapSize.width = 1024
  spot.shadow.mapSize.height = 1024
  scene.add(spot)

  const dir = new T.DirectionalLight(0x55505a, 1)
  dir.position.set(0, 3, 0)
  dir.castShadow = true
  dir.shadow.camera.near = 1
  dir.shadow.camera.far = 10

  dir.shadow.camera.right = 1
  dir.shadow.camera.left = -1
  dir.shadow.camera.top = 1
  dir.shadow.camera.bottom = -1

  dir.shadow.mapSize.width = 1024
  dir.shadow.mapSize.height = 1024
  scene.add(dir)

  const localPlane = new T.Plane(new T.Vector3(0, -1, 0), .8),
    globalPlane = new T.Plane(new T.Vector3(-1, 0, 0), .1)

  const material = new T.MeshPhongMaterial({
    color: 0xffff10,
    shininess: 1e2,
    side: T.DoubleSide,
    clippingPlanes: [localPlane],
    clipShadows: true
  })

  const geo = new T.TorusKnotGeometry(.4, .08, 96, 2e1, 3, 7)

  object = new T.Mesh(geo, material)
  object.castShadow = true
  scene.add(object)

  const ground = new T.Mesh(
    new T.PlaneGeometry(9, 9, 1, 1),
    new T.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  stats = new Stats()
  document.body.appendChild(stats.dom)

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.shadowMap.enabled = true
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  const globalPlanes = [globalPlane], Empty = Object.freeze([])

  webgl.clippingPlanes = Empty
  webgl.localClippingEnabled = true


  control = new OrbitControls(camera, webgl.domElement)
  control.target.set(0, 1, 0)
  control.update()

  const gui = new GUI(),
    folderLocal = gui.addFolder('Local Clipping'),
    propsLocal = {
      get 'Enabled'() {
        return webgl.localClippingEnabled
      },
      set 'Enabled'(v) {
        webgl.localClippingEnabled = v
      },
      get 'Shadows'() {
        return material.clipShadows
      },
      set 'Shadows'(v) {
        material.clipShadows = v
      },
      get 'Plane'() {
        return localPlane.constant
      },
      set 'Plane'(v) {
        localPlane.constant = v
      }
    },
    folderGlobal = gui.addFolder('Global Clipping'),
    propsGlobal = {
      get 'Enabled'() {
        return webgl.clippingPlanes !== Empty
      },
      set 'Enabled'(v) {
        webgl.clippingPlanes = v ? globalPlanes : Empty
      },
      get 'Plane'() {
        return globalPlane.constant
      },
      set 'Plane'(v) {
        globalPlane.constant = v
      }
    }

  folderLocal.add(propsLocal, 'Enabled')
  folderLocal.add(propsLocal, 'Shadows')
  folderLocal.add(propsLocal, 'Plane', .3, 1.25)

  folderGlobal.add(propsGlobal, 'Enabled')
  folderGlobal.add(propsGlobal, 'Plane', -.4, 3)

  startTime = Date.now()




  window.addEventListener('resize', e => onWindowResize(e))



}


const onWindowResize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
}



function animate() {
  const currentTime = Date.now(),
    time = (currentTime - startTime) / 1e3


  requestAnimationFrame(animate)

  object.position.y = .8
  object.rotation.x = time * .8
  object.rotation.y = time * .8
  object.scale.setScalar(Math.cos(time) * .125 + .875)

  stats.update()
  webgl.render(scene, camera)
}





