<template>
  <div>
    <p>error path :{{ route.path }}</p> 
    404 [...slug].vue
  </div>
</template>
<script setup lang="ts">
defineProps({

})
let route = useRoute() 
console.log(11, route)

setResponseStatus(404)
</script>
