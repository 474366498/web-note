export default defineNuxtRouteMiddleware((to, from) => {
  console.log('middleware global auth', 'to.fullPath:', to.fullPath, from.fullPath)
})