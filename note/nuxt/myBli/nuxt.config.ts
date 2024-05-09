// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // 是否开启服务端渲染
  // 调试工具
  devtools: { enabled: true },
  // 三方模块
  modules: [
    '@vant/nuxt'
  ],
  vant: {

  }
})
