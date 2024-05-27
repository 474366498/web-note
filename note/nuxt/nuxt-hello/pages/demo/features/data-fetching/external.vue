

<script setup>
const id = ref(1) 
const { data, pending, error } = await useFetch(() => `https://dummyjson.com/products/${id.value}`)
console.log(`pages/demo/features/data-fetching/external`, data)

const canDecrease = computed(()=>id.value > 1)  
</script>

<template>
  <section>
    <h4> data-fetching / external </h4>
    <div class="flex flex-col gap-2">
      <p class="flex items-center gap-2">
        Result of <code> https://dummyjson.com/products/</code>
        <UInput type="number" v-model="id" />
      </p>
      <p>
        <UButton :disabled="!canDecrease" @click="e=>canDecrease ? id -- : null "> Previous</UButton>
        -- 
        <UButton @click="e=>id++"> Next </UButton>
      </p>
      <p v-if="pending">Fetching...</p>
      <pre v-else-if="error">{{ error }}</pre>
      <pre v-else>{{ data }}</pre>
      <NuxtLink class="underline" to="/demo/features">Back to /demo/features</NuxtLink>
    </div>
    <!-- /demo/features/external -->
  </section>
</template>