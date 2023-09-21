

<template>
  <div class="robot" ref="robotDom"></div>
</template>

<script>
import {onMounted , reactive , ref} from 'vue'
import * as T from 'three' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader' 
import {RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Reflector } from "three/examples/jsm/objects/Reflector";


var webgl , camera , scene , orbit  

export default {
  name: 'App',
  setup () {
    let robotDom = ref(null) 

    onMounted( ()=>{
      init()
      render()
      window.addEventListener('resize',()=>{
        camera && (camera.aspect = window.innerWidth / window.innerHeight)
        camera && camera.updateProjectionMatrix() 
        webgl && webgl.setSize(window.innerWidth,window.innerHeight) 
        webgl && webgl.setPixelRatio(window.devicePixelRatio)
      })
    })

    const init = () => {
      webgl = new T.WebGLRenderer({antialias : true })
      webgl.setPixelRatio(window.devicePixelRatio)
      webgl.setSize(window.innerWidth , window.innerHeight)
      // webgl.setClearColor(0x333333)
      
      camera = new T.PerspectiveCamera(75,window.innerWidth / window.innerHeight , .1,1e3) 
      camera.position.set(0,1.5,6) 

      scene = new T.Scene() 
      scene.add(new T.AxesHelper(4e2))

      orbit = new OrbitControls(camera,webgl.domElement) 
      robotDom && robotDom.value && robotDom.value.insertAdjacentElement('afterbegin',webgl.domElement)   
      console.log(webgl,camera) 
      lightsInit()
      loaderInit()
    } ,
    lightsInit = () => {
      let positions = [
        [0,10,10] ,
        [0,10,-10] ,
        [10,10,10] ,
        [10,10,-10]
      ]
      let lightGroup = new T.Group()
      lightGroup.name = '灯光组' 
      for(let i = 0 ; i < positions.length ; i++) {
        let [x,y,z] = positions[i] 
        let intensity = (3 + Math.random() * (8-3)) / 10 
        // console.log(59,intensity)
        let light = new T.DirectionalLight(0xffffff , intensity)
        light.position.set(x,y,z)
        lightGroup.add(light)
      }
      scene.add(lightGroup)
    },
    loaderInit = () => {
      const hdrLoader = new RGBELoader() 
      hdrLoader.load('./assets/sky12.hdr', texture => {
        console.log(69,texture)
        scene.background = texture 
        // environment
        scene.environment = texture
      })

      const dracoLoader = new DRACOLoader() 
      dracoLoader.setDecoderPath('./draco/gltf/')
      dracoLoader.setDecoderConfig({ type :'js'})
      const gltfLoader = new GLTFLoader() 
      gltfLoader.setDRACOLoader(dracoLoader) 
      gltfLoader.load('./assets/robot.glb',glb => {
        console.log(81,glb)
        let robot = glb.scene
        scene.add(robot)
      })
      addCurrent() //光阵
    },
    addCurrent = () => {
      let video = document.createElement('video') 
      video.src = './assets/zp2.mp4' 
      video.loop = true 
      video.play()  

      const videoTexture = new T.VideoTexture(video) 
      const videoGeoPlane = new T.PlaneGeometry(8,4.5) 
      const videoMaterial = new T.MeshBasicMaterial({
              map : videoTexture ,
              transparent : true ,
              side : T.DoubleSide ,
              alphaMap : videoTexture
            })
      
      const videoMesh = new T.Mesh(videoGeoPlane,videoMaterial)
      videoMesh.position.set(0,0.1,0)
      videoMesh.rotation.x = - Math.PI / 2 
      scene.add(videoMesh)

      let reflectorGeometry = new T.PlaneGeometry(100,100) 
      let reflectorPlane = new Reflector(reflectorGeometry, {
        textureWidth : window.innerWidth ,
        textureHeight : window.innerHeight ,
        color : 0x442222
      })
      reflectorPlane.rotation.x = -Math.PI / 2 
      scene.add(reflectorPlane)

    },
    render = () => {
      orbit && orbit.update() 
      webgl.render(scene,camera)
      requestAnimationFrame(render)
    }


    return {
      robotDom
    }
  }
}
</script>

<style>
html , body {
  margin:0;
  padding : 0
} 
</style>
