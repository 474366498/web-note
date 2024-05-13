export default defineNuxtPlugin((nuxtApp) => {
  console.log('plugins myPlugin', nuxtApp)
  return {
    provide: {
      hello: (msg: String) => `Hello ${msg}`
    }
  }
})