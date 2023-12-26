
// https://juejin.cn/post/7250283546368917564
import * as T from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'




var control
var { scene, camera, webgl, ray } = {
  scene: new T.Scene(),
  camera: new T.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 3e3),
  webgl: new T.WebGLRenderer({ antialias: true }),
  ray: new T.Raycaster(),
}
var textRender = new CSS3DRenderer(), text = null

var tree = null

const mouse = new T.Vector2()

var point = new T.PointLight(0xffffff, .6),
  ambient = new T.AmbientLight(0xffffff, .5)

let snows = new T.Group()
scene.add(ambient)

let that = null, lightPower = 1

console.log(30, scene, GUI)

// scene.fog = new T.Fog(0xcccccc, 10)
// const gui = new GUI()
// const fogFolder = gui.addFolder('Fog')
// fogFolder.addColor(scene.fog, 'color').onChange((val) => onChangeFog('color', val))
// fogFolder.add(scene.fog, 'near', .1, 1e2).step(.1).onChange((val) => onChangeFog('near', val))
// fogFolder.add(scene.fog, 'far', 1, 1e4).step(1).onChange((val) => onChangeFog('far', val))


scene.fog = new T.FogExp2(0xffffff, .0005)
const gui = new GUI()
const fogFolder = gui.addFolder('Fog')
fogFolder.addColor(scene.fog, 'color').onChange((val) => onChangeFog('color', val))
fogFolder.add(scene.fog, 'density', 0.0001, .01).step(0.001).onChange((val) => onChangeFog('density', val))


function onChangeFog(key, val) {
  // console.log(44, val, scene.fog[key])
  scene.fog[key] = val
  // console.log(44, scene.fog)

}

class MyScene {
  constructor() {
    this.init()
  }

  init() {
    that = this
    camera.position.set(20, 5, 80)
    camera.lookAt(scene.position)

    point.position.set(0, 30, 80)

    document.body.appendChild(webgl.domElement)

    webgl.shadowMap.enabled = true
    webgl.setSize(window.innerWidth, window.innerHeight)
    webgl.setClearColor(0xc2c2c2)

    var texture = new T.TextureLoader().load('./christmas/assets/images/snowflake7_alpha.png')

    for (let i = 0; i < 4e3; i++) {
      var spriteMaterial = new T.SpriteMaterial({
        map: texture,
        transparent: true
      })
      let sprite = new T.Sprite(spriteMaterial)
      snows.add(sprite)
      sprite.scale.set(.8, 1, 1)
      // 设置精灵模型位置，在整个空间上上随机分布
      sprite.position.set(
        8e2 * (Math.random() - .5),
        8e2 * (Math.random() - .5),
        8e2 * (Math.random() - .5)
      )
      // 控制精灵大小，比如可视化中精灵大小表征数据大小
      sprite.scale.set(4, 4, .5)
    } // for end 
    scene.add(snows)
    // scene.add(new T.AxesHelper(5e2))

    this.initSkyBox()
    this.initAudio()
    this.initTree()
    this.initMapMesh()
    this.initText()

    this.animate()
    this.handlerRender()
    this.initLights()

    control = new OrbitControls(camera, webgl.domElement)
    control.maxDistance = 4e2
    // control.maxZoom = 2e2
  }
  initSkyBox() {
    let skyBox = {
      path: './christmas/assets/sky_box/christmas/',
      imageList: ["夜景_LF.jpg", "夜景_RT.jpg", "夜景_UP.jpg", "夜景_DN.jpg", "夜景_FR.jpg", "夜景_BK.jpg"]
    }

    let cubTextureLoader = new T.CubeTextureLoader()
    cubTextureLoader.setPath(skyBox.path)
    let realTexture = cubTextureLoader.load(skyBox.imageList)
    realTexture.encoding = T.sRGBEncoding
    scene.background = realTexture
  }
  initAudio() {
    let audioElement = document.createElement('audio')
    audioElement.setAttribute('src', './christmas/music/ddd.mp3')
    audioElement.setAttribute('autoplay', true)
    audioElement.setAttribute('loop', true)
    // audioElement.style.display = 'none'
    document.body.appendChild(audioElement)

  }
  // 圣诞树
  initTree() {

    new MTLLoader().setPath('./christmas/obj/').load('christmasTree.mtl', function (materials) {
      materials.preload()

      console.log(105, materials)

      new OBJLoader().setMaterials(materials).setPath('./christmas/obj/')
        .load('christmasTree.obj', obj => {
          console.log(109, obj)
          obj.position.set(-40, -40, 0)
          obj.isChristmasTree = true
          obj.scale.set(1, 1, 1)

          tree = obj
          scene.add(obj)

          let treeLight = new T.SpotLight(0xffffff, 5)
          treeLight.castShadow = true
          treeLight.angle = .8
          treeLight.position.set(50, 80, -40)
          scene.add(treeLight)
          treeLight.target = tree
        })


    })

  }
  // 礼品盒
  initMapMesh() {

    let meshArr = new T.Group()
    meshArr.isMeshArr = true

    let geo1 = new T.BoxGeometry(18, 18, 18)
    let map1 = new T.TextureLoader().load('./christmas/assets/mapping/s1.jpg')
    let material1 = new T.MeshPhongMaterial({ map: map1 })
    let mesh1 = new T.Mesh(geo1, material1)
    mesh1.rotateY(-20)
    mesh1.position.x = -32
    mesh1.position.y = -15
    mesh1.name = 'christmas_mesh1'
    meshArr.add(mesh1)

    let geo2 = new T.BoxGeometry(55, 55, 5)
    let map2 = new T.TextureLoader().load('./christmas/assets/mapping/s2.jpg')
    let material2 = new T.MeshPhongMaterial({ map: map2 })
    let mesh2 = new T.Mesh(geo2, material2)
    mesh2.rotateY(-20)
    mesh2.position.z = -11
    meshArr.add(mesh2)

    this.testMesh = mesh2

    let geo3 = new T.BoxGeometry(10, 10, 10)
    let map3 = new T.TextureLoader().load('./christmas/assets/mapping/s3.jpg')
    let material3 = new T.MeshPhongMaterial({ map: map3 })
    let mesh3 = new T.Mesh(geo3, material3)
    mesh3.rotateY(5.9)
    mesh3.position.set(40, -12, 5)
    meshArr.add(mesh3)
    mesh3.name = 'christmas_mesh3'


    meshArr.children.forEach(item => {
      item.receiveShadow = true
      item.castShadow = true
    })
    scene.add(meshArr)
  }
  // 文字
  initText() {

    textRender.setSize(window.innerWidth, window.innerHeight)
    textRender.domElement.style.position = 'absolute'
    textRender.domElement.style.top = '0'
    textRender.domElement.style.left = '0'
    textRender.isInit = true
    textRender.domElement.style.pointerEvents = 'none';
    // textRender.domElement.innerHTML = '长津湖英雄万古长存'
    text = document.createElement('p')
    text.innerText = `长津湖英雄万古长存!`
    text.style.color = 'white'
    text.style.fontWeight = '900'
    text.style.transform = 'rotateX(170deg)'
    text.style.textShadow = `-1px 1px #ff0500 ,
                            -2px 2px #cc0200 ,
                            -3px 3px #ccc ,
                            -4px 4px #ccc ,
                            -5px 5px #ccc ,
                            -12px 12px 3px #fefcf2
                            `
    textRender.domElement.getElementsByTagName('div')[0].appendChild(text)
    document.body.appendChild(textRender.domElement)

    console.log(211, textRender)

  }


