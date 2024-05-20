
<script lang="ts">
export default {
  setup() {
    const config = useAppConfig()

    const {data:asyncData} = useAsyncData('asyncData',async () => {
      const response = await $fetch('/api/products')
      console.log(7, response)
      return  response.data
    })

    const counter = useCookie('counter')
    counter.value = counter.value || Math.round(Math.random() * 1e3)


    const errorInfo = useError()


    const { data: fetchData } = useFetch('/api/products', {
      onRequest({ request, options }) {
        
      },
      onResponse({ request, response, options }) {
        console.log(21,response)
        return response._data.data
      }
    })

    useHead({
      title:'nuxt composables'
    })

    const { data: lazyAsyncData } = useLazyAsyncData(async () => {
      const response = await $fetch('/api/products/lazy')
      return response
    })

    const { data: lazyData } = useLazyFetch('/api/products/lazy')

    // const appInfo = useNuxtApp() || new Object()
    // console.log(39 , appVue,appInfo  )


    const instance = getCurrentInstance()
    // console.log(47, instance)

    const { data: nuxtData } = useNuxtData('asyncData')
    console.log(50,nuxtData)

    const requestEvent = useRequestEvent(),
    requestHeaders = useRequestHeaders()
    
    const requestUrl = useRequestURL()
    console.log('requestEvent', requestEvent, requestHeaders, requestUrl, requestUrl.toString())

    const routeInfo = useRoute(), routerInfo = useRouter()
    
    const runtimeConfig = useRuntimeConfig()
    console.log('route', routeInfo, routerInfo, runtimeConfig)

    onMounted(() => {
      
      setTimeout(() => {
        
        useSeoMeta({
          title: '我的神奇网站 ~ nuxt composables',
          ogTitle: '我的神奇网站',
          description: '这是我的神奇网站，让我告诉你关于它的一切。',
          ogDescription: '这是我的神奇网站，让我告诉你关于它的一切。',
          ogImage: 'https://example.com/image.png',
          twitterCard: 'summary_large_image',
        })
      }, 5e3);
  
      setTimeout(() => {
        useServerSeoMeta({
          title:'我的神奇网站 ~ server ~ nuxt composables'
        })
      }, 1e4);
      setInterval(() => {
        count.value ++
      },1e3)
    })
    const count = useState('count', () => Math.round(Math.random() * 1e4))

    return {
      config ,
      asyncData,
      counter,
      fetchData,

      lazyAsyncData,
      lazyData,
      // appInfo:new Object(),
      nuxtData,
      requestEvent,
      requestHeaders,
      requestUrl,

      routeInfo,
      routerInfo,
      runtimeConfig,
      count
    }
  }
}
</script>

<template>
  <section class="composables" style="height: 80vh;overflow-y: auto;">
    <h3> composables </h3>
    <ul>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-app-config">useAppConfig</a></h5>
        <p>{{ config ?'config' :'not found config' }}</p>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-async-data">useAsyncData</a></h5>
        <p>{{ asyncData?.length}}</p>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-cookie">useCookie</a></h5>
        <p>{{ counter }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-error">useError</a></h5>
        <p></p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-fetch">useFetch</a></h5>
        <p>{{ fetchData?.data?.length }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-head">useHead</a></h5>
        <code></code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-head-safe">useHeadSafe</a></h5>
        <code></code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-hydration">useHydration</a></h5>
        <code></code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-lazy-async-data">useLazyAsyncData</a></h5>
        <p>{{ lazyAsyncData?.length }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-lazy-fetch">useLazyFetch</a></h5>
        <p>{{ lazyData?.length }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-nuxt-app">useNuxtApp</a></h5>
        <!-- <p>inject => useNuxtApp().$**:{{ appInfo?.$appVue }}</p> -->
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-nuxt-data">useNuxtData</a></h5>
        <p> useNuxtData 使用 缓存数据~asyncData ： {{ nuxtData.length }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-request-event">useRequestEvent</a></h5>
        <p>在浏览器中useRequestEvent 返回undefined {{ requestEvent?.url||'not found' }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-request-headers">useRequestHeaders</a></h5>
        <p>在浏览器中useRequestEvent 返回undefined {{ requestHeaders?.url||'not found' }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-request-url">useRequestURL</a></h5>
        <p>{{ requestUrl }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-route">useRoute</a></h5>
        <p>{{ routeInfo.fullPath }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-router">useRouter</a></h5>
        <p>{{ routerInfo.currentRoute.value.fullPath }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-runtime-config">useRuntimeConfig</a></h5>
        <p>{{ Object.keys(runtimeConfig) }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-seo-meta">useSeoMeta</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-server-seo-meta">useServerSeoMeta</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/composables/use-state">useState</a></h5>
        <p>{{ count }}</p>
      </li>
      
    </ul>
  </section>
</template>

<style>
/* 滚动条美化 https://www.w3cschool.cn/css/css-scrollbar.html  */
.composables{
  scrollbar-face-color:#eaeaea;
  scrollbar-shadow-color:#eaeaea;
  scrollbar-highlight-color:#eaeaea;
  scrollbar-3dlight-color: #eaeaea;
  scrollbar-darkshadow-color:#697074;
  scrollbar-track-color: #f7f7f7;
  scrollbar-arrow-color:#666666;
}

::-webkit-scrollbar{
  width:10px;
}
::-webkit-scrollbar-track{
  background-color:pink ;
}
::-webkit-scrollbar-thumb{
  background-color:rgba(0,0,0,.2);
}
::-webkit-scrollbar-button{
  background-color:#7c2929;
}
::-webkit-scrollbar-corner{
  background-color:black;
}
</style>
