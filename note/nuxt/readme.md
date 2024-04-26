
# 安装与运行 node 18.1.0
1. npm install create-nuxt-app -g 
2. pnpm dlx nuxi@latest init <project-name>

# 文章
1. ![从0带您打造企业级 Vue 服务器渲染 Nuxt.js (一) 入门 ](https://juejin.cn/post/6844903830732144648?searchId=20240423103114C1492ED00C0B8C940B13)
2. ![Next.js 创建项目到服务器部署（目录结构介绍、项目结构Demo、开发细节注意）](https://juejin.cn/post/7294290732755763241?searchId=202404231030519377E47020497D9A07FE)

### nuxt 下载请求的服务器域名与其服务器IP映射 C:\Windows\System32\drivers\etc
  185.199.108.133	https://raw.githubusercontent.com
  185.199.109.133	https://raw.githubusercontent.com
  185.199.110.133	https://raw.githubusercontent.com
  185.199.111.133	https://raw.githubusercontent.com


### SEO 搜索引擎优化
1. 多页面 
2. title 描述 关键词
3. 网站内容 f12查看的时候里面是一个div内容 没有细节内容

*** 解决方案 *** 
#### 1. 预渲染  
  1. 读取配置 获取需要预渲染的页面
  2. 发布机模拟 浏览器环境打开页面 
  3. 页面脚本触发渲染时机
  4. 渲染出当前页面内容
  5. 获取当前所有的DOM结构
  6. 生成HTML文件 

    > 预渲染 vue 插件
    ```c npm install  prerender-spa-plugin -S ```

    // vue.config.js 进行配置 

    ``` 
    *** 预渲染在配置路由时必须一个一个填写 无法配置动态路由 *** 

    > vue 项目中 seo title 描述关键字
    ``` c
    npm install vue-meta-info -S 
    // 在子页面中进行配置

    ```
    > vue 子页面metaInfo配置
    ``` html 
    <template>
      ... 
    </template>

    <script>
    export default {
      metaInfo : {
        title :'seo title' ,
        meta : [
          {
            name :'关键字，web...' ,
            content :'描述内容...'
          }
        ]
      }
    }


    </script>
    ```
  *** 预渲染总结 *** 
  1. 可以打包多页面
  2. 可以解决每个页面单独生成title描述关键词(vue-meta-info)
  3. 接口数据在html生成之前就放在页面上 爬虫可以抓取内容
  4. 无法配置动态路由
  5. vue-meta-info 无法动态配置数据
 
#### 2. 服务端渲染 SSR



### 解决seo的问题 
 1. 前后端不分离
  压力在后端 接口安全
 2. 前后端分离 
  2.1 spa单页面 vue-cli 本身无法处理seo
  2.2 预渲染 一个项目只有部分页面(固定路由)能做seo 也会存在页面空白的情况
  2.3 服务端渲染  压力在服务器 启动了两个服务(后端服务 node服务)



### nuxt 生命周期

![生命周期.png](https://v2.nuxt.com/_nuxt/image/de48ca.svg)

#### 服务端生命周期
  ![nuxt生命周期](https://v2.nuxt.com/docs/concepts/nuxt-lifecycle#nuxt-lifecycle)
  ##### nuxtServerInit
  nuxtServerInit(store,context) {} 
  store       vuex 上下文
  context     nuxt 上下文

  ##### middleware
  middleware 
  *** middleware/auth.js *** 
  ``` javascript 
    export default  function ({store,route,redirect,params,query,req,res}) {
      console.log('middleware')
    }

  ```
  *** 全局调用 *** 
  ``` javascript 

    // 添加 
    router : {
      middleware :'auth' // auth为文件夹下的js文件名
    }
    // 在根目录下添加 middleware/auth.js 文件
  ```
  *** 局部调用(页面内) *** 
  ``` html 
    <template>
      ...
    </template>
    <script>
      export default {
        name : 'IndexPage' ,
        middleware:'auth' // 方式1.局部调用需添加
        middleware () {   // 方式2.

        }
      }
    </script>
  ```
  ##### validate 

  ``` html 
    <template>
      ...
    </template>

    <script>
      export default {
        name : 'page' ,
        validate ({params,query}) {
          console.log('validate')
          return true // 才能返回到正常页面 要不就跑 404 页面
        }
      }
    </script>

  ```

  ##### asyncData（仅页面） fetch （页面 组件）  

  ``` html 
    <template>
      ...
    </template>
    <script>
      export default {
        name :'page' ,
        asyncData ({store,params}) {

        },
        fetch({app,store,params}) {

        }
      }
    </script>
  ```

  #### 服务端和客户端共有的生命周期
  #####  beforeCreate created 和vue相当

### nuxt 路由
  #### 自动生成路由
  ![官方文档 默认配置](https://www.nuxtjs.cn/guide/routing)

  #### vue项目重构 使用原来的 router.js配置
  
  ```sh npm install @nuxtjs/router -S ``` 

  1. *** nuxt.config.js *** 

  2. 修改 nuxt.config.js 
  ``` javascript
  ..., 
    modules : [
      '@nextjs/router'
    ]

  ```
  3. 把router.js文件放入nuxt项目根目录
  *** router.js ***
  > 懒加载代码要进行修改
  > 引用组件页面 要根据情况进行修改
  4. nuxtjs/router返回的内容与vue有所不同
  *** 返回一个方法 *** 
  ``` javascript 
    import  Router from 'vue-router'
    import HomeView from '../views/HomeView.vue'
    import store from '@/store'

    const Error = {
      template: `
        <div class="user">
          <h2>User {{ $route.params.id }}</h2>
          <router-view></router-view>
        </div>
      `,
    }
    console.log(6, HomeView, Error)

    const routes = [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'), // 在nuxt中不能使用 webpack默认的懒加载
      },
      {
        path: '/:pathMatch(.*)',
        name: 'Error',
        component: () => import('../views/Error.vue')
      }
    ]
    export function createRouter () {
      return new Router({
        mode : 'history' ,
        routes 
      })
    }

  ```

### 路由守卫

#### @nuxtjs/router 
*** 要配置 nuxt.config.js router.js文件要在项目根目录下***  
```  javascript 
    import  Router from 'vue-router'
    import HomeView from '../views/HomeView.vue'
    import store from '@/store'

    const Error = {
      template: `
        <div class="user">
          <h2>User {{ $route.params.id }}</h2>
          <router-view></router-view>
        </div>
      `,
    }
    console.log(6, HomeView, Error)

    const routes = [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'), // 在nuxt中不能使用 webpack默认的懒加载
      },
      {
        path: '/:pathMatch(.*)',
        name: 'Error',
        component: () => import('../views/Error.vue') ，
        // 路由守卫 走服务端 无法获得 localStorage cookie token...  
        beforeEnter (to,from,next) {

        }
      }
    ]
    const router = new Router({
      mode : 'history' ,
      routes 
    })

    // 全局守卫
    router.beforeEach((to,from,next)=>{

    })

    export function createRouter () {
      return router
    }

