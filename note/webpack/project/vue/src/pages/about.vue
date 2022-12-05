<template>
  <section>
   {{msg}}
  </section>
</template>
<script type='text/typescript'>
import {defineComponent } from 'vue' 
  export default defineComponent ({ 
    name : 'about',
    data () { 
      return {} 
    },
    setup (c,p) {
      return {
        msg : 'about'
      }
    },
    methods : {} 
  })
</script>