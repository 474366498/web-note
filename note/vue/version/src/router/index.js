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
