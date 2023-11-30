
import * as T from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import gsap from 'gsap'


import eventHub from '@/utils/eventHub'
import CameraModule from '../cameraModule'
import vertex from '@/shader/fighter/vertex.glsl'
import fragment from '@/shader/fighter/fragment.glsl'

export default class City {
  constructor(scene) {
    console.log(5, scene)

    this.scene = scene
    this.loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    this.loader.setDRACOLoader(dracoLoader)

    this.floor1Group
    this.floor2Group
    this.wallGroup
    this.floor2Tags = []

    this.loader.load('./model/floor2.glb', glb => {
      console.log('floor2', glb)
      this.floor2Group = glb.scene


      glb.scene.traverse(child => {
        if (child.isMesh) {   // MeshStandardMaterial  发光材质
          // console.log('city child material', child.material)
          child.material.emissiveIntensity = 15
        }
        if (child.type === 'Object3D' && child.children.length === 0) {
          // console.log('city Object3D', child)
          let tag3D = this.createTag(child)
          this.floor2Tags.push(tag3D)
          this.floor2Group.add(tag3D)
        }
      })
      scene.add(this.floor2Group)

    })

    this.loader.load('./model/floor1.glb', glb => {
      console.log('floor1', glb)
      this.floor1Group = glb.scene

      glb.scene.traverse(child => {
        if (child.isMesh) child.material.emissiveIntensity = 5
      })

      scene.add(this.floor1Group)
    })

    this.loader.load('./model/wall.glb', glb => {
      console.log('wall', glb)
      this.wallGroup = glb.scene

      scene.add(this.wallGroup)
    })

    this.loader.load('./model/Fighter.glb', glb => {
      console.log('Fighter', glb)
      this.fighterGroup = glb.scene
      scene.add(this.fighterGroup)
      this.fighterGroup.position.set(3, 42, 68)
      let n = 0
      this.fighterGroup.traverse(child => {
        if (child.isMesh) {
          child.material.emissiveIntensity = 15
          child._position = child.position.clone()
        }
        n++
      })
      console.log(74, n)
      this.fighterGroupLength = n

      this.mouse = new T.Vector2()
      this.raycaster = new T.Raycaster()
      window.addEventListener('click', event => {
        // console.log(77, event)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
        this.raycaster.setFromCamera(this.mouse, CameraModule.active)

        const intersects = this.raycaster.intersectObject(this.fighterGroup)
        if (intersects.length > 0) {
          console.log('选中小飞机')
          if (this.floor2Group.visible) {
            this.toggleFighter(false)
          } else {
            this.toggleFighter(true)
          }
        }

      })
    })


    this.initEvent()
  }

  createTag(object3D) {
    const tag = document.createElement('div')
    tag.className = 'elementTag'
    tag.innerHTML = `
      <div class="elementContent">
        <h3>${object3D.name}</h3>
        <p>${object3D.uuid.substr(0, 3)}</p>
      </div>
    `
    const tag3D = new CSS3DObject(tag)
    // console.log(48, tag, tag3D)
    tag3D.scale.set(.2, .2, .2)
    tag3D.position.copy(object3D.position)
    this.scene.add(tag3D)
    return tag3D
  }

  toggleWall(flg) {
    this.wallGroup.visible = flg
  }
  toggleFloor1(flg) {
    this.floor1Group.visible = flg
  }
  toggleFloor2(flg) {
    this.floor2Group.visible = flg
    this.floor2Tags.forEach(tag => tag.visible = flg)
  }
  toggleFighter(flg) {
    this.floor1Group && (this.floor1Group.visible = flg)
    this.floor2Group && (this.floor2Group.visible = flg)
    this.floor2Tags && this.floor2Tags.forEach(tag => tag.visible = flg)
    this.wallGroup && (this.wallGroup.visible = flg)
    this.fighterGroup.visible = true
  }

