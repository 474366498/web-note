<template>
  <div class="scene" ref="sceneDiv"> scene </div>
</template>
<script setup>
import { onMounted , ref  } from 'vue'
import * as T from 'three'
import scene from '@/three/scene'
import webgl from '@/three/webgl'
import Camera from '@/three/camera'
import controlsModule from '@/three/controls'
import '@/three/init'
import createMesh from '@/three/createMesh'
import { updateMesh } from '@/three/createMesh'


const sceneDiv = ref(null)
// console.log(11 , scene , Camera , control )
scene.add(Camera.active)

createMesh()

onMounted(() => {
  sceneDiv.value.insertAdjacentElement('afterbegin', webgl.domElement)

  animation()
})



const clock = new T.Clock()
// console.log(29999,controls)
function animation() {
  let time = clock.getDelta()
  // console.log(32,time,controls)
  controlsModule.controls.update && controlsModule.controls.update(time)
  updateMesh(time)
  webgl.render(scene, Camera.active)
  requestAnimationFrame(animation)
}



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