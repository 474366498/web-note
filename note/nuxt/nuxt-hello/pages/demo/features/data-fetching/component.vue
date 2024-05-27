
<script setup>
const id = ref(1)

</script>

<template>
  <section> 
    <div class="flex flex-col gap-2">
    <p>Example of data fetching inside a component:</p>
    <p><UButton @click="id--">Previous</UButton> - <UButton @click="id++">Next</UButton></p>
    <DataFetchingQuote :id="id" />
    <NuxtLink class="underline" to="/demo/features">Back to /demo/features</NuxtLink>
  </div>
  </section>
</template>