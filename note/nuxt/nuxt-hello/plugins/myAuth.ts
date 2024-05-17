export default defineNuxtPlugin(nuxtApp => {
  addRouteMiddleware('global-test', () => {
    console.log('plugins => auth : global-test')
  }, { global: true })

  addRouteMiddleware('named-test', () => {
    console.log('plugins => auth : named-test')
  })
  // console.log(99999, nuxtApp)
  console.log('plugins myAuth')
})