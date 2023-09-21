<template>
  <div id="canvas" ref="canvasDom">

  </div>
</template>

<script>
import { onMounted ,reactive ,ref } from 'vue' 
import * as T from 'three' 
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' 
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader' 
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
console.log(14,GUI)
var orbit , scene , webgl , camera , gui  

var wheels = [] , frontCar  ,carBody , hoodCar , glassCar 

export default {
  name: 'App', 
  setup () {
    let canvasDom = ref(null)

    const bodyMaterial = new T.MeshPhysicalMaterial({
      color : 0xff0000 ,
      metalness : 1 ,  // 金属感 metalness
      roughness : .5 , // 粗糙度
      clearcoat : 1 ,   // 表示clear coat层的强度，范围从0.0到1.0m，当需要在表面加一层薄薄的半透明材质的时候，可以使用与clear coat相关的属性，默认为0.0; 
      clearcoatRoughness : 0 // clear coat层的粗糙度
    }) ,
    frontMaterial = new T.MeshPhysicalMaterial({
      color : 0xff0000 ,
      metalness : 1 ,
      roughness : .5 ,
      clearcoat : 1 ,
      clearcoatRoughness:0 
    }) ,
    hoodMaterial = new T.MeshPhysicalMaterial({
      color: 0xff0000 ,
      metalness:1,
      roughness : .5 ,
      clearcoat : 1 ,
      clearcoatRoughness:0
    }),
    wheelsMaterial = new T.MeshPhysicalMaterial({
      color : 0xff0000 ,
      metalness : 1 ,
      roughness : .1 
    }),
    glassMaterial = new T.MeshPhysicalMaterial({
      color : 0xffffff ,
      metalness : 0 ,
      roughness : 0 ,
      transmission: 1 ,
      transparent : true
    })

    onMounted(()=>{
      init()
      console.log(22,canvasDom)
      canvasDom && canvasDom.value.appendChild(webgl.domElement)
      render()
    })  
    const init = () => {
      webgl = new T.WebGLRenderer({ antialias: true }) 
      webgl.setPixelRatio(window.devicePixelRatio)
      webgl.setSize(window.innerWidth , window.innerHeight)
      webgl.setClearColor(0x999999)
      scene = new T.Scene()

      const gridHelper = new T.GridHelper(10,10)
      gridHelper.material.opacity = .2 
      gridHelper.material.transparent = true 
      scene.add(gridHelper)

      camera = new T.PerspectiveCamera(75,window.innerWidth / window.innerHeight , .1 ,1e3) 
      camera.position.set(0,2,6)
      
      orbit = new OrbitControls(camera , webgl.domElement)
      initLights()
      initGui()
      initLoader()
    } ,
    initLights = () => {
        let positions = [
          [0,0,10] ,
          [0,0,-10] ,
          [10,0,0] ,
          [-10,0,0] ,
          [0,10,0] ,
          [5,10,0] ,
          [0,10,5] ,
          [0,10,-5] ,
          [-5,10,0]
        ]
      const lightGroup = new T.Group() 
      lightGroup.name = '灯光group' 
      for(let i = 0 ; i < positions.length; i++) {
        let [x,y,z] = positions[i]
        let light = new T.DirectionalLight(0xffffff, i < 5 ? 1 : .3) 
        light.name = 'light_'+(i+1) 
        light.position.set(x,y,z)
        lightGroup.add(light)
      } 
      scene.add(lightGroup)
    },
    initGui = () => {
      gui = new GUI()
      const bodyGroup = gui.addFolder('车身') ,
            frontGroup = gui.addFolder('前脸') ,
            hoodGroup = gui.addFolder('引擎盖') ,
            glassGroup = gui.addFolder('挡风玻璃') ,
            wheelsGroup = gui.addFolder('轮毂')
      const keysMap = {
        color:'颜色',
        metalness:'金属感',
        roughness:'粗糙度' ,
        clearcoat:'clear coat' ,
        clearcoatRoughness:'clear 粗糙'
      }
      console.log(121,Object.entries(keysMap))
      Object.entries(keysMap).forEach(([key,name]) => {
        if(key === 'color') {
          bodyGroup.addColor(bodyMaterial,key).name(name)
          frontGroup.addColor(frontMaterial,key).name(name)
          hoodGroup.addColor(hoodMaterial,key).name(name)
          glassGroup.addColor(glassMaterial,key).name(name)
          wheelsGroup.addColor(wheelsMaterial,key).name(name)
        }else {
          bodyGroup.add(bodyMaterial,key,0,1).name(name)
          frontGroup.add(frontMaterial,key,0,1).name(name)
          hoodGroup.add(hoodMaterial,key,0,1).name(name)
          glassGroup.add(glassMaterial,key,0,1).name(name)
          if(['metalness','roughness'].includes(key)){
            wheelsGroup.add(wheelsMaterial,key,0,1).name(name)
          }
        }
      })
      // bodyGroup.addColor(bodyMaterial,'color').name('颜色').onChange(c=>{
      //   console.log(111,c)
      // }) 
    } ,
    initLoader = () => {
      const loader = new GLTFLoader() ,
            dracoLoader = new DRACOLoader() 
      dracoLoader.setDecoderPath('./draco/gltf/') 
      loader.setDRACOLoader(dracoLoader)
      console.log(loader)
      loader.load('./model/bmw01.glb',glb => {
        console.log(50,glb)
        const bmw = glb.scene 
        bmw.traverse(child => {
          if(child.isMesh){
            // console.log(child,child.name)
            if(child.name.includes('轮毂')){
              child.material = wheelsMaterial 
              wheels.push(child)
            }
            if(child.name.includes('Mesh002') ){
              carBody = child 
              carBody.material = bodyMaterial
            }
            if(child.name.includes('前脸')){
              frontCar = child 
              frontCar.material = frontMaterial
            }
            if(child.name.includes('引擎盖')){
              hoodCar = child 
              hoodCar.material = hoodMaterial
            }
            if(child.name.includes('挡风玻璃')){
              glassCar = child 
              glassCar.material = glassMaterial
            }
          }
        })
        scene.add(bmw)
      })
    }, 
    render = () => {
      webgl.render(scene,camera)
      orbit && orbit.update()
      requestAnimationFrame(render)
    }
    
    return {
      canvasDom
    }
  }
  
}
</script>

<style>
*{
  margin:0;
  padding : 0 ;
}

</style>