  initEvent() {
    // eventHub.on()
    eventHub.on('showWall', () => {
      this.toggleWall(true)
      this.toggleFloor1(false)
      this.toggleFloor2(false)
    })
    eventHub.on('showAll', () => {
      this.toggleWall(true)
      this.toggleFloor1(true)
      this.toggleFloor2(true)
      gsap.to(this.wallGroup.position, {
        y: 2e2,
        duration: 1
      })
      gsap.to(this.floor2Group.position, {
        y: 50,
        duration: 1
      })
    })
    eventHub.on('hideAll', () => {
      gsap.to(this.wallGroup.position, {
        y: 0,
        duration: 1
      })
      gsap.to(this.floor2Group.position, {
        y: 0,
        duration: 1
      })
    })
    eventHub.on('showFloor1', () => {
      this.toggleWall(false)
      this.toggleFloor1(true)
      this.toggleFloor2(false)

    })
    eventHub.on('showFloor2', () => {
      this.toggleWall(false)
      this.toggleFloor1(false)
      this.toggleFloor2(true)
    })
    eventHub.on('flatFighter', () => {
      let size = Math.ceil(this.fighterGroupLength ** (1 / 2)),
        s = - size / 2
      console.log('flatFighter', this.fighterGroupLength, size)
      const positions = []

      for (let i = s; i < size / 2; i++) {
        for (let k = s; k < size / 2; k++) {
          positions.push(new T.Vector3(i * 15, k * 15, 0))
        }
      }
      console.log(193, positions)
      let n = 0
      this.fighterGroup.traverse(child => {
        if (child.isMesh) {
          gsap.to(child.position, {
            x: positions[n].x,
            y: positions[n].y,
            z: positions[n].z,
            duration: 2
          })
          // child.position.set(positions[n].x, positions[n].y, positions[n].z)
        }
        n++
      })

    })
    eventHub.on('recoverFighter', () => {
      this.fighterGroup.traverse(child => {
        if (child.isMesh) {
          gsap.to(child.position, {
            x: child._position.x,
            y: child._position.y,
            z: child._position.z,
            duration: 1
          })
        }
      })
    })

    eventHub.on('pointsFighter', () => {
      console.log('pointsFighter')
      this.createPoints()
    })
    eventHub.on('pointsBlast', () => {
      console.log('pointsBlast')
      this.pointsBlast()
    })
    eventHub.on('pointsBack', () => {
      console.log('pointsBack')
      this.pointsBack()
    })

  }

  createPoints() {
    if (!this.fighterPointsGroup) {
      this.fighterPointsGroup = this.transformPoints()
      this.scene.add(this.fighterPointsGroup)
    }
  }
  transformPoints() {
    const texture = new T.TextureLoader().load('./assets/particles/1.png')
    const group = new T.Group()

    function createPoints(object3D, group) {
      if (object3D.children.length > 0) {
        object3D.children.forEach(child => {
          // console.log(249, child)
          if (child.isMesh) {
            let color = new T.Color(Math.random(), Math.random(), Math.random())
            // const geo = new T.BufferGeometry()
            // geo.setAttribute(
            //   'position',
            //   new T.Float32BufferAttribute(child.geometry.attributes.position.array, 3)
            // )
            // let material = new T.PointsMaterial({
            //   size: .2,
            //   color,
            //   map: texture,
            //   blending: T.AdditiveBlending,
            //   transparent: true,
            //   depthTest: false
            // })
            let material = new T.ShaderMaterial({
              uniforms: {
                uColor: {
                  value: color
                },
                uTexture: {
                  value: texture
                },
                uTime: {
                  value: 0
                }
              },
              vertexShader: vertex,
              fragmentShader: fragment,
              blending: T.AdditiveBlending,
              transparent: true,
              depthTest: false
            })
            const pointMesh = new T.Points(child.geometry, material)
            pointMesh.position.copy(child.position)
            group.add(pointMesh)
            createPoints(child, pointMesh)
          }
        })
      }
    }
    createPoints(this.fighterGroup, group)

    // this.fighterGroup.traverse(child => {
    //   if (child.isMesh) {
    //     let points = child.geometry.attributes.position.array
    //     const geo = new T.BufferGeometry()
    //     geo.setAttribute('position', new T.Float32BufferAttribute(points, 3))
    //     let color = new T.Color(Math.random(), Math.random(), Math.random())
    //     const material = new T.PointsMaterial({
    //       size: .1,
    //       color
    //     })
    //     const pointMesh = new T.Points(geo, material)
    //     pointMesh.position.copy(child.position)
    //     group.add(pointMesh)
    //   }
    // })

    return group
  }

  pointsBlast() {
    if (!this.fighterPointsGroup) {
      this.fighterPointsGroup = this.transformPoints()
      this.scene.add(this.fighterPointsGroup)
    }
    this.fighterPointsGroup.traverse(child => {
      if (child.isPoints) {
        let count = child.geometry.attributes.position.count,
          pointPositionArray = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
          pointPositionArray[3 * i] = (Math.random() * 4 - 2) * 1e2
          pointPositionArray[3 * i + 1] = (Math.random() * 4) * 1e2
          pointPositionArray[3 * i + 2] = -(Math.random() * 4) * 1e2
        }
        child.geometry.setAttribute('aPosition', new T.BufferAttribute(pointPositionArray, 3))

        gsap.to(child.material.uniforms.uTime, {
          value: 10,
          duration: 10
        })

      }
    })
  }

  pointsBack() {
    if (!this.fighterPointsGroup) return

    this.fighterPointsGroup.traverse(child => {
      if (child.isPoints) {
        gsap.to(child.material.uniforms.uTime, {
          value: 0,
          duration: 5
        })
      }
    })
  }
}
