
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  // routes: (_routes) => [
  //   {
  //     name: 'profile',
  //     path: '/profile',
  //     component: () => import('~/extra-pages/profile.vue').then(p => p.default || p)
  //   }
  // ]
  routes: _routes => {
    _routes.push({
      name: 'profilePage',
      path: '/profilePage',
      component: () => import('~/extra-pages/profile.vue').then(p => p.default || p)
    })
    // console.log(133333333333333333333333, _routes)
    return _routes
  }
}


// https://router.vuejs.org/api/interfaces/routeroptions.html
// export default <RouterConfig>{
//   routes: (_routes) => [
//     {
//       name: 'home',
//       path: '/',
//       component: () => import('~/pages/home.vue').then(r => r.default || r)
//     }
//   ],
// }