```
*** 无法获得 localStorage cookie token.. 怎么办 *** 

  ``` sh npm i cookie-universal-nuxt -S  ``` 
  ![npm ](https://www.npmjs.com/package/cookie-universal-nuxt)

  nuxt.config.js 添加配置
  ``` javascript 
    ... ,
    modules : [
      'cookie-universal-nuxt'
    ]

  ```

  ``` javascript 
  // https://www.npmjs.com/package/cookie-universal-nuxt
  this.$cookies.set
  this.$cookies.setAll
  this.$cookies.get
  ...

  ``` 


#### nuxtjs默认

  1. 中间件  middleware 

  ##### 全局 
  ***  nuxt.config.js  ***

  ``` javascript 
    ...,
    router : {
      middleware : 'auth'
    }

  ```
  *** 新建 middleware/auth.js *** 

  ``` javascript 
    export default ({store,route,redirect,params,query,req,res}) {
      // 通过route... 进行判断
    }

  ```
  ##### 局部 


  ``` html
    <template>
      ...
    </template>
    <script>
      export default {
        name : 'page' ,
        middleware :'auth' // 使用 middleware/auth.js中的方法 
        middleware () {

        }
      }
    </script>
  ```


  2. 插件    plugins 
  
  *** nuxt.config.js *** 

  ``` javascript 
    ... ,
    plugins : [
      '~/plugins/router.js' 
    ]

  ```
  *** 在项目根目录下新建plugins/router.js ***
  ``` javascript 
  export default ({app}) => {
    app.router.beforeEach((to,from,next)=>{

    })
  } 


  ```










### nuxt head 

#### 默认全局配置

*** nuxt.config.js *** 

``` javascript 
  ...,
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

