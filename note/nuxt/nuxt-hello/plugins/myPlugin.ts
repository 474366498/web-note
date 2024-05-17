export default defineNuxtPlugin((nuxtApp) => {
  // console.log('plugins myPlugin', nuxtApp)
  console.log('plugins myPlugin')
  return {
    provide: {
      hello: (msg: String) => `Hello ${msg}`
    }
  }
})