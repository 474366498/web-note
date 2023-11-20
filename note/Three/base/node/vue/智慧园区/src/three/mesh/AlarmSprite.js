

import * as T from 'three'
import gsap from 'gsap'
import camera from '../camera'
import controls from '../controls'

export default class AlarmSprite {

  constructor(type = '火警', position = { x: -4.2, y: 3.2, z: -1.2 }) {

    const typeObj = {
      火警: "./textures/tag/fire.png",
      治安: "./textures/tag/jingcha.png",
      电力: "./textures/tag/e.png",
    }
    const textureLoader = new T.TextureLoader()

    this.material = new T.SpriteMaterial({ map: textureLoader.load(typeObj[type]) })

    this.mesh = new T.Sprite(this.material)

    this.mesh.position.set(position.x, position.y | 3.2, position.z)

    gsap.to(this.mesh.scale, {
      x: .75,
      y: .75,
      z: .75,
      duration: 1,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      onStart: () => {
        console.log('start')
      },
      onComplete: () => {
        console.log('end')
      }
    })

    this.fns = []

    this.raycaster = new T.Raycaster()
    this.mouse = new T.Vector2()

    window.addEventListener('click', event => {
      // console.log('window.click ', controls)
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







