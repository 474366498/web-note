



// 自定义模块

import { createResolver, defineNuxtModule, addServerHandler, installModule, loadNuxt, buildNuxt, loadNuxtConfig } from "@nuxt/kit";
console.log('modules use ~ @nuxt/kit start...')


export default defineNuxtModule({
  meta: {
    name: 'use'
  },
  defaults: {
    test: 'use test'
  },

  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    console.log('modules use')
    nuxt.hook('modules:done', () => {
      console.log('我的模块已准备就绪，当前测试选项为：', options.test)

      // buildNuxt(nuxt).then(b => {
      //   console.log('buildNuxt', b)
      // }).catch(error => {
      //   console.error('buildNuxt', error)
      // })
    })
    // 将以 Roboto 字体和 Impact 替代字体安装 @nuxtjs/fontaine
    // await installModule('@nuxtjs/fontaine', {
    //   fonts: [
    //     {
    //       family: 'Roboto',
    //       fallbacks: ['Impact'],
    //       fallbackName:'fallback-a'
    //     }
    //   ]
    // })






  }
})

