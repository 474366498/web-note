export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el: HTMLInputElement) {
      console.log('my directive focus', el)
      el.style.border = '1px solid red'
      el.focus()
    },
    getSSRProps(binding, vnode) {
      console.log('my directive getSSRProps')
      return {}
    }
  })
})