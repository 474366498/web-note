<script setup>
const nav = [
  { label: 'Home', to: '/' },
  { label: 'Custom', to: '/custom' },
  { label: 'Dynamic', to: '/dynamic' },
  { label: 'Other', to: '/other' },
]

</script>

<template>
  <NuxtExample dir="features/layouts" :nav="nav">
    <div class="flex items-center gap-4 mt-4">
      <UButton color="white" @click="setPageLayout('default')">default</UButton>
      <UButton color="white" @click="setPageLayout('custom')">custom</UButton>
      <UButton color="white" @click="setPageLayout('light')">light</UButton>
      <UButton color="white" @click="setPageLayout(false)">remove layout</UButton>
    </div>
  </NuxtExample>
</template>