  animate() {
    requestAnimationFrame(that.animate)
    webgl.render(scene, camera)
    textRender.isInit && (textRender.render(scene, camera))
    let christmas = scene.children.find(item => item.isChristmasTree)
    let lightGroup = scene.children.find(item => item.isLightGroup)

    let meshArr = scene.children.find(item => item.isMeshArr)
    var m1, m3
    // debugger
    if (meshArr && meshArr.children && meshArr.children.length) {
      m1 = meshArr.children.find(item => item.name == 'christmas_mesh1')
      m3 = meshArr.children.find(item => item.name == 'christmas_mesh3')
    }

    // console.log(178, meshArr, m1)
    // debugger

    if (lightGroup) {
      lightGroup.children.forEach(light => {
        let time = new Date() * .0003
        light.intensity = Math.sin(time) + .8
      })
    }

    snows.children.forEach(sprite => {
      sprite.position.y -= ((Math.random() * 3 + 2) / 10)
      sprite.position.y < -200 && (sprite.position.y = 200)
    })

    christmas && christmas.rotateY(.005)
    m1 && m1.rotateY(-0.004)

  }
  handlerRender() {
    window.addEventListener('resize', this.onWindowResize)
    document.querySelectorAll('canvas')[0].addEventListener('click', this.onMouseMove)
  }
  initLights() {
    let rLight = new T.PointLight(0xff0000, 1, 70, 2),
      gLight = new T.PointLight(0x00ff00, 1, 60, 2),
      bLight = new T.PointLight(0x0000ff, 1, 60, 2),
      spot = new T.SpotLight(0xffffff)

    spot.position.set(10, 5, 35)
    spot.angle = .8
    spot.penumbra = .9
    spot.target = this.testMesh
    scene.add(spot)

    rLight.position.set(36, 6, 30)
    gLight.position.set(55, 5, 30)
    bLight.position.set(20, 5, 20)

    let lightGroup = new T.Group()

    lightGroup.add(rLight, gLight, bLight)
    lightGroup.isLightGroup = true
    scene.add(lightGroup)

  }

  onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    webgl.setSize(window.innerWidth, window.innerHeight)

  }
  onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    ray.setFromCamera(mouse, camera)

    let theInt = ray.intersectObjects(tree.children)

    if (theInt.length > 0) {
      theInt.sort()
      console.log(231, theInt)
    }


  }

}


let myScene = new MyScene()

