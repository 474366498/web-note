

/**
 * 节点事件通过 addeventListener 绑定 所有事件不能通过覆盖 而是通过缓存 进行修改
 * @param el 节点元素
 * @param key 事件名  click mousedown .... 
 * @param fn  事件名对应的方法 
 */
export const patchEvent = (el, key, fn) => {
  // 事件缓存 
  const invokers = el._vei || (el._vei = {})

  const oldInvoker = invokers[key]
  let eventName = key.substring(2).toLowerCase()

  if (oldInvoker && fn) {
    oldInvoker.value = fn
  } else {
    if (fn) {
      const invoker = invokers[key] = createInvoker(fn)
      el.addEventListener(eventName, invoker)
    } else {
      el.removeEventListener(eventName, oldInvoker)
      invokers[key] = null
    }
  }

}

function createInvoker(fn) {
  const _fn = (e) => {
    _fn.fn(e)
  }
  _fn.fn = fn
  return _fn
}
