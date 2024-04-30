

## 安装下载 nuxtjs
``` npx create-nuxt-app ``
*** 下载的时候最好不安装vue项目里的第三方模块 边做边安装*** 

## 配置路由
  ### 下载 
  ``` npm install @nuxtjs/router -S `` 
  ### nuxtjs.config.js 配置
  ``` javascript 
    ... ,
    module : [
      '@nuxtjs/router'
    ]

  ```
  ### spa中的router拷贝到nuxt项目中

  ### 修改 router.js文件

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

## 请求接口

  ### 跨域 安装axios  https://axios.nuxtjs.org/helpers
  ``` npm install @nuxtjs/axios @nuxtjs/proxy `` 
  nuxt.config.js 
  ``` javascript 
    ... ,
    modules : [
      '@nuxtjs/router' ,
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
    ],
    axios : {
      baseURL : '' 
    },
    proxy : {
      '/api' : {
        ...options
      }
    }

  ```

  ### axios 二次封装
  nuxt.config.js 
  ``` javascript 
  ... ,
    plugins : [
      '~/plugins/axios' ,
      '~/api/index'
    ],
    modules : [
      '@nuxtjs/router' ,
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
    ],
    axios : {
      baseURL : '' 
    },
    proxy : {
      '/api' : {
        ...options
      }
    }
  ```

  api/index.js
  ``` javascript 
  export default ({ app, $axios }, inject) => {
    // console.log('api', app, $axios, inject)
    /*
      单页面 api 
      export function apiGet (id) {
        return request({
          url : 'api地址',
          method : 'get' ,
          params : {id}
        })
      }
      
      nuxtjs 
      inject('apiGet',(id) => $axios({
          url : 'api地址',
          method : 'get' ,
          params : {id}
      }))
          
      在页面组件中通过 this.$apiGet()
    */
    inject('apiGet', () => {
      console.log('api get')
    })
    inject('apiPost', () => {
      console.log('api post')
    })

    inject('apiUser', () => ({
      add: () => console.log('api user add '),
      del: () => console.log('api user del '),
      update: () => console.log('api user update '),
    }))

    inject('apiMap', {
      add: () => console.log('api map add '),
      del: () => console.log('api map del '),
      update: () => console.log('api map update '),
    })
  }

  ```
  页面调用
  ``` javascript  
  var apiUser 
  export default {
    name: 'login',
    mounted() {
      apiUser = this.$apiUser()
    },
    methods: {
      ...mapMutations(['setToken']),
      login() {
        let data = qs.stringify({
          username: 'test',
          password:'admin123' 
        })
        this.$axios({
          url: '/api/login',
          method: 'post',
          data
        }).then(res => {
          console.log(23, this, res)
          this.$apiGet()
          apiUser && apiUser.add()
          // this.setToken(res.data.id)
          this.$store.commit('setToken', res.token)
          this.$router.push({path:'/'})
        })
      }
    }
  }

  ```



## Vuex 引入 

  ###   




##  

  ### 



##  

  ###   