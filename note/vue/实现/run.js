
const reactive = require('./reactivity')
const { effect } = require('./reactiveEffect')
const { log } = console

const proxy = reactive({
  a: 1,
  b: {
    a: 1
  }
})


effect(() => {
  console.log(15, proxy.b.a)
})


proxy.a = 10

proxy.a

log(21, proxy.a)
