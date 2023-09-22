

<template>
  <div id='room' ref="room"></div> 
  <div class="map">
    <span class="tag" ref="tag">tag</span>
    <img src='./assets/map.gif' />
  </div> 
</template>

<script>
 import {onMounted , reactive , ref } from 'vue' 
 import * as T from 'three' 
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
 import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader' 
 import gsap from 'gsap' 

var webgl , camera , scene , orbit 

export default {
  name: 'App',
  setup () {
    let room = ref(null) ,
        tag = ref(null) ,
        progress = ref(0) 

    onMounted (() => {
      console.log(28,tag.value)
      tag.value.style.transform = `translate(100px,110px)`
      init()

      render()
    })
    var rooms = [
        {
          name : '客厅' ,
          index : 0 ,
          textureUrl :'./images/livingroom/' ,
          position : new T.Vector3(0,0,0),
          euler : null
        },
        {
          name : '厨房' ,
          index : 3 ,
          textureUrl :'./images/kitchen/' ,
          position : new T.Vector3(-5,0,-10),
          euler : new T.Euler(0,-Math.PI/2,0)
        },
        {
          name : '阳台' ,
          index : 8 ,
          textureUrl :'./images/balcony/' ,
          position : new T.Vector3(0,0,15),
          euler : new T.Euler(0,Math.PI / 16, 0)
        },
        {
          name : '走廊' ,
          index : 9 ,
          textureUrl :'./images/corridor/' ,
          position : new T.Vector3(-15,0,0),
          euler : new T.Euler(0,-Math.PI + Math.PI / 16 , 0)
        },
        {
          name : '主卧' ,
          index : 18,
          textureUrl :'./images/bedroom/' ,
          position : new T.Vector3(-25,0,2),
          euler : null
        }
      ]
    const init = () => {
      webgl = new T.WebGLRenderer({antialias : true }) 
      webgl.setPixelRatio(window.devicePixelRatio) 
      webgl.setClearColor(0x999999) 
      webgl.setSize(window.innerWidth,window.innerHeight) 


      scene = new T.Scene() 
      scene.add(new T.AxesHelper(4e2))

      camera = new T.PerspectiveCamera(75,window.innerWidth / window.innerHeight , .1 ,1e3) 
      camera.position.set(0,0,0) 

      room && room.value && room.value.appendChild(webgl.domElement)

      orbit = new OrbitControls(camera , webgl.domElement) 
      // orbit.update()
      initRooms()
      initTexts()
    } ,

    initRooms = () => {
      
      let roomsInstance = []
      rooms.forEach(room => {
        let {name , index ,textureUrl , position ,euler} = room 
        let instance = new Room(name ,index,textureUrl ,position,euler) 
        roomsInstance.push(instance)
      })
    },
    initTexts = () => {
      let textData = [
        {
          text : '厨房' ,
          position:new T.Vector3(-1,0,-3)
        },
        {
          text : '客厅' ,
          position:new T.Vector3(-4,0,-6)
        },
        {
          text : '阳台' ,
          position:new T.Vector3(0,0,3)
        },
        // 创建阳台回客厅文字精灵
        {
          text : '客厅' ,
          position:new T.Vector3(-1,0,11)
        },
        {
          text : '走廊' ,
          position:new T.Vector3(-4,0,.5)
        },
        // 创建走廊回客厅文字精灵
        {
          text : '客厅' ,
          position:new T.Vector3(-11,0,0)
        },
        {
          text : '主卧' ,
          position:new T.Vector3(-19,0,2)
        },
        // 创建主卧回走廊文字精灵
        {
          text : '走廊' ,
          position:new T.Vector3(-23,0,-2)
        },

      ]
      let textInstance = []
      
      textData.forEach(item => {
        let {text,position} = item
        let inst = new SpriteCanvas(camera,text,position)
        inst.onClick(()=>{
          let room = rooms.find(item => item.name === text) 
          console.log(146,text , room)
          gsap.to(camera.position,{
            x : room.position.x , 
            y : room.position.y , 
            z : room.position.z ,
            duration:1
          })
          moveTag(text)
        })
        // console.log(inst)
        textInstance.push(inst)
        scene.add(inst.mesh)
      })
    },
    moveTag = (text) => {
      let positions = {
        客厅: [100, 110],
        厨房: [180, 190],
        阳台: [50, 50],
        卧室: [160, 40],
        走廊: [150, 90],
      }
      if(positions[text]){
        gsap.to(tag.value,{
          x : positions[text][0],
          y : positions[text][1] ,
          duration : 1 ,
          ease : 'power3.inout'
        })
      }
    },
    render = () => {
      requestAnimationFrame(render)
      webgl.render(scene,camera)
    }

    // 立方体房间
    class Room {
      constructor (name , roomIndex , textureUrl , position = new T.Vector3(0,0,0) , euler = new T.Euler(0,0,0)) {
        this.name = name 
        const geo = new T.BoxGeometry(10,10,10) 
        geo.scale(1,1,-1) 

        var arr = [
          `${roomIndex}_l`,
          `${roomIndex}_r`,
          `${roomIndex}_u`,
          `${roomIndex}_d`,
          `${roomIndex}_b`,
          `${roomIndex}_f`,
        ]

        console.log(107,arr,euler) 

        let boxMaterials = []

        arr.forEach(item => {
          let texture = new T.TextureLoader().load(`${textureUrl}/${item}.jpg`)
          // console.log(113,texture)
          if(item === `${roomIndex}_u` || item === `${roomIndex}_d`) {
            texture.rotation = Math.PI 
            texture.center = new T.Vector2(.5,.5)
          }
          boxMaterials.push(new T.MeshBasicMaterial({map:texture}))
        })

        const cube = new T.Mesh(geo,boxMaterials)
        position && cube.position.copy(position)
        euler && cube.rotation.copy(euler)
        scene.add(cube)

        T.DefaultLoadingManager.onProgress = function (item,loaded,total) {
          // console.log(item,loaded,total) 
          progress.value = new Number((loaded / total) * 100).toFixed(2)
        }

      }
    }

    // 文字
    class SpriteCanvas {
      constructor (camera , text='嘿嘿' ,position = new T.Vector3(0,0,0),euler=new T.Euler(0,0,0)) {

        this.fns = [] 

        const canvas = document.createElement('canvas')
        canvas.width = 1024 
        canvas.height = 1024 

        const context = canvas.getContext('2d')
        this.context = context 

        context.fillStyle = 'rgba(100,100,100,1)'
        context.fillRect(0,256,1024,512) 
        context.textAlign = 'center' 
        context.textBaseline = 'middle' 
        context.font = 'bold 200px Arial' 
        context.fillStyle = 'rgba(255,255,255,1)'
        context.fillText(text,canvas.width / 2,canvas.height / 2)

        let texture = new T.CanvasTexture(canvas) 

        const material = new T.SpriteMaterial({
          map : texture ,
          color:0xffffff ,
          alphaMap : texture ,
          side : T.DoubleSide ,
          transparent:true 
        })
        this.mesh = new T.Sprite(material) 
        this.mesh.scale.set(.5,.5,.5) 
        this.mesh.position.copy(position)

        this.raycaster = new T.Raycaster() 
        this.mouse = new T.Vector2()

        window.addEventListener('click',event => {
          this.mouse.x = (event.clientX / window.innerWidth) * 2 -1 
          this.mouse.y = -( (event.clientY / window.innerHeight) * 2 - 1)

          this.raycaster.setFromCamera(this.mouse,camera) 
          event.mesh = this.mesh 
          event.spriteCanvas = this 

          const intersects = this.raycaster.intersectObject(this.mesh) 
          // console.log(245,intersects)
          if(intersects.length > 0) {
            this.fns.forEach(fn => {
              fn(event)
            })
          }
        })

      }

      onClick(fn) {
        this.fns.push(fn)
      }

    }


    return {
      room ,
      tag 
    }
  }
}


</script>

<style>
html,body{
  margin:0;
  padding: 0;
}
#room{
height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
.map{
  width: 300px;
  height: 260px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.map > img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.map > .tag {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background-image: url(./assets/location.png);
  background-size: cover;
  z-index: 1;
}
</style>
