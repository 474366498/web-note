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
    <br>
    <NuxtErrorBoundary >
      Nuxt Error Boundary
      <template #error="{error}">
        <p> 发生错误 ： {{ error }}</p>
      </template>
    </NuxtErrorBoundary>
    
    <!-- <NuxtWelcome /> -->

    <NuxtIsland name="firefox" source="https://home.firefoxchina.cn/" >
      NuxtIsland 仅服务器端组件在底层使用
    </NuxtIsland>

    <NuxtImg class="img" src="/nuxt.png" />
    <NuxtImg class="img" src="https://img2.baidu.com/it/u=1433544522,4138372711&fm=253&fmt=auto&app=138&f=JPEG?w=874&h=500" /> 
    

    <NuxtPicture class="picture" src="/nuxt.png" />
    <NuxtPicture class="picture" src="https://img2.baidu.com/it/u=1535441817,3715404211&fm=253&fmt=auto&app=138&f=JPEG?w=548&h=190" />

    <button @click="()=>open=true">打开模态框</button>

    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>来自模态框的问候！</p>
        <button @click="()=>open = false">
          关闭
        </button>
      </div>
    </Teleport>

  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// const { data: asyncData, pending: asyncLoading } = await useAsyncData('mountains', () => $fetch('/api/products'))
const { data: lazyAsyncData, pending: lazyAsyncLoading } = await useLazyAsyncData('cc',() => $fetch('/api/products/lazy', {
  method:'get',
  params: {},
  query: { id: ''+new Date().getTime() }
}))

console.log('useLazyAsyncData 接口 要 lazy：', lazyAsyncData.value?.length, lazyAsyncLoading)

const { data: asyncData } = await useAsyncData('dd', () => $fetch('/api/products'))
console.log('useAsyncData :' , asyncData)

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

const open = ref(false)

</script>


<style scoped>
.modal{
  position: fixed;
  top:20vh;
  bottom:20vh;
  background: pink;
  opacity: .5;
  left: 0;
  right:0;
}
</style>