console.log('shader 加工材质')

import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import * as D from 'dat.gui'

const scene = new T.Scene()
const camera = new T.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1e3)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.set(0, 0, 20)
camera.updateProjectionMatrix()
scene.add(camera)

scene.add(new T.AxesHelper(50))


// 加载纹理
// 创建纹理加载器
const textureLoader = new T.TextureLoader()

// 添加环境纹理
const cubeTextureLoader = new T.CubeTextureLoader()
console.log(24, cubeTextureLoader)
const envMapTexture = cubeTextureLoader.load([
  'textures/environmentMaps/0/px.jpg',
  'textures/environmentMaps/0/nx.jpg',
  'textures/environmentMaps/0/py.jpg',
  'textures/environmentMaps/0/ny.jpg',
  'textures/environmentMaps/0/pz.jpg',
  'textures/environmentMaps/0/nz.jpg',
])
console.log(33, envMapTexture)
scene.environment = envMapTexture
scene.background = envMapTexture

const directionLight = new T.DirectionalLight(0xffffff, 1)
directionLight.castShadow = true
directionLight.position.set(0, 0, 2e2)
scene.add(directionLight)
scene.add(new T.DirectionalLightHelper(directionLight))

const plane = new T.Mesh(
  new T.PlaneGeometry(20, 20, 64, 64),
  new T.MeshStandardMaterial({
    color: 0xeeeeee,
    side: T.DoubleSide
  })
)
plane.position.set(0, 0, -8)
plane.receiveShadow = true
scene.add(plane)

// 加载模型纹理
const modelTexture = textureLoader.load('./models/LeePerrySmith/color.jpg')
// 加载模型的法向纹理
const normalTexture = textureLoader.load('./models/LeePerrySmith/normal.jpg')

const material = new T.MeshStandardMaterial({
  map: modelTexture,
  normalMap: normalTexture
})

const materialUniforms = {
  uTime: {
    value: 0
  }
}

material.onBeforeCompile = function (shader) {

  let { fragmentShader, vertexShader } = shader
  // console.log(73, vertexShader)
  shader.uniforms.uTime = materialUniforms.uTime
  let newVertexShader = vertexShader
    .replace(
      '#include <common>',
      `
      #include <common>
      mat2 rotate2d(float _angle) {
        return mat2( cos(_angle) ,-sin(_angle) , sin(_angle) , cos(_angle) ) ;
      }
      uniform float uTime ;

      `
    )
    .replace(
      '#include <beginnormal_vertex>',
      `
      #include <beginnormal_vertex>
      float angle = sin(position.y + uTime) * .15 ; 
      mat2 rotateMatrix = rotate2d(angle) ; 
      objectNormal.xz = rotateMatrix * objectNormal.xz ;

      `
    )
    .replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>

      transformed.xz = rotateMatrix * transformed.xz ;
      
      `
    )
  shader.vertexShader = newVertexShader

}



const depthMaterial = new T.MeshDepthMaterial({
  depthPacking: T.RGBADepthPacking
})

depthMaterial.onBeforeCompile = function (shader) {
  let { vertexShader } = shader
  console.log(120, vertexShader)
  shader.uniforms.uTime = materialUniforms.uTime
  let newVertexShader = vertexShader
    .replace(
      '#include <common>',
      `
      #include <common> 
       mat2 rotate2d(float _angle) {
        return mat2( cos(_angle) ,-sin(_angle) , sin(_angle) , cos(_angle) ) ;
      }
      uniform float uTime ;

      `
    )
    .replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex> 
      float angle = sin(position.y + uTime) * .15 ;
      mat2 rotateMatrix = rotate2d(angle) ;

      transformed.xz = rotateMatrix * transformed.xz ;
      `
    )
  console.log(142, newVertexShader)
  shader.vertexShader = newVertexShader


}

// 加载模型
const gltfLoader = new GLTFLoader()
gltfLoader.load('./models/LeePerrySmith/LeePerrySmith.glb', glb => {
  console.log(57, glb)

  const mesh = glb.scene.children[0]
  console.log(60, mesh)
  mesh.castShadow = true  // 灯光阴影显示 
  mesh.material = material
  mesh.customDepthMaterial = depthMaterial

  scene.add(mesh)

})




const webgl = new T.WebGLRenderer({ antialias: true, alpha: true })
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)
webgl.shadowMap.enabled = true

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
  // console.log(186, t)
  materialUniforms.uTime.value = t
  webgl.render(scene, camera)
  requestAnimationFrame(animation)
}

animation()





