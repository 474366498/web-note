export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  // loading : false ,
  loading: '~/components/loading.vue',
  // loading: {
  //   color: 'skyblue',
  //   height: '10px'
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/api/index.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt'
  ],
  axios: {
    baseURL: 'http://localhost:3000', // 假设Nuxt.js运行在3000端口
  },
  proxy: {
    '/api/': { // 代理到目标服务器的接口 用的本地的apifox
      target: 'http://127.0.0.1:4523/m1/2783543-0-default',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // nuxt2引入axios.js页面刷新报错问题：require() of ES Module
  build: {
    transpile: ['axios']
  }
}