```
#### 组件局部 

``` javascript 
    export default {
      head () {
        return {
          title :'子路由页面title' ,
          meta : [
            {hid :'description',name : 'description' , content :'子路由页面详细描述'},
            {hid :'keywords',name : 'keywords' , content :'子路由页面关键词'},
          ]
        }
      },
      // 动态方法式
      head() {
        console.log(14, this.$route)
        return {
          title: `${this.title}~${this.$route.params.id || '暂无id'}`,
          meta: [
            {hid : 'description',name :'description',content:`${this.$route.name}页面详细描述`} , 
            {hid : 'keywords',name :'keywords',content:`${this.$route.name}页面详细描述、${this.$route.fullPath}`} , 
          ]
        }
      }
    }

```

### CSS 
1. 全局的在 nuxt.config.js 中进行配置 
2. 局部(组件)内的css 和vue spa单页面一样 可用sass scss less ...

159 023 23239

### plugins 
![官网 plugins](https://www.nuxtjs.cn/api/configuration-plugins)


### modules 
  #### nuxtjs 中使用 axios 

  ##### @nuxtjs/axios
  1. npm install @nuxtjs/axios -S 
  2. 修改配置 nuxt.config.js 
  ``` javascript 
    ... ,
    modules : [
      '@nextjs/axios'
    ]

  ```
  ##### axios 
  1. npm install axios -S 

  ##### asyncData 生命周期 中使用axios 
  *** asyncData 只能在pages路由页面中使用 components中的组件是无法使用的 ***
  
  ``` javascript 
    export default {
      data () {
        return {
          list : []
        }
      } ,
      async asyncData (context) {
        const { data } = axios.get(`接口地址`)
        // 为什么不用this.list 进行赋值 ？
        // 因为这是在组件初始化之前 没有this对象  
        return { 
          list : data.list  
        }
      }
    }

  ```

  ##### fetch 
  *** fetch 在页面(pages/\*\*.vue)、组件(components/\*\*.vue)中都可以使用 *** 
  ![官方文档中以操作vuex为主](https://www.nuxtjs.cn/api/pages-fetch)

  ___ components/\*\*.vue ___
  ``` javascript 
    export default {
      data () {
        return {
          list : []
        }
      },
      async fetch () {
        // 这里可以用this 
        const res = await this.$axios.get(`接口地址`)
        this.list = res.data 
      }
    }


  ```






### nuxt 配置代理

1. npm install @nuxtjs/axios @nuxtjs/proxy -S 

2. nuxt.config.js  

``` javascript 
  ... ,
  modules : [
    '@nuxtjs/axios' ,
    '@nuxtjs/proxy'
  ],
  axios : {
    proxy : true ,
    retry : { retries : 3} ,
    baseUrl : process.env._ENV == 'production' ? '正式地址' :'开发地址'
  },
  proxy : {
    '/api' : {
      target : `http://${接口地址}`,
      pathRewrite : {
        '^/api' : ''
      }
    }
  }

``` 
3. 页面文件

``` html 
<template>
  <div></div>
</template>
<script>
  export default {
    name : 'IndexPage' ,
    data () {
      return {
        list
      }
    } ,
    async asyncData ({$axios}) {
      const res = await $axios.get('接口地址')
      return {
        list : res.data 
      }
    }
  }
</script>
```













### 路由守卫
### 路由守卫
### 路由守卫
### 路由守卫
