
<script setup>
const { data } = await useFetch('/api/data-fetching')
  console.log(`pages/demo/features/data-fetching `,data)
</script>


<template>
  <section>
    <div> features / data-fetching </div>
    <pre> {{ data?.data }}</pre>
    <div class="flex justify-evenly">
      <NuxtLink to="data-fetching/external">external</NuxtLink>
      <NuxtLink to="data-fetching/components">components</NuxtLink>
    </div>
  </section>
</template>