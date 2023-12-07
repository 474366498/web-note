



import * as T from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { BokehShader, BokehDepthShader } from "three/examples/jsm/shaders/BokehShader2";


var stats, camera, scene, webgl, control, materialDepth
let halfX = window.innerWidth / 2, halfY = window.innerHeight / 2

let distance = 1e2, effectController, postprocessing = { enabled: true }, shaderSettings = { rings: 3, samples: 4 }

const mouse = new T.Vector2(), raycaster = new T.Raycaster(), target = new T.Vector3(0, 2e1, 5e1), planes = [], leaves = 1e2

init()

animate()

function init() {

  camera = new T.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3e3)
  camera.position.y = 2e2
  camera.position.z = 4e2

  scene = new T.Scene()
  scene.add(camera)
  scene.add(new T.AxesHelper(5e2))

  webgl = new T.WebGLRenderer({ antialias: true })
  webgl.setPixelRatio(window.devicePixelRatio)
  webgl.setSize(window.innerWidth, window.innerHeight)
  webgl.autoClear = false
  document.body.insertAdjacentElement('afterbegin', webgl.domElement)

  const depthShader = BokehDepthShader
  let { uniforms, vertexShader, fragmentShader } = depthShader
  materialDepth = new T.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })

  materialDepth.uniforms['mNear'].value = camera.near
  materialDepth.uniforms['mFar'].value = camera.far

  const path = './textures/Bridge2/'
  const urls = [
    path + 'posx.jpg', path + 'negx.jpg',
    path + 'posy.jpg', path + 'negy.jpg',
    path + 'posz.jpg', path + 'negz.jpg',
  ]
  // let texture = new T.CubeTextureLoader().load(urls)
  // console.log(58, texture)
  scene.background = new T.CubeTextureLoader().load(urls)

  addPlane()

  addMonkeys()

  addBalls()

  addLights()

  initPostprocessing()

  initGui()

  stats = new Stats()
  document.body.appendChild(stats.dom)

  document.body.style.touchAction = 'none'
  document.body.addEventListener('pointermove', onPointerMove)
  window.addEventListener('resize', event => onWindowResize(event))

  control = new OrbitControls(camera, webgl.domElement)
  control.enabled = true


}

function onPointerMove(event) {

  if (event.isPrimary === false) return

  mouse.x = (event.clientX - halfX) / halfX
  mouse.y = -(event.clientY - halfY) / halfY
  postprocessing.bokeh_uniforms['focusCoords'].value.set(event.clientX / window.innerWidth, 1 - (event.clientY / window.innerHeight))
}

function onWindowResize(e) {
  let w = window.innerWidth, h = window.innerHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()

  halfX = w / 2
  halfY = h / 2

  postprocessing.rtTextureDepth.setSize(w, h)
  postprocessing.rtTextureColor.setSize(w, h)

  postprocessing.bokeh_uniforms['textureWidth'].value = w
  postprocessing.bokeh_uniforms['textureHeight'].value = h

  webgl.setSize(w, h)

}

function addPlane() {
  let geo = new T.PlaneGeometry(10, 10, 1, 1),
    mat = new T.MeshPhongMaterial({
      color: 0xffffff * .4,
      shininess: .5,
      specular: 0xffffff,
      envMap: scene.background,
      side: T.DoubleSide,
      forceSinglePass: true
    }),
    r = Math.random

  for (let i = 0; i < leaves; i++) {
    const plane = new T.Mesh(geo, mat)
    plane.rotation.set(r(), r(), r())
    plane.rotation.dx = r() * .1
    plane.rotation.dy = r() * .1
    plane.rotation.dz = r() * .1

    plane.position.set(r() * 2e2, r() * 3e2, r() * 2e2)
    plane.position.dx = r() - .5
    plane.position.dz = r() - .5
    scene.add(plane)
    planes.push(plane)
  }


}

