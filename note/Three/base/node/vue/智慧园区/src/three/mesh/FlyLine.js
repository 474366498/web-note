

import * as T from 'three'
import gsap from 'gsap'

export default class FlyLine {
  constructor() {
    let linePints = [
      new T.Vector3(0, 0, 0),
      new T.Vector3(5, 5, 0),
      new T.Vector3(10, 0, 0)
    ]

    // 1 创建曲线
    this.lineCurve = new T.CatmullRomCurve3(linePints)

    // 2 生成管道
    this.geo = new T.TubeGeometry(
      this.lineCurve,
      1e2,
      .3,
      2,
      false
    )

    // 3 材质
    const textureLoader = new T.TextureLoader()
    let texture = textureLoader.load('./textures/z_11.png')
    texture.repeat.set(1, 2)
    texture.wrapS = T.RepeatWrapping
    texture.wrapT = T.MirroredRepeatWrapping

    this.material = new T.MeshBasicMaterial({
      color: 0xff0000,
      map: texture,
      transparent: true
    })
    // 4 mesh 物体
    this.mesh = new T.Mesh(this.geo, this.material)

    gsap.to(texture.offset, {
      x: -1,
      duration: 2,
      repeat: -1,
      ease: 'none'
    })

  }
  remove() {
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}