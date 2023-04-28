
import { apiCreateApp } from "./apiCreateApp"

export function createRender() {
  let render = (vnode, container) => {
    console.log(6, 'render')
  }
  return {
    createApp: apiCreateApp(render)
  }
}