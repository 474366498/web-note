import { WebGLRenderer } from "three";

const webgl = new WebGLRenderer({
  antialias: true,
  alpha: true
})
webgl.setSize(window.innerWidth, window.innerHeight)
webgl.setPixelRatio(window.devicePixelRatio)

export default webgl 
