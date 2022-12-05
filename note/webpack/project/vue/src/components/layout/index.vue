<template>
  <section>
    <sidebar>
      <router-link to='/app'>app</router-link>
      <router-link to='/about'>about</router-link>
    </sidebar>
    <main>
      <router-view />
    </main>
  </section>
</template>
<script type='text/typescript'>
import {defineComponent, ref } from 'vue'  

  export default defineComponent ({ 
    name :'layout' ,
    cname : 'Layout 主页' ,
    setup  (c,p){
      const name = ref('layout')  

      return {
        name 
      }
    }
  })
</script>

<style lang="scss" scoped>
img{
  height: 100px;
  width:auto;
}
</style>