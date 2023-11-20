
import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'
import MeshLine from './MeshLine'

import FlyLine from './FlyLine'
import FlyLineShader from './FlyLineShader'
import LightWall from './LightWall'
import LightRadar from './LightRadar'
import AlarmSprite from './AlarmSprite'

const gLoader = new GLTFLoader()

export default function createCity() {
  gLoader.load('./model/city.glb', gltf => {

    // console.log(10, gltf)

    gltf.scene.traverse(item => {
      if (item.type === 'Mesh') {
        const cityMaterial = new T.MeshBasicMaterial({ color: 0x0c0e33 })
        item.material = cityMaterial
        modifyCityMaterial(item) // ???? 
        if (item.name == 'Layerbuildings') {
          const meshLine = new MeshLine(item.geometry)
          const size = item.scale.x * 1.001
          meshLine.mesh.scale.set(size, size, size)
          scene.add(meshLine.mesh)
        }
      }
    })

    scene.add(gltf.scene)

    /*
    // 添加飞线
    const flyLine = new FlyLine()
    // console.log(34, flyLine)
    scene.add(flyLine.mesh)

    // 添加shader飞线
    const flyLineShader = new FlyLineShader()
    // console.log(41, flyLineShader)
    scene.add(flyLineShader.mesh)

    // 添加光墙
    // radius = 1, height = 2, position = { x: 0, y: 1, z: 0 }, scale = 8, color = 0xff0000, duration = 3
    const lightWall = new LightWall()
    scene.add(lightWall.mesh)

    // 添加雷达 mesh   radar
    const lightRadar = new LightRadar()
    console.log(52, lightRadar)
    scene.add(lightRadar.mesh)

    // 警告提示
    const alarm = new AlarmSprite()
    scene.add(alarm.mesh)
    alarm.onClick(function (e) {
      console.log(61, e)
    })
    */
  })

}




