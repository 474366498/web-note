## nuxt.config 配置

``` ts
import { resolve } from 'path' 
export default difineNuxtConfig ({
  alias : {
  "@" : resolve(__dirname,'/')
  },
  css : [
    '~/assets/main.scss' ,    // 需要 npm install sass 
  ],
  // 需要安装 tailwindcss 并进行配置 tailwind.config.js 
  // https://tailwind.nodejs.cn/docs/installation 
  postcss : {
    plugins : {
      tailwindcss : {} ,
      autoprefixer : {}
    }
  }
})
 
```