function addMonkeys() {
  new T.BufferGeometryLoader().load('./json/suzanne_buffergeometry.json', geo => {
    console.log(102, geo, scene.background)
    geo.computeVertexNormals()

    const material = new T.MeshPhongMaterial({
      specular: 0xffffff,
      envMap: scene.background,
      shininess: 5e1,
      reflectivity: 1,
      flatShading: true
    }),
      monkeys = 2e1

    for (let i = 0; i < monkeys; i++) {
      const mesh = new T.Mesh(geo, material)
      mesh.position.x = Math.sin(i / monkeys * Math.PI * 2) * 2e2
      mesh.position.y = Math.sin(i / monkeys * Math.PI * 3) * 2e1
      mesh.position.z = Math.cos(i / monkeys * Math.PI * 2) * 2e2

      mesh.rotation.y = i / monkeys * Math.PI * 2
      mesh.scale.setScalar(3e1)
      scene.add(mesh)

    }

  })



}

function addBalls() {
  const geo = new T.SphereGeometry(1, 20, 20)
  for (let i = 0; i < 20; i++) {
    const mat = new T.MeshPhongMaterial({
      color: 0xffffff * Math.random(),
      shininess: .5,
      specular: 0xffffff,
      envMap: scene.background
    }),
      mesh = new T.Mesh(geo, mat)

    mesh.position.x = (Math.random() - .5) * 2e2
    mesh.position.y = (Math.random()) * 5e1
    mesh.position.z = (Math.random() - .5) * 2e2

    mesh.scale.multiplyScalar(1e1)
    scene.add(mesh)
  }

}

function addLights() {
  scene.add(new T.AmbientLight(0x222222))

  let light1 = new T.DirectionalLight(0xffffff, 2)
  light1.position.set(2, 1.2, 10).normalize()
  scene.add(light1)
  scene.add(new T.DirectionalLightHelper(light1))

  let light2 = new T.DirectionalLight(0xffffff, 1)
  light2.position.set(-2, 1.2, -10).normalize()
  scene.add(light2)
  scene.add(new T.DirectionalLightHelper(light2))

}

function initPostprocessing() {
  let w = window.innerWidth, h = window.innerHeight
  postprocessing.scene = new T.Scene()
  postprocessing.camera = new T.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1e4, 1e4)
  postprocessing.camera.position.z = 1e2
  postprocessing.scene.add(postprocessing.camera)

  postprocessing.rtTextureDepth = new T.WebGLRenderTarget(w, h)
  postprocessing.rtTextureColor = new T.WebGLRenderTarget(w, h)

  const bokeh_shader = BokehShader
  postprocessing.bokeh_uniforms = T.UniformsUtils.clone(bokeh_shader.uniforms)

  postprocessing.bokeh_uniforms['tColor'].value = postprocessing.rtTextureColor.texture
  postprocessing.bokeh_uniforms['tDepth'].value = postprocessing.rtTextureDepth.texture
  postprocessing.bokeh_uniforms['textureWidth'].value = w
  postprocessing.bokeh_uniforms['textureHeight'].value = h

  postprocessing.materialBokeh = new T.ShaderMaterial({
    uniforms: postprocessing.bokeh_uniforms,
    vertexShader: bokeh_shader.vertexShader,
    fragmentShader: bokeh_shader.fragmentShader,
    defines: {
      RINGS: shaderSettings.rings,
      SAMPLES: shaderSettings.samples
    }
  })

  postprocessing.quad = new T.Mesh(new T.PlaneGeometry(w, h), postprocessing.materialBokeh)
  postprocessing.quad.position.z = -5e2
  postprocessing.scene.add(postprocessing.quad)

  console.log(214, postprocessing)

}

