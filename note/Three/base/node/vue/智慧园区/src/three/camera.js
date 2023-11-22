import { PerspectiveCamera } from 'three'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import eventHub from '@/utils/eventHub'

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5e4)
camera.position.set(1e3, 2e3, 1e3)
camera.lookAt(-800, 152, 80)
// const cameraGui = new GUI().addFolder('camera'),
//   cameraGuiPos = cameraGui.addFolder('position')
// // cameraGuiLook = cameraGui.addFolder('look') 

// let params = {
//   x: 0,
//   y: 0,
//   z: 0
// }

// Object.keys(params).forEach(key => {
//   cameraGuiPos.add(params, key, -1e3, 1e3).step(1).onChange(v => {
//     console.log(20, v, camera.position, camera.lookAt)
//     let oldP = camera.position.clone()
//     oldP[key] = v
//     console.log(oldP)
//     // camera.position[key].set(v)
//   })
// })



class CameraModules {
  constructor() {
    this.active = camera
    this.collection = {
      default: camera
    }
    eventHub.on('toggleCamera', name => {
      console.log(27, name)
      this.active = this.collection[name]
    })
  }

  add(name, camera) {
    this.collection[name] = camera
  }

  setActive(name) {
    this.active = this.collection[name]
  }

}
const Camera = new CameraModules()


export default Camera 
