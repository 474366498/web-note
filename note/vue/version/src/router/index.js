import * as MinRouter from '../min-router'
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

console.log(22, MinRouter)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const _router = MinRouter.createRouter({
  // history: '',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

console.log(34, router, _router)

console.log(35, process.env.BASE_URL, router, import.meta, process.env, process.env.VUE_APP_NODE_ENV)

/*

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
console.log(52, store)
router.beforeEach(async (to, from, next) => {
  console.log(54, process.env.NODE_ENV === 'development', !store.state.appVersionChecked)
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
*/

export default router
