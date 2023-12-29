

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

var scene, camera, webgl, control, axes

const init = () => {
  scene = new T.Scene()
  scene.add(new T.AxesHelper(1e2))

  camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1e3)
  camera.position.z = 150
  camera.lookAt(0, 0, 0)

  webgl = new CSS3DRenderer()
  webgl.setSize(window.innerWidth, window.innerHeight)
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  control = new OrbitControls(camera, webgl.domElement)
  control.minDistance = 1e2
  control.maxDistance = 1e3
  createCssObject()

  window.addEventListener('resize', onWindowResize)

},
  createCssObject = () => {
    const iframe = document.createElement('iframe')
    iframe.src = 'https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS2DRenderer'
    iframe.style.width = window.innerWidth + 'px'
    iframe.style.height = window.innerHeight + 'px'
    iframe.style.background = '#f00'
    iframe.style.border = '1em solid #1890ff'
    iframe.style.boxShadow = '0 0 2em #f00'

    const obj = new CSS3DObject(iframe)
    obj.position.set(0, 0, 0)
    obj.scale.set(.1, .1, .1)

    scene.add(obj)

  },
  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)
  },
  animate = () => {
    requestAnimationFrame(animate)
    webgl.render(scene, camera)
  }



init()

animate()



