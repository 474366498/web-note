
import * as T from 'three'
import gsap from 'gsap'

import vertex from '@/shader/lightWall/vertex.glsl'
import fragment from '@/shader/lightWall/fragment.glsl'

// console.log(8, vertex, fragment)

// 光墙
export default class LightWall {

  constructor(radius = 1, height = 2, position = { x: 0, y: 1, z: 0 }, scale = 8, color = 0xff0000, duration = 3) {
    let { x, y, z } = position
    this.geo = new T.CylinderGeometry(radius, radius, height, 64, 1, true)
    this.material = new T.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: T.DoubleSide
    })
    this.mesh = new T.Mesh(this.geo, this.material)

    this.mesh.position.set(x, y, z)

    this.mesh.geometry.computeBoundingBox()

    let { min, max } = this.mesh.geometry.boundingBox

    let uHeight = max.y - min.y
    // console.log(27, min, max, uHeight)

    this.material.uniforms.uHeight = {
      value: uHeight
    }
    this.material.uniforms.uColor = {
      value: new T.Color(color)
    }

    gsap.to(this.mesh.scale, {
      x: scale,
      z: scale,
      duration,
      repeat: -1,
      yoyo: true
    })

  }
  remove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}



