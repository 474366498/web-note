
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'


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
}
