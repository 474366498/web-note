<template>
  <div class="home"> 
    <Scene />   
    <Screen />
  </div>
</template>

<script>
import Scene from '@/components/scene.vue'
import Screen from '@/components/screen.vue'
export default {
  name: 'HomeView',
  components: {
    Scene,
    Screen
  },
  setup() {
    
  }
}
</script>
