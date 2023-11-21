
import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import eventHub from '@/utils/eventHub'
import Camera from '../camera'


const gLoader = new GLTFLoader(),
  dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')

export default class City {
  constructor(scene) {
    this.scene = scene
    this.loader = gLoader
    this.loader.setDRACOLoader(dracoLoader)

    this.loader.load('./model/city4.glb', gltf => {
      console.log(19, gltf)
      scene.add(gltf.scene)

      this.gltf = gltf

      // scene 子元素遍历
      gltf.scene.traverse(child => {

        if (child.name === '热气球') {
          this.mixer = new T.AnimationMixer(child)
          this.clip = gltf.animations[1]
          this.action = this.mixer.clipAction(this.clip)
          this.action.play()

        } else if (child.name === '汽车园区轨迹') {
          const line = child
          line.visible = false // 等可以了改成 false

          const points = []
          let position = line.geometry.attributes.position
          let { count, array } = position
          console.log(41, position, count, array)
          for (let i = count - 1; i >= 0; i--) {
            // points.push(
            //   new THREE.Vector3(
            //     position.getX(i),
            //     position.getY(i),
            //     position.getZ(i)
            //   )
            // );
            let x = array[3 * i],
              y = array[3 * i + 1],
              z = array[3 * i + 2]
            points.push(new T.Vector3(x, y, z))
          }

          this.curve = new T.CatmullRomCurve3(points)
          this.curveProgress = 0
          this.carAnimation()

        } else if (child.name === 'redcar') {
          this.redcar = child
        }

      })

      // 追加模型 相机
      gltf.cameras.forEach(camera => {
        Camera.add(camera.name, camera)
      })
      console.log(72, Camera)


    })

    eventHub.on('toggleAction', e => {
      console.log(70, e)
      this.action?.reset()
      this.clip = this.gltf.animations[e]
      this.action = this.mixer.clipAction(this.clip)
      this.action.play()
    })


  }

  update(time) {
    this.mixer && this.mixer.update(time)
  }
  carAnimation() {
    gsap.to(this, {
      curveProgress: .999,
      duration: 30,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress)
        this.redcar.position.set(point.x, point.y, point.z)
        if (this.curveProgress + .001 < 1) {
          const point = this.curve.getPoint(this.curveProgress + .001)
          this.redcar.lookAt(point)
        }
      }
    })
  }
}




