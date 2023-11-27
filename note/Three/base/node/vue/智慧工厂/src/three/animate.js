
import * as T from 'three'
import { webgl, cssWebgl } from './webgl'
import cameraModule from './cameraModule'
import scene from './scene'
import controlsModule from './controlsModule'

cameraModule.active.position.set(3e2, 1e2, 3e2)
scene.add(cameraModule.active)

export default function animate() {
  requestAnimationFrame(animate)
  webgl.render(scene, cameraModule.active)
  cssWebgl.render(scene, cameraModule.active)
  controlsModule.control.update()
}
