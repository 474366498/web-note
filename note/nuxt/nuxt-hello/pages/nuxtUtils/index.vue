<script setup  lang="ts">
const { data : fetchData } = await $fetch('/api/products')
console.log(3,fetchData)



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
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>
      <li>
        <h5><a href="https://www.nuxt.com.cn/docs/api/utils/"></a></h5>
      </li>

    </ul>
  </section>
</template>