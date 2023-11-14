
import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'
import MeshLine from './MeshLine'
import FlyLine from './FlyLine'

const gLoader = new GLTFLoader()

export default function createCity() {
  gLoader.load('./model/city.glb', gltf => {

    console.log(10, gltf)

    gltf.scene.traverse(item => {
      if (item.type === 'Mesh') {
        const cityMaterial = new T.MeshBasicMaterial({ color: 0x0c0e33 })
        item.material = cityMaterial
        modifyCityMaterial(item) // ???? 
        if (item.name == 'Layerbuildings') {
          const meshLine = new MeshLine(item.geometry)
          const size = item.scale.x
          meshLine.mesh.scale.set(size, size, size)
          scene.add(meshLine.mesh)
        }
      }
    })

    scene.add(gltf.scene)

    // 添加飞线
    const flyLine = new FlyLine()
    console.log(34, flyLine)
    scene.add(flyLine.mesh)

  })

}




