

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

## 八 完善$route   

## 九 完善router-view组件  

## 十 完善router-link组件

