import * as T from 'three'

const scene = new T.Scene()

scene.add(new T.AxesHelper(5e1))
scene.add(new T.GridHelper(3e1))

const textureCubeLoader = new T.CubeTextureLoader().setPath('./textures/')
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
])
scene.background = textureCube
scene.environment = textureCube


export default scene 