
# Vue-router 3 

![手写Vue-router核心原理，再也不怕面试官问我Vue-router原理 ](https://juejin.cn/post/6854573222231605256?searchId=20240411102252ABD50B24164C32FA27EF)

## 一 核心原理 
1. 什么是前端路由
  在web前端单面应用SPA(Single Page Application)中，路由描述的是URL 与 UI之间的映射关系 这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）
  ##### hash 实现
    hash 是 URL 中 hash (#) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 hash 部分不会引起页面刷新
    通过 hashchange 事件监听 URL 的变化，改变 URL 的方式只有这几种：

    1. 通过浏览器前进后退改变 URL
    2. 通过<a>标签改变 URL
    3. 通过window.location改变URL 
  ##### history 实现  
    history 提供了 pushState 和 replaceState 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新
    history 提供类似 hashchange 事件的 popstate 事件，但 popstate 事件有些不同：
    1. 通过浏览器前进后退改变 URL 时会触发 popstate 事件
    2. 通过pushState/replaceState或<a>标签改变 URL 不会触发 popstate 事件。
    3. 好在我们可以拦截 pushState/replaceState的调用和<a>标签的点击事件来检测 URL 变化
    4. 通过js 调用history的back，go，forward方法课触发该事件

## 二 原生js实现前端路由

##### hash 实现

``` html 
<!DOCTYPE html>
<html lang='en'>
    <head>
      <title> hash </title>
    </head>
    <body>
      <ul>
        <li><a href='#/home'>home</a></li>
        <li><a href='#/about'>about</a></li>
      </ul>
      <div id='routerView'></div>
    </body>
    <script>
      let v = document.getElementById('routerView') 

      window.addEventListener('hashchange',()=>{
        let hash = location.hash 
        console.log(4,hash)
        v.innerHTML = hash
      })
      window.addEventListener('DOMContentLoaded',()=>{
        console.log(8,location)
        if(!location.hash) {
          location.hash = '/'
        }else {
          v.innerHTML = location.hash
        }
      })
    </script>
</html>

```
*** 解释下上面代码，其实很简单：***
  1. 我们通过a标签的href属性来改变URL的hash值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入window.location赋值来改变hash）
  2. 我们监听hashchange事件。一旦事件触发，就改变routerView的内容，若是在vue中，这改变的应当是router-view这个组件的内容
  3. 为何又监听了load事件？这时应为页面第一次加载完不会触发 hashchange，因而用load事件来监听hash值，再将视图渲染成对应的内容。


##### history 实现

``` html 
<!DOCTYPE html>
<html lang='en'>
    <head>
      <title> hash </title>
    </head>
    <body>
      <ul>
        <li><a href='#/home'>home</a></li>
        <li><a href='#/about'>about</a></li>
      </ul>
      <div id='routerView'></div>
    </body>
    <script>
      let v = document.getElementById('routerView') 

      window.addEventListener('popstate',()=>{
          v.innerHTML = location.pathname
      })

      window.addEventListener('DOMContentLoaded',()=>{
          console.log(22,location)
          v.innerHTML = location.pathname 
          document.querySelectorAll('a').forEach(el=>{
              el.addEventListener('click',function (e) {
                  e.preventDefault()
                  history.pushState(null,'',el.getAttribute('href'))
                  v.innerHTML = location.pathname
              })
          })
      })
    </script>
</html>

```
*** 解释下上面代码，其实也差不多：***

1. 我们通过a标签的href属性来改变URL的path值（当然，你触发浏览器的前进后退按钮也可以，或者在控制台输入history.go,back,forward赋值来触发popState事件）。这里需要注意的就是，当改变path值时，默认会触发页面的跳转，所以需要拦截 <a> 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
2. 我们监听popState事件。一旦事件触发，就改变routerView的内容。
3. load事件则是一样的


## 三 基于vue实现VueRouter 

*** App.vue *** 
``` html 
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


```
*** router/index.js *** 
``` javascript 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
Vue.use(VueRouter)
  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
const router = new VueRouter({
  mode:"history",
  routes
})
export default router

```

*** Home.vue *** 
``` html 
<template>
  <div class="home">
    <h1>这是Home组件</h1>
  </div>
</template>

```
*** Home.vue *** 
``` html 
<template>
  <div class="about">
    <h1>这是about组件</h1>
  </div>
</template>

```

*** 来自 note vue/version *** 
``` javascript 

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { reject: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
console.log(26, import.meta, process.env, process.env.VUE_APP_NODE_ENV)

function checkVersion() {
  return new Promise((resolve, reject) => {
    fetch('/version.json')

      .then(res => res.json())
      .then(res => {
        console.log(res.version, window?.appInfo?.version)
        resolve(res.version === window?.appInfo?.version && res.buildTime === window?.appInfo?.buildTime)
      })
      .catch(err => {
        reject(err)
      })
  })
}
console.log(40, store)
router.beforeEach(async (to, from, next) => {
  console.log(43, process.env.NODE_ENV === 'development', !store.state.appVersionChecked)
  if (process.env.NODE_ENV === 'development' && !store.state.appVersionChecked) {
    const check = await checkVersion()
    console.log(43, check)
    if (!check) {
      let c = window.confirm('发现版本有更新')
      if (c) {
        window.location.reload()
      } else {
        console.log('取消')
      }
      store.commit('changeAppVersionChecked')
    }
  }
  next()
})

export default router


```

## 四 剖析VueRouter本质 
先抛出个问题，Vue项目中是怎么引入VueRouter。

1. 安装VueRouter，再通过import VueRouter from 'vue-router'引入
2. 先 const router = new VueRouter({...}),再把router作为参数的一个属性值，new Vue({router})
3. 通过Vue.use(VueRouter) 使得每个组件都可以拥有store实例

从这个引入过程我们可以发现什么？

1. 我们是通过new VueRouter({...})获得一个router实例，也就是说，我们引入的VueRouter其实是一个类。

所以我们可以初步假设
``` javascript 

var Vue = null 


class VueRouter{
  constructor (options) {
    this.mode = options.mode || 'hash' 
    this.routes = options.routes || [] 
    /**
      const routes = [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          component: About
        }
      ]
     */
    this.routesMap = this.createMap(this.routes)
  }

  createMap(routes) {
    return routes.reduce((pre,current) => {
      pre[current.path] = current.component 
      return pre
    },{})
  }
}
VueRouter.install = function (v) {
    Vue = v 
    Vue.mixin({
      beforeCreate () {
        // 如果是根组件
        if(this.$options && this.$options.router){
          this._root = this 
          this._router = this.$options.router
        // 如果是子组件
        }else {
          this._root = this.$parent && this.$parent._root 
        }
        Object.defineProperty(this,'$router',{
          get () {
            return this._root._router
          }
        })
      }
    })



}

export default VueRouter


```

## 五 分析Vue.use  

## 六 完善install方法  

## 七 完善VueRouter类  

``` javascript 

var Vue = null 

class HistoryRoute {
  constructor() {
    this.current = null 
  }
}

class VueRouter{
  constructor (options) {
    this.mode = options.mode || 'hash' 
    this.routes = options.routes || [] 
    /**
      const routes = [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          component: About
        }
      ]
     */
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
  }

  createMap(routes) {
    return routes.reduce((pre,current) => {
      pre[current.path] = current.component 
      return pre
    },{})
  }

  init () {
    if(this.mode === 'hash') {
      // 先判断用户打开时有没有hash值 没有的话跳转#/
      location.hash ? '' :location.hash = '/' 
      window.addEventListener('load',()=>{
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1)
      })

    }else {
      location.pathname ? '' : location.pathname ='/' 
      window.addEventListener('load',()=>{
        this.history.current = location.pathname
      })
      window.addEventListener('popstate',()=>{
        this.history.current = location.pathname
      })
    }
  }
}
VueRouter.install = function (v) {
    Vue = v 
    Vue.mixin({
      beforeCreate () {
        // 如果是根组件
        if(this.$options && this.$options.router){
          this._root = this 
          this._router = this.$options.router
        // 如果是子组件
        }else {
          this._root = this.$parent && this.$parent._root 
        }
        Object.defineProperty(this,'$router',{
          get () {
            return this._root._router
          }
        })
      }
    })



}

export default VueRouter


```

## 八 完善$route 
要先实现VueRouter的history.current的时候，才能获得当前的路径，而现在已经实现了，那么就可以着手实现$route了

``` javascript 


var Vue = null 

class HistoryRoute {
  constructor() {
    this.current = null 
  }
}

class VueRouter{
  constructor (options) {
    this.mode = options.mode || 'hash' 
    this.routes = options.routes || [] 
    /**
      const routes = [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          component: About
        }
      ]
     */
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
  }

  createMap(routes) {
    return routes.reduce((pre,current) => {
      pre[current.path] = current.component 
      return pre
    },{})
  }

  init () {
    if(this.mode === 'hash') {
      // 先判断用户打开时有没有hash值 没有的话跳转#/
      location.hash ? '' :location.hash = '/' 
      window.addEventListener('load',()=>{
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1)
      })

    }else {
      location.pathname ? '' : location.pathname ='/' 
      window.addEventListener('load',()=>{
        this.history.current = location.pathname
      })
      window.addEventListener('popstate',()=>{
        this.history.current = location.pathname
      })
    }
  }
}
VueRouter.install = function (v) {
    Vue = v 
    Vue.mixin({
      beforeCreate () {
        // 如果是根组件
        if(this.$options && this.$options.router){
          this._root = this 
          this._router = this.$options.router
        // 如果是子组件
        }else {
          this._root = this.$parent && this.$parent._root 
        }
        Object.defineProperty(this,'$router',{
          get () {
            return this._root._router
          }
        })
        Object.defineProperty(this,'$route',{
          get () {
            return this._root._router.history.current
          }
        })
      }
    })
    

     Vue.component('router-link',{
        render(h){
            return h('a',{},'首页')
        }
    })
    Vue.component('router-view',{
        render(h){
            return h('h1',{},'首页视图')
        }
    })

}

export default VueRouter


```

## 九 完善router-view组件  

``` javascript 
  Vue.component('router-view',{
    render(h) {
      let current = this._self._root._router.history.current 
      let routeMap = this._self._root._router.routesMap 
      return h(routeMap[current])
    }
  })

```
render函数里的this指向的是一个Proxy代理对象，代理Vue组件，而我们前面讲到每个组件都有一个_root属性指向根组件，根组件上有_router这个路由实例。
所以我们可以从router实例上获得路由表，也可以获得当前路径。
然后再把获得的组件放到h()里进行渲染。
现在已经实现了router-view组件的渲染，但是有一个问题，就是你改变路径，视图是没有重新渲染的，所以需要将_router.history进行响应式化。

![Vue.util.defineReactive](https://www.kancloud.cn/diaoyundexia/text/181108)
> defineReactive:定义一个对象的响应属性（core/observer/index.js）
```code 
usage:
  Vue.util.defineReactive(obj,key,value,fn)
  obj: 目标对象，
  key: 目标对象属性；
  value: 属性值
  fn: 只在node调试环境下set时调用

```

``` javascript 

Vue.mixin({
  beforeCreate () {
    // 如果是根组件
    if(this.$options && this.$options.router) {
      this._root = this 
      this._router = this.$options.router 
      // 新增
      Vue.util.defineReactive(this,'xxx',this._router.history)
    }else {
      this._root = this.$parent && this.$parent._root
    }

    Object.defineProperty(this,'$router',{
      get () {
        return this._root._router
      }
    })
    Object.defineProperty(this,'$route',{
      get () {
        return this._root._router.history.current
      }
    })
  }
})


```
我们利用了Vue提供的API：defineReactive，使得this._router.history对象得到监听。
因此当我们第一次渲染router-view这个组件的时候，会获取到this._router.history这个对象，从而就会被监听到获取this._router.history。就会把router-view组件的依赖wacther收集到this._router.history对应的收集器dep中，因此this._router.history每次改变的时候。this._router.history对应的收集器dep就会通知router-view的组件依赖的wacther执行update()，从而使得router-view重新渲染（其实这就是vue响应式的内部原理）
 
## 十 完善router-link组件

``` javascript 

Vue.component('router-link',{
  props : {
    to :{
      type : String 
    }
  },
  render (h) {
    let mode = this._self._root._router.mode 
    let to = mode === 'hash' ? '#' + this.to : this.to 
    return h('a',{attrs:{href:to}},this.$slots.default)
  }
})

```

## 完整代码 

``` javascript 

let Vue = null 

class HistoryRoute {
  constructor () {
    this.current = null 
  }
}

class VueRouter {
  constructor (options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || [] 
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute()
    this.init()
  }

  init () {
    if(this.mode ==='hash') {
      location.hash ? '' : location.hash ='/'
      window.addEventListener('load',()=>{
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1)
      })
    }else {
      location.pathname ? '' : location.pathname = '/'
      window.addEventListener('load',()=>{
        this.history.current = location.pathname
      })
      window.addEventListener('popstate',()=>{
        this.history.current = location.pathname
      })
    }
  }

  createMap (routes) {
    return routes.reduce((pre,current)=>{
      pre[current.path] = current.component 
      return pre
    },{})
  }
}

VueRouter.install = function (V) {
  Vue = v 
  Vue.mixin({
    beforeCreate () {
      // 根组件
      if(this.$options && this.$options.router) {
        this._root = this 
        this._router = this.$options.router 
        Vue.util.defineReactive(this,'xxx',this._router.history)
      }else {
        this._root = this.$parent && this.$parent._root 
      }
      Object.defineProperty(this,'$router',{
        get () {
          return this._root._router
        }
      })

      Object.defineProperty(this,'$route',{
        get () {
          return this._root._router.history.current
        }
      })
    }
  })

  Vue.component('router-link',{
    props : {
      to:String 
    },
    render (h) {
      let mode = this._self._root.router.mode 
      let to = mode === 'hash' ? '#'+this.to : this.to 
      return h('a',{attrs:{href:to}},this.$slots.default)
    }
  })

  Vue.component('router-view',{
    render () {
      let current = this._self._root._router.history.current 
      let routeMap = this._self._root._router.routesMap 
      return h(routeMap[current])
    }
  })

}

```


# Vue-router 4 
![vue router 4 掘金](https://juejin.cn/post/7144890513143889950?searchId=202404121127105EC77814E2A5A77F3288)

## vue router 4 源码篇：路由诞生——createRouter原理探索

### createRouter 

#### 使用场景
``` javascript 
import Vue from 'vue' 
import { createRouter , createWebHistory } from 'vue-router' 
// 创建 挂载
const routes = [
  { path:'/',component:{template:`<div>Home</div>`}} , 
  { path:'/about',component:{template:`<div>About</div>`}} , 
]

const router = createRouter({
  history : createWebHistory() ,
  routes
})

const app = Vue.createApp({})

app.use(router) 

app.mount('#app')

// 组件内使用
import { useRouter } from 'vue-router' 
const router = useRouter() 
console.log(router.currentRoute) 
router.back() 
// ... 
```
#### 函数定义
我们可以在 *** packages/router/rollup.config.js *** 找到vue-router的入口文件 __src/index.ts__，这个文件中把我们能想到的功能函数、hooks都export出去了，当然也包含了 __createRouter__。
按图索骥，***createRouter***方法的定义在 __packages/router/src/router.ts__ 中 ，逻辑代码有901行，但做的事情比较简单，所以要看懂也不难，等下我们再细述逻辑。

``` typescript 
export interface Router {
  // 当前路由
  readonly currentRoute: Ref<RouteLocationNormalizedLoaded>
  // 路由配置项
  readonly options: RouterOptions
  // 是否监听
  listening: boolean
  // 添加路由
  addRoute(parentName: RouteRecordName, route: RouteRecordRaw): () => void
  addRoute(route: RouteRecordRaw): () => void
  // 删除路由
  removeRoute(name: RouteRecordName): void
  // 是否存在路由name=xxx
  hasRoute(name: RouteRecordName): boolean
  // 获取所有路由matcher
  getRoutes(): RouteRecord[]
  // 返回路由地址的标准化版本
  resolve(
    to: RouteLocationRaw,
    currentLocation?: RouteLocationNormalizedLoaded
  ): RouteLocation & { href: string }
  // 路由push跳转
  push(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
  // 路由replace跳转
  replace(to: RouteLocationRaw): Promise<NavigationFailure | void | undefined>
  // 路由回退
  back(): ReturnType<Router['go']>
  // 路由前进
  forward(): ReturnType<Router['go']>
  // 路由跳页
  go(delta: number): void
  // 全局导航守卫
  beforeEach(guard: NavigationGuardWithThis<undefined>): () => void
  beforeResolve(guard: NavigationGuardWithThis<undefined>): () => void
  afterEach(guard: NavigationHookAfter): () => void
  // 路由错误处理
  onError(handler: _ErrorHandler): () => void
  // 路由器是否完成初始化导航
  isReady(): Promise<void>
  // vue2.x版本路由安装方法
  install(app: App): void
}


```
#### 实现流程图

![流程图.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eca8371964ed46a4b7de6fd2766e720a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)


#### createRouterMatcher
***createRouter*** 方法的第一步就是根据传进来的路由配置列表，为每项创建matcher。这里的matcher可以理解成一个路由页面的匹配器，包含了对路由所有信息和常规操作方法。但它与我们通过 __getRoutes__ 获取的路由对象不一样，路由对象只是它的一个子集，存储在 __matcher__ 的record字段中。

##### 最终输出 
*** createRouterMatcher *** 执行完后，会返回的5个函数 __{ addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }__ ，为后续的路由创建提供帮助。这些函数的作用，无非就是围绕着上面说到的 __matcher__ 增删改查操作，例如，__getRoutes__ 用于返回所有matcher，__removeRoute__ 则是删除某个指定的matcher。。。 

*** router/src/matcher/index *** 
```javascript 
// createRouterMatcher
 export function createRouterMatcher(
  routes: Readonly<RouteRecordRaw[]>,
  globalOptions: PathParserOptions
): RouterMatcher {
  // normalized ordered array of matchers
  const matchers: RouteRecordMatcher[] = []
  const matcherMap = new Map<RouteRecordName, RouteRecordMatcher>()
  globalOptions = mergeOptions(
    { strict: false, end: true, sensitive: false } as PathParserOptions,
    globalOptions
  )

  function getRecordMatcher(name: RouteRecordName) {
    return matcherMap.get(name)
  }

  function addRoute(
    record: RouteRecordRaw,
    parent?: RouteRecordMatcher,
    originalRecord?: RouteRecordMatcher
  ) {
    // used later on to remove by name
    const isRootAdd = !originalRecord
    const mainNormalizedRecord = normalizeRouteRecord(record)
    if (__DEV__) {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent)
    }
    // we might be the child of an alias
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record
    const options: PathParserOptions = mergeOptions(globalOptions, record)
    // generate an array of records to correctly handle aliases
    const normalizedRecords: (typeof mainNormalizedRecord)[] = [
      mainNormalizedRecord,
    ]
    if ('alias' in record) {
      const aliases =
        typeof record.alias === 'string' ? [record.alias] : record.alias!
      for (const alias of aliases) {
        normalizedRecords.push(
          assign({}, mainNormalizedRecord, {
            // this allows us to hold a copy of the `components` option
            // so that async components cache is hold on the original record
            components: originalRecord
              ? originalRecord.record.components
              : mainNormalizedRecord.components,
            path: alias,
            // we might be the child of an alias
            aliasOf: originalRecord
              ? originalRecord.record
              : mainNormalizedRecord,
            // the aliases are always of the same kind as the original since they
            // are defined on the same record
          }) as typeof mainNormalizedRecord
        )
      }
    }

    let matcher: RouteRecordMatcher
    let originalMatcher: RouteRecordMatcher | undefined

    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord
      // Build up the path for nested routes if the child isn't an absolute
      // route. Only add the / delimiter if the child path isn't empty and if the
      // parent path doesn't have a trailing slash
      if (parent && path[0] !== '/') {
        const parentPath = parent.record.path
        const connectingSlash =
          parentPath[parentPath.length - 1] === '/' ? '' : '/'
        normalizedRecord.path =
          parent.record.path + (path && connectingSlash + path)
      }

      if (__DEV__ && normalizedRecord.path === '*') {
        throw new Error(
          'Catch all routes ("*") must now be defined using a param with a custom regexp.\n' +
            'See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.'
        )
      }

      // create the object beforehand, so it can be passed to children
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options)

      if (__DEV__ && parent && path[0] === '/')
        checkMissingParamsInAbsolutePath(matcher, parent)

      // if we are an alias we must tell the original record that we exist,
      // so we can be removed
      if (originalRecord) {
        originalRecord.alias.push(matcher)
        if (__DEV__) {
          checkSameParams(originalRecord, matcher)
        }
      } else {
        // otherwise, the first record is the original and others are aliases
        originalMatcher = originalMatcher || matcher
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher)

        // remove the route if named and only for the top record (avoid in nested calls)
        // this works because the original record is the first one
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name)
      }

      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children
        for (let i = 0; i < children.length; i++) {
          addRoute(
            children[i],
            matcher,
            originalRecord && originalRecord.children[i]
          )
        }
      }

      // if there was no original record, then the first one was not an alias and all
      // other aliases (if any) need to reference this record when adding children
      originalRecord = originalRecord || matcher

      // TODO: add normalized records for more flexibility
      // if (parent && isAliasRecord(originalRecord)) {
      //   parent.children.push(originalRecord)
      // }

      // Avoid adding a record that doesn't display anything. This allows passing through records without a component to
      // not be reached and pass through the catch all route
      if (
        (matcher.record.components &&
          Object.keys(matcher.record.components).length) ||
        matcher.record.name ||
        matcher.record.redirect
      ) {
        insertMatcher(matcher)
      }
    }

    return originalMatcher
      ? () => {
          // since other matchers are aliases, they should be removed by the original matcher
          removeRoute(originalMatcher!)
        }
      : noop
  }

  function removeRoute(matcherRef: RouteRecordName | RouteRecordMatcher) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef)
      if (matcher) {
        matcherMap.delete(matcherRef)
        matchers.splice(matchers.indexOf(matcher), 1)
        matcher.children.forEach(removeRoute)
        matcher.alias.forEach(removeRoute)
      }
    } else {
      const index = matchers.indexOf(matcherRef)
      if (index > -1) {
        matchers.splice(index, 1)
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name)
        matcherRef.children.forEach(removeRoute)
        matcherRef.alias.forEach(removeRoute)
      }
    }
  }

  function getRoutes() {
    return matchers
  }

  function insertMatcher(matcher: RouteRecordMatcher) {
    let i = 0
    while (
      i < matchers.length &&
      comparePathParserScore(matcher, matchers[i]) >= 0 &&
      // Adding children with empty path should still appear before the parent
      // https://github.com/vuejs/router/issues/1124
      (matcher.record.path !== matchers[i].record.path ||
        !isRecordChildOf(matcher, matchers[i]))
    )
      i++
    matchers.splice(i, 0, matcher)
    // only add the original record to the name map
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher)
  }

  function resolve(
    location: Readonly<MatcherLocationRaw>,
    currentLocation: Readonly<MatcherLocation>
  ): MatcherLocation {
    let matcher: RouteRecordMatcher | undefined
    let params: PathParams = {}
    let path: MatcherLocation['path']
    let name: MatcherLocation['name']

    if ('name' in location && location.name) {
      matcher = matcherMap.get(location.name)

      if (!matcher)
        throw createRouterError<MatcherError>(ErrorTypes.MATCHER_NOT_FOUND, {
          location,
        })

      // warn if the user is passing invalid params so they can debug it better when they get removed
      if (__DEV__) {
        const invalidParams: string[] = Object.keys(
          location.params || {}
        ).filter(paramName => !matcher!.keys.find(k => k.name === paramName))

        if (invalidParams.length) {
          warn(
            `Discarded invalid param(s) "${invalidParams.join(
              '", "'
            )}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`
          )
        }
      }

      name = matcher.record.name
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter(k => !k.optional).map(k => k.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location.params &&
          paramsFromLocation(
            location.params,
            matcher.keys.map(k => k.name)
          )
      )
      // throws if cannot be stringified
      path = matcher.stringify(params)
    } else if ('path' in location) {
      // no need to resolve the path with the matcher as it was provided
      // this also allows the user to control the encoding
      path = location.path

      if (__DEV__ && !path.startsWith('/')) {
        warn(
          `The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`
        )
      }

      matcher = matchers.find(m => m.re.test(path))
      // matcher should have a value after the loop

      if (matcher) {
        // we know the matcher works because we tested the regexp
        params = matcher.parse(path)!
        name = matcher.record.name
      }
      // location is a relative path
    } else {
      // match by name or path of current route
      matcher = currentLocation.name
        ? matcherMap.get(currentLocation.name)
        : matchers.find(m => m.re.test(currentLocation.path))
      if (!matcher)
        throw createRouterError<MatcherError>(ErrorTypes.MATCHER_NOT_FOUND, {
          location,
          currentLocation,
        })
      name = matcher.record.name
      // since we are navigating to the same location, we don't need to pick the
      // params like when `name` is provided
      params = assign({}, currentLocation.params, location.params)
      path = matcher.stringify(params)
    }

    const matched: MatcherLocation['matched'] = []
    let parentMatcher: RouteRecordMatcher | undefined = matcher
    while (parentMatcher) {
      // reversed order so parents are at the beginning

      matched.unshift(parentMatcher.record)
      parentMatcher = parentMatcher.parent
    }

    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched),
    }
  }

  // add initial routes
  routes.forEach(route => addRoute(route))

  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher }
}

```

##### createRouterMatcher处理流程

![createRouterMatcher处理流程.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f5eaf8753f94f35867083206cdc4d2f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

##### addRoute处理流程

![addRoute处理流程.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28d22c4664594777a39a3bcbd3685dfe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![打印信息.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/918c21d72364482b9bb8e0a86ca00fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

#### 导航守卫相关处理
在执行完 *** createRouterMatcher *** 后就是初始化几个导航守卫,守卫有三种
+ beforeEach 在任何导航之前执行
+ beforeResolve 在导航解析之前执行
+ afterEach 在任何导航之后执行

*** router/src/router.ts *** 
``` typescript 
export function createRouter(options:RouterOptions):Router {
  const matcher = createRouterMatcher(options.routes,options) 
  const parseQuery = options.parseQuery || originalParseQuery 
  const stringifyQuery = options.stringifyQuery || originalStringifyQuery 
  const routerHistory = options.history 

  const beforeGuards = useCallbacks<NavigationGuardWithThis<undefined>>()
  const beforeResolveGuards = useCallbacks<NavigationGuardWithThis<undefined>>()
  const afterGuards = useCallbacks<NavigationHookAfter>() 
  const currentRoute = shallowRef<RouteLocationNormalizedLoaded>(START_LOCATION_NORMALIZED)
  let pendingLocation: RouteLocation = START_LOCATION_NORMALIZED

  // ....
  const router: Router = {
    // ...
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
  }
  return router
}

```
*** router/src/utils/callbacks useCallbacks *** 
```typescript 
export function useCallbacks <T> () {
  let handlers:T[] = [] 
  function add(handler:T):() => void {
    handlers.push(handler) 
    return () => {
      const i = handlers.indexOf(handler) 
      if(i > -1 ) handlers.splice(i,1)
    }
  }
  function reset () {
    handlers = [] 
  }

  return {
    add , 
    list : () => handlers ,
    reset 
  }

}

```

#### 内置方法 

##### matcher 相关

``` typescript 

function addRoute (parentOrRoute:RouteRecordName | RouteRecordRaw , route?:RouteRecordRaw) {
  let parent : Parameters<typeof matcher['addRoute']>[1] | undefined 
  let record : RouteRecordRaw 

  if(isRouteName(parentOrRoute)) {
    parent = matcher.getRecordMatcher(parentOrRoute) 
    record = route!
  }else {
    record = parentOrRoute
  }
  return matcher.addRoute(record,parent)
}

function removeRoute (name : RouteRecordName) {
  const recordMatcher = matcher.getRecordMatcher(name)
  if(recordMatcher){
    matcher.removeRouter(recordMatcher)
  }
}

function getRoutes () {
  return matcher.getRoutes().map(r=>r.record)
}

function hasRoute (name:RouterRecordNamer):boolean {
  return !!matcher.getRecordMatcher(name)
}

```

##### path 相关


##### 导航守卫相关

##### onError

##### install 












### createRouter 

#### 使用场景


### createRouter 

#### 使用场景

### createRouter 

#### 使用场景



### createRouter 

#### 使用场景

### createRouter 

#### 使用场景


### createRouter 

#### 使用场景

### createRouter 

#### 使用场景

