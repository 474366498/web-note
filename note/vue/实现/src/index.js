

const { computed } = require('./computed')
const ref = require('./ref') // ref
const reactive = require('./reactivity') // reactive 
const { ReactiveEffect,
  effect,
  track,
  trigger } = require('./reactiveEffect')  // effect 副作用相关

module.exports = {
  computed,
  ref,
  reactive,
  ReactiveEffect,
  effect,
  track,
  trigger
}