function initGui() {

  effectController = {
    enabled: true,
    jsDepthCalculation: true,
    shaderFocus: false,

    fstop: 2.2,
    maxblur: 1,

    showFocus: false,
    focalDepth: 2.8,
    manualdof: false,
    vignetting: false,
    depthblur: false,

    threshold: .5,
    gain: 2,
    bias: .5,
    fringe: .6,

    focalLength: 35,
    noise: true,
    pentagon: false,

    dithering: .0001,

  }

  const matChanger = function () {
    // console.log(276, effectController)
    for (let e in effectController) {
      if (e in postprocessing.bokeh_uniforms) {
        postprocessing.bokeh_uniforms[e].value = effectController[e]
      }
    }
    postprocessing.enabled = effectController.enabled
    postprocessing.bokeh_uniforms['znear'].value = camera.near
    postprocessing.bokeh_uniforms['zfar'].value = camera.far
    camera.setFocalLength(effectController.focalLength)
  }

  const gui = new GUI()

  gui.add(effectController, 'enabled').onChange(matChanger);
  gui.add(effectController, 'jsDepthCalculation').onChange(matChanger);
  gui.add(effectController, 'shaderFocus').onChange(matChanger);
  gui.add(effectController, 'focalDepth', 0.0, 200.0).listen().onChange(matChanger);


  gui.add(effectController, 'fstop', 0.1, 22, 0.001).onChange(matChanger);
  gui.add(effectController, 'maxblur', 0.0, 5.0, 0.025).onChange(matChanger);

  gui.add(effectController, 'showFocus').onChange(matChanger);
  gui.add(effectController, 'manualdof').onChange(matChanger);
  gui.add(effectController, 'vignetting').onChange(matChanger);

  gui.add(effectController, 'depthblur').onChange(matChanger);

  gui.add(effectController, 'threshold', 0, 1, 0.001).onChange(matChanger);
  gui.add(effectController, 'gain', 0, 100, 0.001).onChange(matChanger);
  gui.add(effectController, 'bias', 0, 3, 0.001).onChange(matChanger);
  gui.add(effectController, 'fringe', 0, 5, 0.001).onChange(matChanger);

  gui.add(effectController, 'focalLength', 1, 80, 0.001).onChange(matChanger);

  gui.add(effectController, 'noise').onChange(matChanger);

  gui.add(effectController, 'dithering', 0, 0.001, 0.0001).onChange(matChanger);

  gui.add(effectController, 'pentagon').onChange(matChanger);

  gui.add(shaderSettings, 'rings', 1, 8).step(1).onChange(shaderUpdate);
  gui.add(shaderSettings, 'samples', 1, 13).step(1).onChange(shaderUpdate);

  matChanger()

}

function shaderUpdate() {
  postprocessing.materialBokeh.defines.RINGS = shaderSettings.rings
  postprocessing.materialBokeh.defines.SAMPLES = shaderSettings.samples
  postprocessing.materialBokeh.needsUpdate = true
}


function animate() {
  requestAnimationFrame(animate)
  stats.update()
  // webgl.render(scene, camera)
  render()
}
//  smooth step 设置步长
function smoothstep(near, far, depth) {
  const x = saturate((depth - near) / (far - near))
  return x ** 2 * (3 - 2 * x)
}

function saturate(x) {
  return Math.max(0, Math.min(1, x))
}

function linearize(depth) {
  const far = camera.far,
    near = camera.near
  return -far * near / (depth * (far - near) - far)
}

function render() {
  // debugger
  const time = Date.now() * 0.00015

  camera.position.x = Math.cos(time) * 4e2
  camera.position.y = Math.sin(time / 1.4) * 1e2
  camera.position.z = Math.sin(time) * 5e2

  camera.lookAt(target)
  camera.updateMatrixWorld()

  if (effectController.jsDepthCalculation) {
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children, true)
    const targetDistance = intersects.length > 0 ? intersects[0].distance : 1e3
    distance += (targetDistance - distance) * .03
    const sdistance = smoothstep(camera.near, camera.far, distance)
    const ldistance = linearize(1 - sdistance)
    // console.log(373, sdistance, ldistance)
    postprocessing.bokeh_uniforms['focalDepth'].value = ldistance
    effectController['focalDepth'] = ldistance
  }

  for (let i = 0; i < leaves; i++) {
    const plane = planes[i]
    plane.rotation.x += plane.rotation.dx
    plane.rotation.y += plane.rotation.dy
    plane.rotation.z += plane.rotation.dz

    plane.position.x += plane.position.dx
    plane.position.y -= .2
    plane.position.z += plane.position.dz
    if (plane.position.y < -300) plane.position.y += 600
  }

  if (postprocessing.enabled) {
    webgl.clear()

    webgl.setRenderTarget(postprocessing.rtTextureColor)
    webgl.clear()
    webgl.render(scene, camera)

    scene.overrideMaterial = materialDepth
    webgl.setRenderTarget(postprocessing.rtTextureDepth)
    webgl.clear()
    webgl.render(scene, camera)
    scene.overrideMaterial = null

    webgl.setRenderTarget(null)
    webgl.render(postprocessing.scene, postprocessing.camera)

  } else {
    scene.overrideMaterial = null
    webgl.setRenderTarget(null)
    webgl.clear()
    webgl.render(scene, camera)

  }


}














