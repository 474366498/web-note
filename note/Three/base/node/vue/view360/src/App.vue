

<template>
  <div class="container" ref="container"></div>
</template>

<script>
import { onMounted  , ref } from 'vue' 
import * as T from 'three' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader' 

var webgl , camera  , scene , orbit 
export default {
  name: 'App',
  setup () {
    let container = ref(null)

    onMounted (() => {
      init()

      render()
    })

    const init = () => {
      webgl = new T.WebGLRenderer({antialias:true}) 
      webgl.setPixelRatio(window.devicePixelRatio)
      webgl.setSize(window.innerWidth , window.innerHeight)
      webgl.setClearColor(0x999999)

      scene = new T.Scene() 

      scene.add(new T.AxesHelper(4e2))
      camera = new T.PerspectiveCamera(75,window.innerWidth / window.innerHeight , .1 ,1e3)

      camera.position.z = .11

      orbit = new OrbitControls(camera , webgl.domElement) 
      orbit.update()

      container && container.value && container.value.appendChild(webgl.domElement)
      initBox()

    },
    initBox = () => {
      const geo = new T.BoxGeometry(10,10,10) 
      var arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"]
      let boxMaterials = [] 

      arr.forEach(item => {
        let texture = new T.TextureLoader().load(`./imgs/living/${item}.jpg`)
        if(['4_u','4_d'].includes(item)) {
          texture.rotation = Math.PI 
          texture.center = new T.Vector2(.5,.5)
          boxMaterials.push(new T.MeshBasicMaterial({map:texture}))
        }else{
          boxMaterials.push(new T.MeshBasicMaterial({map:texture}))
        }
      })
      const box = new T.Mesh(geo,boxMaterials)
      box.position.set(0,0,0)
      box.geometry.scale(1,1,-1)
      scene.add(box)
    } ,
    render = () => {
      requestAnimationFrame(render)
      webgl.render(scene,camera)
    }



    return {
      container 
    }
  }
}
</script>

<style>
html , body {
  margin:0;
  padding:0
}
</style>
