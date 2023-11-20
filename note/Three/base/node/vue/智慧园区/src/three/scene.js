import * as T from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const scene = new T.Scene()

scene.add(new T.AxesHelper(5e3))
scene.add(new T.GridHelper(3e3))

const bgLoader = new RGBELoader()
bgLoader.loadAsync('./textures/023.hdr').then(bg => {
  scene.background = bg
  scene.environment = bg
  scene.environment.mapping = T.EquirectangularReflectionMapping
})

const light = new T.DirectionalLight(0xffffff, 1)
light.position.set(10, 1e2, 10)
scene.add(light)

export default scene 