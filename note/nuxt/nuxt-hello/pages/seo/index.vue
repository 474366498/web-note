<script setup lang="ts">
useHead({
  title: 'about nuxt3 head',
  style: [
    'body{border:1px solid red;}'
  ],
  script: [
    `console.log('hello seo')`
  ]
})
</script>



<template>
  <div> seo mate <a href="https://nuxt.com/docs/api/composables/use-head"> useHead </a>  <a href="https://nuxt.com/docs/api/nuxt-config#head"> config.ts ~ head</a></div>
</template>