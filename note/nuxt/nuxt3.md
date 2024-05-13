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

## nuxt.config.js的常用配置 
[!nuxt.config.js的常用配置](https://juejin.cn/post/7065490182979452964)

#### css 

``` typescript 
  ...,
  css : [
    'assets/scss/all.scss'
  ]
```

#### dev

``` json

"script" : {
  "dev":"cross-env NODE_ENV=development nuxt" ,
  "test":"cross-env NODE_ENV=test nuxt" ,
  "prod":"cross-env NODE_ENV=production nuxt" ,
  "build":"cross-env NODE_ENV=production nuxt build --dotenv .env.production" ,
  "start":"cross-env NODE_ENV=production nuxt --dotenv .env.production",
  "generate":"cross-env NODE_ENV=production nuxt generate"
}

```
#### env 

``` javascript 
env : {
  NODE_ENV : process.env.NODE_ENV , 
  VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL,
  VUE_APP_BASE_PORT: process.env.VUE_APP_BASE_PORT
}

```
#### generate: 配置生成静态站点的具体方法

#### head 

``` javascript 
head : {
  title :'name' ,
  htmlAttrs : {
    lang :'zh-CN' 
  },
  meta : [
    {charset : 'utf-8'} ,
    {name:'viewport',content:'width=device-width,initial-scale=1,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,shrink-to-fit=no'},
    {hid:'description',name:'description',content:''}
  ],
  link : [
    {rel:'icon',type:'image/x-icon',href:'/favicon.ico'},
    {rel:'stylesheet',type:'text/css',href:'/xxx.css'}
  ],
  script : [
    {src:'/***.js'}
  ]
}

```
#### loading 

``` javascript
 // 默认为顶部的进度条，可修改颜色
  // loading: {
  //   color: rgb(112, 79, 160)
  // },
  // 自定义进度条样式，引入组件即可
  loading: '~/components/common/loading.vue',

```
