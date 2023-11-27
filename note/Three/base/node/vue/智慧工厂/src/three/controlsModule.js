
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import cameraModule from './cameraModule'
import { webgl } from './webgl'

class ControlsModule {

  constructor() {
    this.setOrbitControls()

  }
  setOrbitControls() {
    this.control = new OrbitControls(cameraModule.active, webgl.domElement)
    this.control.enableDamping = true
    this.control.maxPolarAngle = Math.PI / 2
    this.control.minPolarAngle = 0
  }
}



export default new ControlsModule()