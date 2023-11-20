
import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


const gLoader = new GLTFLoader(),
  dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

export default class City {
  constructor(scene) {
    this.scene = scene
    this.loader = gLoader
    this.loader.setDRACOLoader(dracoLoader)

    this.loader.load('./model/city4.glb', gltf => {
      console.log(19, gltf)
      scene.add(gltf.scene)
    })


  }

}




