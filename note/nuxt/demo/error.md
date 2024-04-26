1. **_ nuxt2 引入 three.js 页面刷新报错问题：require() of ES Module _**
   ![csdn](https://blog.csdn.net/Bloom_c/article/details/129147104)
   问题所在:
   这与 nuxtjs 构建系统有关。使用第三方库时，应该将它们添加到 **_ nuxt.config.js build.transpile _** 数组中，以便它可以作为 babel 的依赖项包含在内。
