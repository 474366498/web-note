import { PerspectiveCamera } from 'three'

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5e4)
camera.position.set(5, 10, 15)

export default camera 
