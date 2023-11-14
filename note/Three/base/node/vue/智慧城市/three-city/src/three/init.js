import webgl from "./webgl";
import camera from "./camera";

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)

})



