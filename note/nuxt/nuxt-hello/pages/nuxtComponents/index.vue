<template>
  <section>
    nuxtComponents
    <ClientOnly  fallback-tag="span" fallback="加载评论中...">
      <div>at afterWriteDispatched (node:internal/stream_base_commons:160:15)</div>
    </ClientOnly>
    <ClientOnly >
      <template #fallback> <p>加载中... </p> </template>
    </ClientOnly>

    <NuxtClientFallback fallback-tag="span" fallback="hello world" @ssr-error="()=> logSomeError()">
      nuxt client fallback
      <BrokeInSsr />
    </NuxtClientFallback>
  </section>
</template>

<script setup lang="ts">

// const { data: asyncData, pending: asyncLoading } = await useAsyncData('mountains', () => $fetch('/api/products'))
const { data: asyncData, pending: asyncLoading } = await useLazyAsyncData('cc',() => $fetch('/api/products/lazy', {
  method:'get',
  params: {},
  query: { id: ''+new Date().getTime() }
}))

console.log('useLazyAsyncData 接口 要 lazy：', asyncData.value?.length , asyncLoading)
const { data:fetchData, pending:fetchLoading, ...others } = await useFetch('/api/products', {
  onRequest({ request,options}) {
    console.log('useFetch options',request,options)
  },
  key: 'fetch data',
  method : 'post'
})
console.log('useFetch:', fetchData.value, fetchLoading, others)

const logSomeError = () => {
  console.log('log some error')
}

</script>
