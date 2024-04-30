// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }
})

/*

 
// https://v3.nuxtjs.org/api/configuration/nuxt-config
// https://www.nuxt.com.cn/docs/api/nuxt-config
export default defineNuxtConfig({
  // 应用模块
  modules: [
    // 例如：'@nuxtjs/axios',
  ],
 
  // 全局头部标签
  head: {
    title: 'Nuxt.js 3 配置示例',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js 3 配置示例' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
 
  // 全局样式和脚本
  css: [
    '~/assets/css/main.css',
  ],
  script: [
    { src: 'https://example.com/my-script.js', body: true, type: 'text/javascript', charset: 'utf-8' },
  ],
 
  // 全局插件
  plugins: [
    '~/plugins/myPlugin.js',
  ],
 
  // 服务器配置
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
 
  // 构建配置
  build: {
    // 自定义构建步骤
  },
 
  // 其他配置...
})

*/