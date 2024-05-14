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
#### modules 
> 用于扩展模块，模块的引入是按照顺序执行的，官方也提供了数十个生产模块，下面示例中，引用了多个模块

#### nuxt-precompress  
>用于压缩静态资源，可配置gzip压缩和brotli压缩，配置方法具体查看webpack官网；ng也支持配置该项，但ng的brotli需要另外下载插件，较为麻烦

#### proxy 用于配置跨域

#### axios 用于发出http请求

#### @nuxt/style-resouces 
> 用于替换vue-cli2/3下使用的sass-resources-loader，用于全局引入scss变量，不需要在页面中单独引入

``` javascript 

... ,
modules : [
  // 配置压缩代码
  'nuxt-precompress' ,
  '@nuxtjs/proxy',
  // https://go.nuxtjs.dev/axios
  '@nuxtjs/axios' ,
  'nuxtjs/style-resources'
] ,
// 用于注册sass全局变量
styleResources : {
  scss :'~/static/css/common.scss'
},
// 代码压缩配置 也可以在nginx中配置
nuxtPrecompress : {
  enabled : true ,
  report : false ,
  text :/\.(js|css|html|txt|xml|svg)$/,

  middleware : {
    enabled : true ,
    enabledStatic : true ,
    encodingsPriority : ['br','gzip']
  },

  gzip : {
    enabled : true ,
    filename : '[path].gz[query]' ,
    threshold : 1.024e4 ,
    minRatio : .8 ,
    compressionOptions : { level : 9}
  },

  brotli : {
    enabled : true ,
    filename :'[path].br[query]' ,
    compressionOptions : {level:11} ,
    threshold : 1.024e4 ,
    minRatio : .8
  }

}

```
#### modulesDir 
> 用于配置路径解析的模块目录，默认为['node_modules']；一般开发过程中不需要更改

#### plugins 
> 用于定义应用实例化之前需要运行的插件；src表示引入文件的路径，ssr表示是否在服务端引入使用，默认为true
*** 把需要引入的插件分为两类，一类是只在客户端运行（该类型的插件一般依赖于windows对象等在服务端不存在的对象）（ssr: false)，一类是客户端+服务端都需要运行的(ssr: true)。 ***

``` javascript 

... ,
plugins : [
  {src :'~/plugins/common.js',ssr:true} , // 全局配置入口 该文件中的配置也在服务端生效
  {src :'~/plugins/commonWithoutSSR.js',ssr : false }, // 全局配置入口 该文件中的配置只在客户端生效
  {src :'~/plugins/initial.css',ssr:true} , // 样式文件
  {src :'~/plugins/lib/util',ssr:true} , //用于注册公共方法
  {src :'~/plugins/lib/protoFun',ssr:true} //用于增加原型方法
]

```

*** 例 common.js *** 
``` javascript 
import Vue from 'vue'  // vue 2
import Cookies from 'js-cookie' 

Vue.prototype.$cookie = Cookies

```
#### server 用于定义服务启动的主机 端口
``` javascript 
// 配置服务启动的端口号和IP访问形式
server :{
  port : '50913' ,
  host : '0.0.0.0'
}

```
#### build 构建配置
``` javascript 
const webpack = require('webpack') 
// 引入代码压缩工具包, 官方文档在：https://www.webpackjs.com/plugins/compression-webpack-plugin/
const CompressionPlugin = require('compression-webpack-plugin')

build : {
  analyse : true , // 对构建后的打包文件启用分析
  plugins : [
    // 配置webpack插件实现代码压缩
    new CompressionPlugin({
      test : /\.(js|html|css)$/, // 匹配文件名
      threshold : 1.024e4 , // 对超过10kb的数据进行压缩
      deleteOriginalAssets : false // 是否删除原文件
    })
  ],
   // 配置分割打包，nuxt自带的，也可以指定用插件包来实现压缩，配置了切片后，在nuxt应用加载时通过控制台可观察到，大文件会被切片成几分来分开加载~（需要配置http2)
  optimization : {
    splitChunks : {
      minSize : 1e4 ,
      maxSize : 2.5e5
    }
  },
  vendor : ['axios'] ,
  transpile:['vue-meditor'],  // md文件编辑器： 去掉这个的话，会报无法引入外部资源的错
  cache : true 
}


```

