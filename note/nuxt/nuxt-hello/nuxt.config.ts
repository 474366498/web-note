// https://nuxt.com/docs/api/configuration/nuxt-config
// console.log(2222222222222222, process.env.NUXT_SERVER_API)
export default defineNuxtConfig({
  app: {
    head: {
      title: 'This is a about nuxt3 app',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ]
    },
  },
  alias: {
    '@': './'
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content', // 在用的时候要注意 content下的md文件名要与pages页面中的文件(夹/名)相对应
  ],
  content: {
    documentDriven: true
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  css: [
    '~/assets/index.scss'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // 环境变量 私有令牌
  runtimeConfig: {
    shoeStoreApiSecret: 'my-secret-key',
    serverApi: process.env.NUXT_SERVER_API || 'server_api',
    public: {
      shoeStoreApiBase: '/shoe-api',
      fileApi: process.env.NUXT_FILE_API
    }
  }


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



import { resolve } from 'path' 
export default difineNuxtConfig ({
  alias : {
  "@" : resolve(__dirname,'/')
  },
  css : [
    '~/assets/main.scss' ,    // 需要 npm install sass 
  ]
})










*/