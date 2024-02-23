
import { ShapeFlags } from '@vue/shared'
import { CreateAppFunction, createAppAPI } from './apiCreateApp.js'
import { Fragment, VNode, childrenToVnode, Text } from './vnode'
import {
  createComponentInstance,
  setupComponent
} from './component.js'
import { effect } from '@vue/reactivity'











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
  // console.log('renderer', options)



  /* ---------- component  ---------------- */
  const mountComponent = (initialVnode, container) => {
    console.log('mount component')

    const instance = initialVnode.component = createComponentInstance(initialVnode)
    // console.log(71, instance)
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

  // --------------- Text --------------

  const processText = (n1, n2, container) => {
    console.log(92, n2)
    if (n1 === null) {
      hostInsert(hostCreateText(n2.children), container)
    }
  }

  /* ---------- element  ---------------- */
  // Element 的 children 递归处理
  function mountChildren(el, children) {
    for (let i = 0; i < children.length; i++) {
      //  ['text','text']  变成 vnode 
      let child = childrenToVnode(children[i])
      console.log(95, child)
      patch(null, child, el)
    }
  }
  const mountElement = (vnode, container) => {
    // n2 h('div',{},['1','2'])
    // 递归渲染  dom 操作 放到对应节点 
    const { props, shapeFlag, type, children } = vnode
    // 获取/创建真实的元素
    let el = hostCreateElement(type)
    // 添加属性
    if (props) {
      for (let key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    console.log(103, el, vnode, children)
    //处理children
    /*
      children 1 'text' 
      children 2 ['text','text']
      children 3 [h()]
    */
    console.log(shapeFlag, ShapeFlags.TEXT_CHILDREN, ShapeFlags.ARRAY_CHILDREN)
    if (children) {
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(el, children)
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // children 递归 
        mountChildren(el, children)
      } else {
        console.log(11111111111)
      }
    }

    // 节点置入
    hostInsert(el, container)
  },
    processElement = (n1, n2, container) => {
      if (n1 == null) {
        mountElement(n2, container)
      } else {

      }
    }

  const setupRenderEffect = (instance, vnode, container) => {
    // 创建一个effect 在effect中调用render方法（获取数据收集effect）
    effect(function () {
      if (!instance.isMounted) { // 第一次加载 获取render 返回值
        let proxy = instance.proxy
        let subTree = instance.render.call(proxy, proxy)   // 组件渲染的节点 => 渲染到页面
        console.log(145, subTree)
        patch(null, subTree, container)
      }
    }, {})
  }



  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null) => {
    // console.log('patch', n1, n2)
    if (n1 === n2) {
      return
    }

    const { type, ref, shapeFlag } = n2

    switch (type) {
      case Text:
        processText(n1, n2, container)
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
          processElement(n1, n2, container)
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


