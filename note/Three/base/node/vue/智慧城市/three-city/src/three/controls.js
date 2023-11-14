import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// camera webgl.domElement 
export default function controls(camera, dom) {
  return new OrbitControls(camera, dom)
}