
import * as T from 'three'
import gsap from 'gsap'

import vertex from '@/shader/lightRadar/vertex.glsl'
import fragment from '@/shader/lightRadar/fragment.glsl'


// 光雷达
export default class LightRadar {

  constructor(size = 2, position = { x: 8, y: .5, z: 8 }, color = 0xffff00) {
    this.geo = new T.PlaneGeometry(size, size)
    this.material = new T.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new T.Color(color)
        },
        uTime: {
          value: 0
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: T.DoubleSide
    })
    this.mesh = new T.Mesh(this.geo, this.material)
    this.mesh.position.set(position.x, position.y | 1, position.z)
    this.mesh.rotation.x = -Math.PI / 2
    console.log(28, size, this.mesh)

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
      duration: 1,
      repeat: -1
    })
  }
  remove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}



