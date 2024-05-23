// https://nuxt.com/docs/api/configuration/nuxt-config

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import type { NuxtPage } from 'nuxt/schema'

console.log(2222222222222222, process.env.NUXT_SERVER_API)
console.log('fileURLToPath', fileURLToPath)
console.log('dirname', dirname, dirname('./'))
console.log('join', join)
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
    pageTransition: {
      name: 'page', mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout', mode: 'in-out'
    }
  },
  alias: {
    '@': './'
  },


  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  content: {
    documentDriven: true
  },
  css: [
    '~/assets/index.scss'
  ],
  devtools: { enabled: true },

  experimental: {
    clientFallback: true,// <NuxtClientFallback />
    componentIslands: 'local+remote'
  },

  extends: [
    '@nuxt/examples-ui',
    './base'
  ],
  hooks: {
    'pages:extend'(pages) {
      console.log('nuxt.config pages:', pages.length)
      /* pages
      nuxt.config pages: [ 
        { name: 'slug',                                                                         11:29:52
          path: '/:slug(.*)*',
          file: 'E:/web-note/note/nuxt/nuxt-hello/pages/[...slug].vue',
          children: [] },
        { name: 'assets',
          path: '/assets',
          file: 'E:/web-note/note/nuxt/nuxt-hello/pages/assets/index.vue',
          children: [] },
        { name: 'authLayers',
          path: '/authLayers',
          file: 'E:/web-note/note/nuxt/nuxt-hello/pages/authLayers/index.vue',
          children: [] },
        { name: 'config',
          path: '/config',
          file: 'E:/web-note/note/nuxt/nuxt-hello/pages/config/index.vue',
          children: [] }
        ]
      */
      // 添加路由
      pages.push({
        name: 'profile',
        path: '/profile',
        file: '~/extra-pages/profile.vue',
      })
      // console.log('nuxt.config pages  rg :', pages)
      // 删除路由
      // function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
      //   const pagesToRemove = []
      //   for (let page of pages) {
      //     if (pattern.test(page?.file)) {
      //       pagesToRemove.push(page)
      //     } else {
      //       removePagesMatching(pattern, page.children)
      //     }
      //   }
      //   for (let page of pagesToRemove) {
      //     pages.splice(pages.indexOf(page), 1)
      //   }
      // }
      // removePagesMatching(/\.ts$/, pages)
    }
  },
  modules: [// 在用的时候要注意 content下的md文件名要与pages页面中的文件(夹/名)相对应
    '@nuxt/content',
    "@nuxt/image",
    "./modules/use"
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
  },
  /*
  routeRules: {
    '/': { prerender: true },
    '/api/*': { cache: { maxAge: 5e3 } },
    '/old-page': {
      redirect: { to: '/new-page', statusCode: 302 }
    }
  }
  */
  ssr: false
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