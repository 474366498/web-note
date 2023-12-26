


import * as T from 'three'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import Stats from 'three/examples/jsm/libs/stats.module'



const NEAR = 1e-6, FAR = 1e27

let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
let screenSplit = .25, screenSplitRight = 0
const mouse = [.5, .5]
let zoomPos = -100, minZoomSpeed = .015
let zoomSpeed = minZoomSpeed

var border, stats, scene, container
const objects = {
  normal: '',
  logzbuf: '',
}

// Generate a number of text labels, from 1µm in size up to 100,000,000 light years  Try to use some descriptive real-world examples of objects at each scale   生成一些大小从1米到100万光年的文本标签，尝试在每个尺度上使用一些描述性的真实世界对象示例
const labelData = [
  { size: .01, scale: 0.0001, label: 'microscopic (1µm)' }, // FIXME - triangulating text fails at this size, so we scale instead
  { size: .01, scale: 0.1, label: 'minuscule (1mm)' },
  { size: .01, scale: 1.0, label: 'tiny (1cm)' },
  { size: 1, scale: 1.0, label: 'child-sized (1m)' },
  { size: 10, scale: 1.0, label: 'tree-sized (10m)' },
  { size: 100, scale: 1.0, label: 'building-sized (100m)' },
  { size: 1000, scale: 1.0, label: 'medium (1km)' },
  { size: 10000, scale: 1.0, label: 'city-sized (10km)' },
  { size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
  { size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
  { size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
  { size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
  { size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
  { size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
  { size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' }
];

initDom()



function initDom() {
  let css = `
  body{
				touch-action: none;
			}
			.renderer_label {
				position: absolute;
				bottom: 1em;
				width: 100%;
				color: white;
				z-index: 10;
				display: block;
				text-align: center;
			}

			#container {
				display: flex;
			}

			#container_normal {
				width: 50%;
				display: inline-block;
				position: relative;
			}

			#container_logzbuf {
				width: 50%;
				display: inline-block;
				position: relative;
			}

			#renderer_border {
				position: absolute;
				top: 0;
				left: 25%;
				bottom: 0;
				width: 2px;
				z-index: 10;
				opacity: .8;
				background: #ccc;
				border: 1px inset #ccc;
				cursor: col-resize;
			}
      .warning {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
        background: white;
      }
  `
  let cssDom = document.createElement('style')
  cssDom.innerHTML = css
  document.head.appendChild(cssDom)

  let html = ` 
			<div id="container_normal"><h2 class="renderer_label">normal z-buffer</h2></div>
			<div id="container_logzbuf"><h2 class="renderer_label">logarithmic z-buffer</h2></div>
			<div id="renderer_border"></div> 
  `
  container = document.createElement('div')
  container.innerHTML = html
  container.setAttribute('id', 'container')
  document.body.appendChild(container)

  init()

}


function init() {

  const loader = new FontLoader()
  loader.load('./fonts/helvetiker_regular.typeface.json', font => {
    console.log(113, font)

    scene = initScene(font)

    for (let key of Object.keys(objects)) {
      console.log(121, key)
      objects[key] = initView(scene, key, key === 'logzbuf')
    }

    console.log(125, objects)

    animate()
  })

  stats = new Stats()
  container.appendChild(stats.dom)

  border = document.getElementById('renderer_border')
  border.addEventListener('pointerdown', (e) => onBorderPointerDown(e))

  window.addEventListener('mousemove', (e) => onMouseMove(e))
  window.addEventListener('resize', (e) => onWindowResize(e))
  window.addEventListener('wheel', (e) => onMouseWheel(e))

}


const initScene = (font) => {
  const scene = new T.Scene()

  scene.add(new T.GridHelper(2e2, 2e2))
  scene.add(new T.AmbientLight(0x222222))

  const light = new T.DirectionalLight(0xffffff, 1)
  light.position.set(1e2, 1e2, 1e2)
  scene.add(light)

  const materialArgs = {
    color: 0xffffff,
    specular: 0x050505,
    shininess: 50,
    emissive: 0x000000
  }

  const geometry = new T.SphereGeometry(.5, 24, 12)

  for (let i = 0; i < labelData.length; i++) {
    let item = labelData[i]
    const scale = item.scale || 1

    const labelGeo = new TextGeometry(item.label, {
      font,
      size: item.size,
      height: item.size / 2
    })

    labelGeo.computeBoundingSphere()

    labelGeo.translate(- labelGeo.boundingSphere.radius, 0, 0)
    materialArgs.color = new T.Color().setHSL(Math.random(), .5, .5)

    const material = new T.MeshPhongMaterial(materialArgs)

    const group = new T.Group()
    group.position.z = - item.size * scale
    scene.add(group)

    const textMesh = new T.Mesh(labelGeo, material)
    textMesh.scale.set(scale, scale, scale)
    textMesh.position.z = -item.size * scale
    textMesh.position.y = item.size / 4 * scale
    group.add(textMesh)

    const dotMesh = new T.Mesh(geometry, material)
    dotMesh.position.y = -item.size / 4 * scale
    dotMesh.scale.multiplyScalar(item.size * scale)
    group.add(dotMesh)

  }

  return scene
},
  initView = (scene, name, flg) => {
    const container = document.getElementById('container_' + name)
    const camera = new T.PerspectiveCamera(50, screenSplit * SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR)
    scene.add(camera)

    const webgl = new T.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: flg })
    webgl.setPixelRatio(window.devicePixelRatio)
    webgl.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
    webgl.domElement.style.position = 'relative'
    webgl.domElement.id = 'webgl_' + name
    container.appendChild(webgl.domElement)

    const warning = document.createElement('div')
    warning.classList = 'warning'
    container.appendChild(warning)
    return {
      container,
      webgl,
      scene,
      camera,
      warning
    }
  }





function animate() {
  // debugger
  requestAnimationFrame(animate)
  render()
}


function render() {
  // Put some limits on zooming  对缩放设置一些限制
  const first = labelData[0], last = labelData[labelData.length - 1]
  const minZoom = first.size * first.scale * 1,
    maxZoom = last.size * last.scale * 1e2
  let damping = (Math.abs(zoomSpeed) > minZoomSpeed ? .95 : 1.0)

  // Zoom out faster the further out you go 你走得越远，缩小得越快
  const zoom = T.MathUtils.clamp(Math.pow(Math.E, zoomPos), minZoom, maxZoom)
  zoomPos = Math.log(zoom)

  // Slow down quickly at the zoom limits   在变焦极限处快速减速
  if ((zoom == minZoom && zoomSpeed < 0) || (zoom == maxZoom && zoomSpeed > 0)) {
    damping = .85
  }


  zoomPos += zoomSpeed
  zoomSpeed *= damping

  objects.normal.camera.position.x = Math.sin(.5 * Math.PI * (mouse[0] - .5)) * zoom
  objects.normal.camera.position.y = Math.sin(.25 * Math.PI * (mouse[1] - .5)) * zoom
  objects.normal.camera.position.z = Math.cos(.5 * Math.PI * (mouse[0] - .5)) * zoom
  objects.normal.camera.lookAt(objects.normal.scene.position)

  // Clone camera settings across both scenes  在两个场景中克隆相机设置
  objects.logzbuf.camera.position.copy(objects.normal.camera.position)
  objects.logzbuf.camera.quaternion.copy(objects.normal.camera.quaternion)

  // Update renderer sizes if the split has changed   如果分割改变，更新渲染器大小
  if (screenSplitRight != 1 - screenSplit) {
    updateRendererSizes()
  }

  objects.normal.webgl.render(objects.normal.scene, objects.normal.camera)
  objects.logzbuf.webgl.render(objects.logzbuf.scene, objects.logzbuf.camera)

  stats.update()

}


const updateRendererSizes = () => {

  SCREEN_WIDTH = window.innerWidth
  SCREEN_HEIGHT = window.innerHeight

  console.log(289, SCREEN_WIDTH)
  screenSplitRight = 1 - screenSplit

  objects.normal.webgl.setSize(screenSplit * SCREEN_WIDTH, SCREEN_HEIGHT)
  objects.normal.camera.aspect = screenSplit * SCREEN_WIDTH / SCREEN_HEIGHT
  objects.normal.camera.updateProjectionMatrix()
  objects.normal.camera.setViewOffset(SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, SCREEN_WIDTH * screenSplit, SCREEN_HEIGHT)
  objects.normal.container.style.width = (screenSplit * 100) + '%'
  objects.normal.warning.innerHTML = ` width : ${screenSplit * SCREEN_WIDTH} `

  objects.logzbuf.webgl.setSize(screenSplitRight * SCREEN_WIDTH, SCREEN_HEIGHT)
  objects.logzbuf.camera.aspect = screenSplitRight * SCREEN_WIDTH / SCREEN_HEIGHT
  objects.logzbuf.camera.updateProjectionMatrix()
  objects.logzbuf.camera.setViewOffset(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH * screenSplit, 0, SCREEN_WIDTH * screenSplitRight, SCREEN_HEIGHT)
  objects.logzbuf.container.style.width = (screenSplitRight * 100) + '%'
  objects.logzbuf.warning.innerHTML = ` width : ${screenSplitRight * SCREEN_WIDTH} `

  border.style.left = (screenSplit * 100) + '%'


}



const onBorderPointerMove = (event) => {
  screenSplit = Math.max(0, Math.min(1, event.clientX / window.innerWidth))
},
  onBorderPointerUp = () => {
    window.removeEventListener('pointermove', onBorderPointerMove)
    window.removeEventListener('pointerup', onBorderPointerUp)
  }

const onBorderPointerDown = () => {

  window.addEventListener('pointermove', onBorderPointerMove)
  window.addEventListener('pointerup', onBorderPointerUp)

},
  onMouseMove = (event) => {
    mouse[0] = event.clientX / window.innerWidth
    mouse[1] = event.clientY / window.innerHeight
  },
  onWindowResize = () => {

    updateRendererSizes()
  },
  onMouseWheel = (event) => {
    const amount = event.deltaY

    if (amount === 0) return

    const dir = amount / Math.abs(amount)
    zoomSpeed = dir / 10

    minZoomSpeed = .001

  }





