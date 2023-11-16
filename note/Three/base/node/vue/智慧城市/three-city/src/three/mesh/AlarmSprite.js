

import * as T from 'three'
import camera from '../camera'

export default class AlarmSprite {

  constructor(path = './textures/warning.png', position = { x: -4.2, y: 3.2, z: -1.2 }) {
    const textureLoader = new T.TextureLoader()

    this.material = new T.SpriteMaterial({ map: textureLoader.load('./textures/warning.png') })

    this.mesh = new T.Sprite(this.material)

    this.mesh.position.set(position.x, position.y, position.z)

    this.fns = []

    this.raycaster = new T.Raycaster()
    this.mouse = new T.Vector2()

    window.addEventListener('click', event => {
      console.log('window.click ')
      if (this.fns.length < 1) return
      this.mouse.x = event.clientX / window.innerWidth * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight * 2 - 1)

      this.raycaster.setFromCamera(this.mouse, camera)

      // console.log(26, this.mouse)

      const intersects = this.raycaster.intersectObject(this.mesh)

      // console.log(33, intersects)
      if (intersects.length > 0) {
        this.fns.forEach(fn => fn(event))
      }


    })

  }

  onClick(fn) {
    this.fns.push(fn)
  }

  remove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }

}







