

import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import eventHub from '@/utils/eventHub'
import Camera from '../camera'
import C from '../controls'

console.log(11, GUI)
// const girlGui = new GUI().addFolder('girl')
const params = {
  x: -815,
  y: 143.5,
  z: 70
}

const gLoader = new GLTFLoader(),
  dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

export default class Girl {

  constructor(scene) {
    this.scene = scene
    this.loader = gLoader
    this.loader.setDRACOLoader(dracoLoader)

    this.loader.load('./model/jianshen1.glb', glb => {
      console.log(21, glb)

      glb.scene.traverse(c => {
        if (c.name == 'Body') {
          console.log(c)
        } else if (c.name == 'Floor') {
          c.material = new T.MeshStandardMaterial({
            color: 0xffffff
          })
        }
        if (c.isMesh) {
          c.material.depthWrite = true
          c.material.normalScale = new T.Vector2(1, 1)
          c.material.side = T.FrontSide
          c.material.transparent = false
          c.material.vertexColors = false
        }
      })

      this.girl = glb.scene
      this.girl.position.set(-815, 143.5, 70)
      this.girl.scale.set(10, 10, 10)
      this.girl.name = 'girl'
      scene.add(this.girl)
      console.log(25, scene.children)

      this.mixer = new T.AnimationMixer(this.girl)
      this.clip = glb.animations[0]
      this.action = this.mixer.clipAction(this.clip)
      this.action.play()
    })
    // Object.keys(params).forEach(key => {
    //   girlGui.add(params,
    //     key,
    //     key === 'x' ? -820 : key === 'y' ? 140 : 65,
    //     key === 'x' ? -800 : key === 'y' ? 150 : 75
    //   ).step(.1).onChange(v => {
    //     console.log(46, v, Camera.active, C.controls)
    //     let oldP = this.girl.position.clone()
    //     oldP[key] = v
    //     this.girl.position[key] = v
    //     C.controls.target.copy(oldP)
    //     C.controls.update()
    //   })
    // })
  }

  update(t) {
    this.mixer && this.mixer.update(t)
  }


}

