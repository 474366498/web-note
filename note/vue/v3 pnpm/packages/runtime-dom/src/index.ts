import { Renderer, createRenderer } from "@vue/runtime-core"
import { extend, isFunction, isString } from "@vue/shared"
import { nodeOps } from "./nodeOps"
import { patchProp } from "./patchProp"


let renderer //: Renderer<Element | ShadowRoot>





var rendererOptions = extend({ patchProp }, nodeOps)

function ensureRenderer() {
  // console.log(15, rendererOptions)
  return (
    renderer
    ||
    (renderer = createRenderer<Node, Element>(rendererOptions))
  )
}
/*
const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})
*/
export const createApp = (...args) => {
  console.log(6, args)
  const app = ensureRenderer().createApp(...args)

  // console.log('runtime-dom index', app)
  const { mount } = app

  app.mount = function (containerOrSelector: Element | ShadowRoot | string): any {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    // console.log(41, container, mount)

    const component = app._component

    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }

    container.innerHTML = ''

    const proxy = mount(container, false)

    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    console.log(57, proxy)
    return proxy

  }

  return app
}





function normalizeContainer(container): Element | null {
  if (isString(container)) {
    return document.querySelector(container)
  }
}



