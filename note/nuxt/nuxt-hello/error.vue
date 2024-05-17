<script setup lang="ts">
const props = defineProps({
  error : Object 
}) 
const handleError = () => clearError({redirect:'/'})
</script>

<template>
  <div>
    <h2> {{ error.statusCode }}</h2>
    <p style="color:red">有页面错误(方法出错...) 就跳这个 error page</p>
    <button @click="()=>handleError()">清除错误</button>
  </div>
</template>