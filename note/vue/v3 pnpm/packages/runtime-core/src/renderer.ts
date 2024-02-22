
import { ShapeFlags } from '@vue/shared'
import { CreateAppFunction, createAppAPI } from './apiCreateApp.js'
import { Fragment, VNode } from './vnode'
import {
  createComponentInstance,
  setupComponent
} from './component.js'











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
  // console.log(5, options)
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
  console.log('renderer', options)




  const mountComponent = (initialVnode, container) => {
    console.log('mount component')

    const instance = initialVnode.component = createComponentInstance(initialVnode)
    console.log(71, instance)
    setupComponent(instance)
    setupRenderEffect(instance, initialVnode, container)

  },
    processComponent = (n1, n2, container) => {
      if (n1 == null) {
        if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
          console.warn('processComponent kept-alive')
        } else {
          mountComponent(n2, container)
        }
      } else {
        console.warn('processComponent update')
      }
    }

  const setupRenderEffect = (instance, vnode, container) => {

  }



  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null) => {
    console.log('patch', n1, n2)
    if (n1 === n2) {
      return
    }

    const { type, ref, shapeFlag } = n2

    switch (type) {
      case Text:

        break;
      case Comment:

        break;

      // case Static:

      //   break;

      case Fragment:

        break;

      default:

        if (shapeFlag & ShapeFlags.ELEMENT) {
          console.warn('patch element')
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          console.warn('patch component')
          processComponent(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.TELEPORT) {
          console.warn('patch teleport')
        } else if (shapeFlag & ShapeFlags.SUSPENSE) {
          console.warn('patch suspense')
        }


        break;
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


