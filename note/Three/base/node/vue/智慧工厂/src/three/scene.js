
import * as T from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const scene = new T.Scene()
scene.add(new T.AxesHelper(1e2))
scene.add(new T.GridHelper(5e2))

const loader = new RGBELoader()
loader.loadAsync('./textures/2k.hdr').then(bg => {
  scene.background = bg
  scene.environment = bg
  // scene.environment.mapping = T.EquirectangularRefractionMapping
  scene.environment.mapping = T.EquirectangularReflectionMapping

})

const light = new T.DirectionalLight(0xffffff, 1)
light.position.set(10, 1e2, 10)
scene.add(light)

scene.add(new T.DirectionalLightHelper(light))



export default scene