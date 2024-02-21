
import { CreateAppFunction, createAppAPI } from './apiCreateApp.js'
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
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId,
    insertStaticContent: hostInsertStaticContent
  } = options
  console.log(44, options, hostInsert)

  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null) => {
    console.log('patch', n1, n2)
    if (n1 === n2) {
      return
    }

  }

  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {

  }

  const render: RootRenderFunction = (vnode, container) => {
    console.log(59, vnode)
    if (vnode == null) {
      if (container._vnode) {
        // 注销
        unmount(container._vnode, null, null, true)
      }
    } else {
      // 渲染
      patch(container._vnode || null, vnode, container, null, null, null)
    }
    container._vnode = vnode
  }

  return {
    render,
    createApp: createAppAPI(render)
  }

}


