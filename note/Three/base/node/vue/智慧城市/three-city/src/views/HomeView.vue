<template>
  <div class="home">
    <Scene msg="Welcome to Your Vue.js App"/>
    <Screen />
  </div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/scene.vue'
import Screen from '@/components/screen.vue'

export default {
  name: 'HomeView',
  components: {
    Scene,
    Screen
  }
}
</script>
