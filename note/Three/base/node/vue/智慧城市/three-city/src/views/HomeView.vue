<template>
  <div class="home">
    <Scene msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Scene from '@/components/scene.vue'

export default {
  name: 'HomeView',
  components: {
    Scene
  }
}
</script>
