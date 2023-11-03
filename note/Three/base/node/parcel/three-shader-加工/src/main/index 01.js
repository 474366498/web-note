console.log('shader 加工材质')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as D from 'dat.gui'

const scene = new T.Scene()
const camera = new T.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1e3)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(20, 50, 20)
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(50))

let basicMaterial = new T.MeshBasicMaterial({
  color: 0xff0000,
  side: T.DoubleSide
})
const basicUniform = {
  uTime: {
    value: 0
  }
}

basicMaterial.onBeforeCompile = (shader, render) => {

  console.log(23, shader)
  let { fragmentShader, vertexShader } = shader
  console.log(fragmentShader)
  console.log(vertexShader)
  shader.uniforms.uTime = basicUniform.uTime

  let newVertexShader = vertexShader
    .replace(
      '#include <common>',
      `
      #include <common> 
      uniform float uTime ;
      `
    )
    .replace(
      '#include <begin_vertex>',
      `
        #include <begin_vertex>
        transformed.x += sin(uTime) * 4.0 ;
        transformed.z += cos(uTime) * 4.0 ;
      `
    )

  console.log(52, newVertexShader)

  shader.vertexShader = newVertexShader

}

const floor = new T.Mesh(
  new T.PlaneGeometry(2, 2, 64, 64),
  basicMaterial
)
scene.add(floor)










const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

document.body.insertAdjacentElement('beforeend', webgl.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  webgl.setSize(window.innerWidth, window.innerHeight)
})

const controls = new OrbitControls(camera, webgl.domElement)


const clock = new T.Clock()
function animation() {
  let t = clock.getElapsedTime()
  basicUniform.uTime.value = t
  webgl.render(scene, camera)
  requestAnimationFrame(animation)
}

animation()





