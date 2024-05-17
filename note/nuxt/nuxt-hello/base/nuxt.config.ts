
console.log(` base nuxt.config.ts `, process.env.NUXT_SERVER_API)

export default defineNuxtConfig({
  // 从 base nuxt.config.ts 扩展！
  app: {
    head: {
      title: '扩展配置很有趣！',
      meta: [
        { name: 'description', content: '我在 nuxt 3 中使用了 extends 功能！' }
      ],
    }
  }
})