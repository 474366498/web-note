import cameraModule from "./cameraModule";
import { webgl, cssWebgl } from './webgl'

window.addEventListener('resize', () => {
  cameraModule.active.aspect = window.innerWidth / window.innerHeight
  cameraModule.active.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)
  cssWebgl.setSize(window.innerWidth, window.innerHeight)
})