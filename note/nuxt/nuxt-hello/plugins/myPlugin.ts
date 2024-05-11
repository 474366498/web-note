export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: String) => `Hello ${msg}`
    }
  }
})