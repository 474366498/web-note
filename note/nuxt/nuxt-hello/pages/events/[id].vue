<template>
  <div> event is is {{ $route.params.id }}</div>
</template>
<script setup>
const route = useRoute() 
  console.log('events:id',route)
</script>