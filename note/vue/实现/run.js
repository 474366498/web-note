
const { log } = console

const {
  computed,
  ref,
  reactive,
  ReactiveEffect,
  effect,
  track,
  trigger
} = require('./src/index')

// const proxy = reactive({
//   a: 1,
//   b: {
//     a: 1
//   }
// })

const r = ref(1)

effect(() => {
  // console.log(15, proxy.b.a, r.value)
})
let _r = computed(() => r.value++)
let __r = computed({
  get() {
    return r.value++
  },
  set(newV) {
    r.value++
    return true
  }
})
log('before', _r.val, r)
r.value = 20
log(`%c 27 ~ ${_r.value} %c ~ %c ${__r.value}  `, 'color:#f00;', 'font-size:20px;', 'color:blue;background:yellow;')


// proxy.a = 10

