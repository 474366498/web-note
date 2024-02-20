
import { CreateAppFunction, createAppAPI } from './apiCreateApp'
import { VNode } from './vnode'












export interface RendererNode {
  [key: string]: any
}


export interface RendererElement extends RendererNode { }

export interface Renderer<HostElement = RendererElement> {
  render: RootRenderFunction<HostElement>
  createApp?: CreateAppFunction<HostElement>
}
export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode | null,
  container: HostElement
) => void


export function createRenderer<HostNode = RendererNode, HostElement = RendererElement>(options) {
  console.log(5, options)
  return baseCreateRenderer(options)
}


function baseCreateRenderer(options) {


  // const { } = options

  console.log(44, options)

  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null) => {
    if (n1 === n2) {
      return
    }

  }

  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {

  }

  const render = (vnode, container) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null)
    }
    container._vnode = vnode
  }

  return {
    render,
    createApp: createAppAPI(render)
  }

}


