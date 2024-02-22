import { hyphenate } from "@vue/shared"







const addEvent = (el, name, handler, options?) => {
  el.addEventListener(name, handler, options)
},
  removeEvent = (el, name, handler, options?) => {
    el.removeEventListener(name, handler, options)
  }


export function patchEvent(el, rawName, prev, next,) {
  const invokers = el._vei || {},
    existingInvoker = invokers[rawName]
  if (next && existingInvoker) {
    existingInvoker.value = next
  } else {
    const [name, options] = parseName(rawName)
    if (next) {
      const invoker = invokers[rawName] = createInvoker(next)
      addEvent(el, name, invoker, options)
    } else if (existingInvoker) {
      removeEvent(el, name, existingInvoker, options)
      invokers[rawName] = null
    }
  }
}


const optionsReg = /(?:Once|Passive|Capture)$/
function parseName(name) {
  let options
  if (optionsReg.test(name)) {
    options = {}
    let m
    while ((m = name.match(optionsReg))) {
      name = name.slice(0, name.length - m[0].length)
      options[m[0].toLowerCase()] = true
    }
  }
  const event = name[2] === ':' ? name.slice(3) : hyphenate(name.slice(2))
  return [event, options]
}

interface Invoker extends EventListener {
  value: Function | Function[]
  attached: number
}
function createInvoker(initialValue) {

  let attached

  const invoker: Invoker = (e: Event) => {
    const timeStamp = attached = e.timeStamp || new Date().getTime()

  }
  invoker.value = initialValue
  invoker.attached = attached
  return invoker
}
