<template>
  <div> to error page </div>
</template>
<script setup lang="ts">
setTimeout(() => {
  console.log('to error')
  // const { data: asyncData, pending: asyncLoading } = await useAsyncData( 'mountains',() => $fetch('/api/products', {
  //     params: {},
  //     query:{id:'12773'}
  //   })
  // )
  return new Error('')

}, 6e3);

  
</script>