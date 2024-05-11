<template>
  <div> nuxt plugins </div>
  <div> {{ $hello('nuxt plugins') }}</div>
  <input v-focus type="text" />
  <p>https://nuxt.com/docs/guide/directory-structure/plugins </p>
</template>

<script setup>
  console.log('plugins:',useNuxtApp())
</script>