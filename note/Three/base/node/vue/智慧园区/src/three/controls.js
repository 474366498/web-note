import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import camera from './camera'
import webgl from './webgl'


const controls = new OrbitControls(camera, webgl.domElement)

export default controls