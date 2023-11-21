import webgl from "./webgl";
import Camera from "./camera";

window.addEventListener('resize', () => {
  Camera.active.aspect = window.innerWidth / window.innerHeight
  Camera.active.updateProjectionMatrix()

  webgl.setSize(window.innerWidth, window.innerHeight)

})



