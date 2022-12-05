import { createRouter, createWebHistory } from 'vue-router'

// import Layout from '@/components/layout/index'
// import Index from '@/app.vue'

const routes = [
  {
    path: '/', meta: { title: 'Index' },
    redirect: { name: 'app' },
    children: [
      { path: '/app', name: 'app', meta: { title: 'app' }, component: () => import('@/pages/app.vue') },
      { path: '/about', name: 'about', meta: { title: 'about' }, component: () => import('@/pages/about.vue') }
    ]
  }
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
export default router