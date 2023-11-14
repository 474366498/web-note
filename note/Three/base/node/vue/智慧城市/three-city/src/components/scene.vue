<template>
  <div class="scene" ref="sceneDiv"> scene </div>
</template>
<script setup>
import { onMounted , ref  } from 'vue'
import * as T from 'three'
import scene from '@/three/scene'
import webgl from '@/three/webgl'
import camera from '@/three/camera'
import controls from '@/three/controls'
import '@/three/init'
import createMesh from '@/three/createMesh'


const sceneDiv = ref(null)
var control = new controls(camera,webgl.domElement)
console.log(11 , scene , camera , control )
scene.add(camera)

createMesh()

onMounted(() => {
  sceneDiv.value.insertAdjacentElement('afterbegin', webgl.domElement)

  animation()
})

function animation() {
  control.update()
  webgl.render(scene, camera)
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