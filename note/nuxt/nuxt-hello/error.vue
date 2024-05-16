<script setup lang="ts">
const props = defineProps({
  error : Object 
}) 
const handleError = () => clearError({redirect:'/'})
</script>

<template>
  <div>
    <!-- <h2> {{ error.statusCode }}</h2> -->
    <button @click="()=>handleError()">清除错误</button>
  </div>
</template>