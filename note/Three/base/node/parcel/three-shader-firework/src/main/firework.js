import * as T from 'three'
import startVertex from '../shader/startpoint/vertex'
import startFragment from '../shader/startpoint/fragment'

import fireworksVertex from '../shader/fireworks/vertex'
import fireworksFragment from '../shader/fireworks/fragment'

export default class Fireworks {
  constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
    // console.log(4, color, to)
    this.color = new T.Color(color)

    this.startGeo = new T.BufferGeometry()
    let startPositionArray = new Float32Array([from.x, from.y, from.z])
    this.startGeo.setAttribute('position', new T.BufferAttribute(startPositionArray, 3))
    let aStepArray = new Float32Array([to.x - from.x, to.y - from.y, to.z - from.z])
    this.startGeo.setAttribute('aStep', new T.BufferAttribute(aStepArray, 3))

    // console.log(16, this.startGeo.attributes)

    this.startMaterial = new T.ShaderMaterial({
      vertexShader: startVertex,
      fragmentShader: startFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 20
        },
        uColor: {
          value: this.color
        }
      }
    })

    // 创建烟花点球
    this.startPoint = new T.Points(this.startGeo, this.startMaterial)
    this.clock = new T.Clock()

    // 创建爆炸的烟花

    this.fireworkGeo = new T.BufferGeometry()
    this.FireworksCount = Math.floor((1 + Math.random()) * 180)
    const positionFireworksArray = new Float32Array(this.FireworksCount * 3)
    const scaleFireArray = new Float32Array(this.FireworksCount)
    const directionArray = new Float32Array(this.FireworksCount * 3)

    for (let i = 0; i < this.FireworksCount; i++) {
      // 一开始烟花位置
      positionFireworksArray[i * 3] = to.x
      positionFireworksArray[i * 3 + 1] = to.y
      positionFireworksArray[i * 3 + 2] = to.z

      // 设置烟花所有粒子初始化大小
      scaleFireArray[i] = Math.random()

      // 设置四周发射的角度
      let theta = Math.random() * 2 * Math.PI
      let beta = Math.random() * 2 * Math.PI
      let r = Math.random()

      directionArray[i * 3] = r * Math.sin(theta) + r * Math.sin(beta)
      directionArray[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta)
      directionArray[i * 3 + 2] = r * Math.sin(theta) + r * Math.cos(beta)

    }
    // console.log(70, directionArray)

    this.fireworkGeo.setAttribute('position', new T.BufferAttribute(positionFireworksArray, 3))
    this.fireworkGeo.setAttribute('aScale', new T.BufferAttribute(scaleFireArray, 1))
    this.fireworkGeo.setAttribute('aRandom', new T.BufferAttribute(directionArray, 3))

    this.fireworkMaterial = new T.ShaderMaterial({
      vertexShader: fireworksVertex,
      fragmentShader: fireworksFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 0
        },
        uColor: {
          value: this.color
        }
      }
    })
    this.fireworks = new T.Points(this.fireworkGeo, this.fireworkMaterial)

    // 创建音频
    this.startListener = new T.AudioListener()
    this.fireListener = new T.AudioListener()

    this.startAudio = new T.Audio(this.startListener)
    this.fireAudio = new T.Audio(this.fireListener)

    // 创建音频加载器
    const audioLoader = new T.AudioLoader()
    audioLoader.load('./assets/audio/send.mp3', bf => {
      // console.log(105, bf)
      this.startAudio.setBuffer(bf)
      this.startAudio.setLoop(false)
      this.startAudio.setVolume(.21)
      // this.startAudio.play()
    })
    let r = Math.floor(Math.random() * 4) + 1
    audioLoader.load(`./assets/audio/pow${r}.ogg`, bf => {
      // console.log(109, bf)
      this.fireAudio.setBuffer(bf)
      this.fireAudio.setLoop(false)
      this.fireAudio.setVolume(.21)
    })


  }
  addScene(scene, camera) {
    scene.add(this.startPoint)
    scene.add(this.fireworks)
    // console.log(99, scene, this.fireworks)
    this.scene = scene
  }

  update() {
    const time = this.clock.getElapsedTime()
    if (time > .1 && time < 1) {
      // console.log(130, this.startAudio, this.startAudioPlay)
      if (!this.startAudio.isPlaying && !this.startAudioPlay) {
        this.startAudio.play()
        this.startAudioPlay = true
      }
      this.startMaterial.uniforms.uTime.value = time
      this.startMaterial.uniforms.uSize.value = 20

    } else if (time > .1) {

      this.startMaterial.uniforms.uSize.value = 0
      this.startPoint.clear()
      this.startGeo.dispose()
      this.startMaterial.dispose()

      this.fireworkMaterial.uniforms.uSize.value = 20
      this.fireworkMaterial.uniforms.uTime.value = time

      if (!this.fireAudio.isPlaying && !this.fireAudioPlay) {
        this.fireAudio.play()
        this.fireAudioPlay = true
      }

      if (time > 5) {
        this.fireworkMaterial.uniforms.uSize.value = 0
        this.fireworks.clear()
        this.fireworkGeo.dispose()
        this.fireworkMaterial.dispose()
        this.scene.remove(this.startPoint)
        this.scene.remove(this.fireworks)
        return 'remove'
      }
    }

  }
}



