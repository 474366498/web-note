export default defineNuxtRouteMiddleware((to, from) => {
  console.log('middle user', to.fullPath, from.fullPath)
})