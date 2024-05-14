<template>
  <div> 
    nuxt.config.ts   
    <a href="https://nuxt.com/docs/api/nuxt-config"> nuxt.config.ts api </a>
    <a href="https://juejin.cn/post/7065490182979452964">nuxt.config.js的常用配置</a>
  </div>

</template>


<script setup >
const runtimeConfig = useRuntimeConfig() 
console.log('config runtime', runtimeConfig.public, runtimeConfig.app)   
// public {shoeStoreApiBase: '/shoe-api', fileApi: '',...}
// app  {...,} 都是默认参数

const appConfig = useAppConfig()
console.log('config appConfig',appConfig)
</script>