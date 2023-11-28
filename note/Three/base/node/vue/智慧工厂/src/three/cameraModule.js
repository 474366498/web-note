import * as T from 'three'

const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e5)

class CameraModule {
  constructor() {
    this.active = camera
    this.collection = {
      default: camera
    }
  }
  add(name, camera) {
    this.collection[name] = camera
  }
  set(name) {
    this.active = this.collection[name]
  }
}

export default new CameraModule()








