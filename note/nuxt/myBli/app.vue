<template>
    <NuxtPage />
</template>

<script setup lang="ts">
const userInfo = await useFetch('/api/user')
console.log('app userInfo',userInfo)
useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss">
  @import './assets/styles/base.scss';
  @import './assets/styles/iconfont.scss';
</style>
