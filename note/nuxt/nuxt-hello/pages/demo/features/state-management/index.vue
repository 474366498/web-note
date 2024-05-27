
<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1e3))
const sameCounter = useState('counter')
</script>

<template>
  <NuxtExample dir="features/state-management" >
    <h4> state management </h4>
    <p > Counter :{{ counter }}</p>
    <div class="flex gap-2 my-4">
      <UButton @click="counter--"> - </UButton>
      <UButton @click="counter++"> + </UButton>
    </div>
    <p> same counter {{ sameCounter }}</p>
  </NuxtExample>
</template>

<style scoped>
p{
  color:black;
}
</style>