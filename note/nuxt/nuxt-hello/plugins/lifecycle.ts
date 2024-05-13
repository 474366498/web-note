export default defineNuxtPlugin((nuxtApp) => {
  console.log('lifecycle')
  nuxtApp.hook('app:created', () => {
    console.log('nuxt app created')
  })
  nuxtApp.hook('page:start', () => {
    console.log('nuxt page start')
  })
  nuxtApp.hook('app:mounted', () => {
    console.log('nuxt app mounted')
  })
})