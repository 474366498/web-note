<template>
  <div id="scene" class="scene" ref="sceneRef"> scene </div>
</template>



<script setup>
  import { onMounted, ref } from 'vue' 
  // import scene from '@/three/scene'
  import { webgl } from '@/three/webgl'
  import animate from '@/three/animate'
  import '@/three/init'
  import '@/three/createMesh'

const sceneRef = ref(null) 
console.log(14,webgl)

onMounted(() => {
  sceneRef.value.insertAdjacentElement('afterbegin', webgl.domElement)
  animate()
})

  
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>