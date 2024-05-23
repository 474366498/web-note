
<script setup>
const message = ref('Nuxt')

function hello() {
  sayHello(message.value)
}
</script>


<template>
  <NuxtExample dir="features/auto-imports">
    <h1>Demo with auto imports</h1>
    <form action="" class="flex gap-2" @submit.prevent="hello">
      <CustomInput v-model="message" />
      <UButton type="submit"> Hello </UButton>
    </form>
  </NuxtExample>
</template>