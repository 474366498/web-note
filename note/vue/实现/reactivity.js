



const { track, trigger } = require('./reactiveEffect')
const { log } = console
function reactive(obj) {
  const proxy = new Proxy(obj, {
    get: function getter(object, key, receiver) {
      const res = Reflect.get(object, key, receiver)
      track(object, key, receiver)
      if (typeof res === 'object') {
        return reactive(res)
      }
      log('get', res)
      return res
    },
    set: function setter(object, key, value, receiver) {
      const res = Reflect.set(object, key, value, receiver)
      trigger(object, key, value, receiver)
      log('set', res)
      return res
    }
  })

  return proxy
}

module.exports = reactive

