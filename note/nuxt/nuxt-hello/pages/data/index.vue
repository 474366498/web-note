<template>
  <div> fetch data {{ loading ? 'loading...' : lazyData?.length }}</div>
</template>
<script setup lang="ts">

const { data: asyncData, pending: asyncLoading } = await useAsyncData(
  'mountains',
  () => $fetch('/api/products', {
    params: {},
    query:{id:'12773'}
  })
)

// console.log('useAsyncData:', asyncData, asyncLoading)

const { data: lazyAsyncData, pending: lazyAsyncLoading } = await useLazyAsyncData(
  'productsLazy',
  ()=> $fetch('/api/products/lazy')
)
// console.log('useLazyAsyncData:',lazyAsyncData.value.length,lazyAsyncLoading)

const { data:fetchData, pending:fetchLoading, ...others } = await useFetch('/api/products', {
  onRequest({ request,options}) {
    // console.log('useFetch options',request,options)
  },
  key: 'fetch data',
  method : 'post'
})
// console.log('useFetch:', fetchData.value.length, fetchLoading,others)

const { data:lazyData, pending:loading } = await useLazyFetch('/api/products/lazy', {
  
})
// console.log('useLazyFetch:',lazyData.value.length,loading)




  
</script>