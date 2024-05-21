<script setup  lang="ts">
const { data : fetchData } = await $fetch('/api/products')
console.log(3,fetchData)

// showError({
//   status: 404,
//   statusMessage:'页面出错！'
// })

const appConfig = useAppConfig() 

console.log(12 ,appConfig)

setTimeout(() => {
  updateAppConfig({ foo: 'nuxtUtils config' })

  console.log(16 ,appConfig)
  
}, 5e3);
</script>


<template>
  <section class="utils" style="height: 80vh;overflow-y: auto;">
    <h3> nuxt utils </h3>
    <ul>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/dollarfetch">$fetch</a></h5>
        <p>{{ fetchData?.length }}</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/abort-navigation">abortNavigation</a></h5>
        <p>abortNavigation 只能在路由中间件处理程序内使用。</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/add-route-middlevare">addRouteMiddleware</a></h5>
        <p>addRouteMiddleware 路由中间件中使用</p>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/clear-error">clearError</a></h5>
        <p> clearError({redirect:'/'})</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/clear-nuxt-data">clearNuxtData</a></h5>
        <p>删除useAsyncData 和 useFetch 的缓存数据、错误状态和待处理的promises</p>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/clear-nuxt-state">clearNuxtState</a></h5>
        <p>删除useState的缓存状态</p>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/create-error">createError</a></h5>
        <code>
            <p>const route = useRoute()</p>
            <p>const {data} = await useFetch(`api address`)</p>
            <p>if(!data.value){</p>
            <p>throw createError({statusCode:404,statusMessage:'页面未找到'})</p>
            <p>}</p>  
          </code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/define-nuxt-component">defineNuxtComponent</a></h5>
        <code>
          <strong>// 如果不使用setup() 可以在组件中使用asyncData() </strong>
          <p>export default defineNuxtComponent({</p>
            <p>async asyncData (){</p>
              <p>return {</p>
                <p>data:{</p>
                  <p>greetings:'nuxt data'</p>
                <p>}</p>
              <p>}</p>
            <p>},</p>
            <p>head(nuxtApp){</p>
              <p>return {title:'nuxt app'}</p>
            <p>}</p>
          <p>})</p>        
        </code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/define-nuxt-route-middlewarea">defineNuxtRouteMiddleware</a></h5>
        <code>
          <strong>路由中间件存储在Nuxt应用程序的/middlewarea目录（除非另有设置）</strong>

          <p>export default defineNuxtRouteMiddlewarea((to,from)=>{</p>
            <p>if(to.params.id ==='1'){</p>
              <p>throw createError({statusCode:404,statusMessage:'页面错误'})</p>
            <p>}</p>  

            <p>const auth = useState('auth')</p>
            <p>if(!auth.value.isAuthenticated){</p>
              <p>return navigateTo('/login')</p>
            <p>}</p>  

            <p>if(to.path !== '/dashboard'){</p>
              <p>return navigateTo('/dashboard')</p>
            <p>}</p>
          <p>})</p>

        </code>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/define-page-meta">definePageMeta</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/define-route-rules">defineRouteRules</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/navigate-to">navigateTo</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/on-before-route-leava">onBeforeRouteLeave</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/on-before-route-update">onBeforeRouteUpdate</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/on-nuxt-ready">onNuxtReady</a></h5>
        <code>
          <strong>onNuxtReady仅在客户端运行</strong>
          <p>export default defineNuxtPlugin(()=>{</p> 
            <p>onNuxtReady(async ()=>{ </p> 
              <p>const myAnalyticsLibrary = await import('my-big-analytics-library') </p> 
            <p>})</p>
          <p>})</p>
        </code>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/prefetch-components">prefetchComponents</a></h5>
        <code>
          <strong> 预取组件 在服务器上无效果</strong>
        </code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/preload-compoents">preloadComponents</a></h5>
        <code>
          <strong>预加载组件 在服务器上无效果</strong>
        </code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/preload-route-components">preloadRouteComponents</a></h5>
        <code>
          <strong>// preloadRouteComponents 在服务器上无效果</strong>
          <p>preloadRouteComponents('/dashboard')</p>
          <p>const submit = async () => {</p>
            <p> const results = await $fetch('/api/authentication')</p>
            <p>if(results.token){</p>
              await navigateTo('/dashboard')
            <p>}</p>  
          <p>}</p>
        </code>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/prerender-routes">prerenderRoutes</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/refresh-nuxt-data">refreshNuxtData</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/reload-nuxt-app">reloadNuxtApp</a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/set-page-layout">setPageLayout</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/set-response-status">setResponseStatus</a></h5>
        <code>
          <strong>在浏览器中setResponseStatus不会产生任何效果</strong>
        </code>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/show-error">showError</a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/update-app-config">updateAppConfig</a></h5>
      </li>
      
    </ul>
  </section>
</template>