#### rootDir 配置nuxt.js应用的根目录，一般情况不修改 ![官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.nuxtjs.cn%2Fapi%2Fconfiguration-rootdir)

#### router nuxt框架已自动引入vue-router,无特殊情况不需要修改此配置 ![官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.nuxtjs.cn%2Fapi%2Fconfiguration-router)


### nuxt内存溢出问题
  > nuxt是个基于Vue.js的服务端渲染框架，所需内存消耗会比单纯用vue的大，更容易出现内存溢出问题。
  *** 该问题的解决方法是：项目部署时，服务端需要装pm2，用于当内存不够用时自动重启，释放内存。*** 
### 引入外部插件方法有所不同
  > 因为nuxt是在服务端渲染之后返回给客户端，所以需要考虑下插件运行是否依赖于只存在于客户端的对象，如windows对象；
  *** 若遇到这种情况，开发过程中要分类好，不同环境加载不同的包，且特殊的插件在打包时需要配置构建参数。 ***
  *** 如 vue-meditor md编辑器的引入方法 *** 
  ``` javascript 
    export default {
      build : {
        vendor:['axios'] ,
        transpile : ['vue-meditor']
      }
    }
  
  ```
### nuxt生命周期
> 有时候执行了两次：很诡异的问题，当时页面中用了v-if
*** 换成v-show之后就不会出现该问题了。 *** 


### nuxt.config 环境变量

``` json 

"scripts" : {
  "build":"nuxi build --dotenv .env.production" ,
  "test":"nuxi build --dotenv .env.test" ,
  "dev":"nuxi dev --dotenv .env.development -p 3001" ,
  "generate":"nuxi generate" ,
  "preview":"nuxi preview" ,
  "start" : "node .output/server/index.mjs"
}

// .env.production 
NUXT_API_KEY = https://xxx 
NUXT_PUBLIC_BASE_URL = https://www 

```
*** config 配置 *** 
``` ts 
runtimeConfig : {
  apiKey : process.env.NUXT_API_KEY ,
  public : {
    baseURL : process.env.NUXT_PUBLIC_BASE_URL 
  }
}

```
*** 页面组件中使用 环境变量键只在服务器端可用。runtimeConfig.public中的键也可以在客户端使用。 *** 

``` javascript 

const config = useRuntimeConfig() 
const baseURL = config.public.baseURL

```
### app.config 应用程序配置

``` typescript
export default defineAppConfig({
  title :'Hello Nuxt' ,
  theme : {
    dark : true ,
    colors : {
      primary : '#ff0000'
    } 
  }
})

```
``` typescript 
// setup 
const appConfig = useAppConfig()

```
### runtimeConfig 与 app.config  ![nuxt.api](https://www.nuxt.com.cn/docs/getting-started/configuration)
> 如上所述，runtimeConfig和app.config都用于向应用程序的其余部分公开变量。为了确定应该使用其中之一，以下是一些指导原则：
*** runtimeConfig 需要在构建后使用环境变量指定的私有或公共令牌 *** 
*** app.config 在构建时确定的公共令牌 网站配置（如主题变体、标题）以及不敏感的项目配置 ***

### 外部配置文件
| 名称        | 配置文件                 |  如何配置  |
| ----        | --------------         |  ---------- |
| ![Nitro](https://nitro.unjs.io/) | nitro.config.ts | nuxt.config中 ![nitro](https://www.nuxt.com.cn/docs/api/nuxt-config#nitro) 键 |
|![PostCss](https://postcss.org/)|postcss.config.ts | nuxt.config 中 ![postcss](https://www.nuxt.com.cn/docs/api/nuxt-config#postcss) |
|![Vite](https://vitejs.dev/)| vite.config.ts | nuxt.config 中 ![vite](https://www.nuxt.com.cn/docs/api/nuxt-config#vite) |
|![webpack](https://webpack.js.org/) | webpack.config.ts | nuxt.config 中 ![webpack](https://www.nuxt.com.cn/docs/api/nuxt-config#webpack-1) |

*** 外部配置 *** 

``` typescript 
export default defineNuxtConfig({
  ...,
  vite : {
    vue : {
      customElement : true 
    },
    vueJsx : {
      mergeProps : true 
    }
  },
  webpack : {
    loaders : {
      vue : {
        hotReload : true 
      }
    }
  },
  // 启用实验性 Vue 功能
  vue : {
    defineModel : true ,
    propsDestructure : true 
  }
})


```




