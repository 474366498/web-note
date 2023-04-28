

import { createVNode } from "./vnode"

export function apiCreateApp(render) {
  return function createApp(...args) {
    const app = {
      mount: (container) => {
        container = document.querySelector(container)
        container.innerHTML = '清空'
        let [component, props, children] = args
        createVNode(component, props, children)
        container._component = component

        console.log(30, component, props, children, container, render)
      }
    }
    return app
  }

} 