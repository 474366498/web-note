


import * as T from 'three'
import gsap from 'gsap'
import vertex from '@/shader/flyLineShader/vertex.glsl'
import fragment from '@/shader/flyLineShader/fragment.glsl'

export default class FlyLineShader {
  constructor(position = { x: 4, z: 4 }, color = 0xff0000) {
    // 1根据点生成曲线
    let linePoints = [
      new T.Vector3(0, 0, 0),
      new T.Vector3(position.x / 2, 3, position.z / 2),
      new T.Vector3(position.x, 0, position.z)
    ]
    // debugger
    // 创建曲线
    this.lineCurve = new T.CatmullRomCurve3(linePoints)
    const points = this.lineCurve.getPoints(2e3)

    // 创建几何顶点 
    this.geometry = new T.BufferGeometry().setFromPoints(points)

    // 给每一个顶点设置属性
    const aSizeData = new Float32Array(points.length)
    for (let i = 0; i < points.length; i++) {
      aSizeData[i] = i
    }
    // 设置几何体顶点属性 
    this.geometry.setAttribute('aSize', new T.BufferAttribute(aSizeData, 1))

    // 设置着色器材质
    this.shaderMaterial = new T.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uColor: {
          value: new T.Color(color)
        },
        uLength: {
          value: points.length
        }
      },
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      vertexShader: vertex,
      fragmentShader: fragment
    })

    this.mesh = new T.Points(this.geometry, this.shaderMaterial)

    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 2e3,
      duration: 2,
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






