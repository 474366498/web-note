<template>
  <div class="home">
    <Scene msg="Welcome to Your Vue.js App"/>
    <!-- <Screen /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import gsap from 'gsap'
import eventHub from '@/utils/eventHub';
import Scene from '@/components/scene.vue'
import Screen from '@/components/screen.vue'
import controls from '@/three/controls';
import { onMounted } from 'vue';

export default {
  name: 'HomeView',
  components: {
    Scene,
    Screen
  },
  setup() {

    onMounted(() => {
      window.addEventListener('keyup', event => {
        console.log(27, event, controls.target)
        let { x , y ,z} = controls.target
        if (event.keyCode === 27) {
          if (x !== 0 && y !== 0 && z !== 0) {
            gsap.to(controls.target, {
              x: 0,
              y: 0,
              z: 0,
              duration : 1
            })
          }
        }
      })
    })

    eventHub.on('spriteClick', (data) => {
      console.log('home spriteClick', data)
      let { x, z } = data.event.position 
      let y = 1 
      gsap.to(controls.target, {
        x,
        y,
        z,
        duration:1
      })
    })
    eventHub.on('toggleActive', (data) => {
      console.log('home toggleActive', data)
      let { x, y, z } = data.item.mesh.position
      console.log(28, x, y, z)
      gsap.to(controls.target, {
        x,
        y,
        z,
        duration:1
      })
    })
  }
}
</script>
