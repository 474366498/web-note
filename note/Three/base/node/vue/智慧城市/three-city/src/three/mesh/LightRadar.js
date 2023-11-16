
import * as T from 'three'
import gsap from 'gsap'

import vertex from '@/shader/lightRadar/vertex.glsl'
import fragment from '@/shader/lightRadar/fragment.glsl'


// 光雷达
export default class LightRadar {

  constructor() {
    this.geo = new T.PlaneGeometry(4, 4)
    this.material = new T.ShaderMaterial({
      uniforms: {
        uColor: {
          value: new T.Color(0xffff00)
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
    this.mesh.position.set(-8, .5, 8)
    this.mesh.rotation.x = -Math.PI / 2

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



