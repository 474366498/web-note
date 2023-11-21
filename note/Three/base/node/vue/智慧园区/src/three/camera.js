import { PerspectiveCamera } from 'three'
import eventHub from '@/utils/eventHub'

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5e4)
camera.position.set(1e3, 2e3, 1e3)

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
