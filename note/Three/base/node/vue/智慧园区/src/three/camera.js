import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5e4)
camera.position.set(1e3, 2e3, 1e3)

export default camera 
