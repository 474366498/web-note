
import { ShapeFlags } from '@vue/shared'
import { CreateAppFunction, createAppAPI } from './apiCreateApp.js'
import { Fragment, VNode, childrenToVnode, Text } from './vnode'
import {
  createComponentInstance,
  setupComponent
} from './component.js'
import { effect, ReactiveEffect } from '@vue/reactivity'











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
    console.log(71, instance)
    setupComponent(instance)
    // 创建render副作用方法
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
    // console.log(92, n2)
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
      // console.log(95, child)
      patch(null, child, el)
    }
  }
  const mountElement = (vnode, container, anchor) => {
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
    // console.log(103, el, vnode, children)
    //处理children
    /*
      children 1 'text' 
      children 2 ['text','text']
      children 3 [h()]
    */
    // console.log(shapeFlag, ShapeFlags.TEXT_CHILDREN, ShapeFlags.ARRAY_CHILDREN)
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
    vnode.el = el
    // 节点置入
    hostInsert(el, container, anchor)
  },
    // 新旧节点对比
    patchElement = (n1, n2, container, anchor) => {
      let el = n2.el = n1.el
      let oldProps = n1.props || {},
        newProps = n2.props || {}
      patchProps(el, oldProps, newProps)
      patchChildren(n1, n2, el)
    },
    // 节点props对比
    patchProps = (el, prevProps, nextProps) => {
      if (prevProps != nextProps) {
        for (let key in nextProps) {
          let prev = prevProps[key],
            next = nextProps[key]
          hostPatchProp(el, key, prev, next)
        }
      }
      for (let key in prevProps) {
        if (!(key in nextProps)) {
          hostPatchProp(el, key, prevProps[key], null)
        }
      }
    },
    // 对比 children
    patchChildren = (n1, n2, container) => {
      // 1，旧的有 新的没有
      // 2，新的有 旧的没有
      // 3，子节点是文本
      // 4，子节点数组 
      const c1 = n1.children
      const c2 = n2.children
      const prevShapeFlag = n1.shapeFlag
      const nextShapeFlag = n2.shapeFlag
      console.log(176, n1, n2)
      // 新子节点是文本
      if (nextShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, c2)
      } else {  // 新节点是数组
        // 旧节点是数组
        if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          patchKeyChildren(c1, c2, container)
          // 旧节点是文本
        } else {
          hostSetElementText(container, '')
          mountChildren(container, c2)
        }
      }

    },

    // patch 节点 
    processElement = (n1, n2, container, anchor) => {
      if (n1 == null) {
        mountElement(n2, container, anchor)
      } else {
        console.log('process update Element')
        patchElement(n1, n2, container, anchor)
      }
    }
  // children 新旧节点都为数组
  function patchKeyChildren(c1, c2, el) {
    let i = 0,
      e1 = c1.length - 1,
      e2 = c2.length - 1
    /** 跑头
     c1 = [
          h('p',{key:'a'},'a') ,
          h('p',{key:'b'},'b') ,
          h('p',{key:'c'},'c') ,
          h('p',{key:'d'},'d') ,
          h('p',{key:'e'},'e')
        ] , 
        c2 = [
          h('p',{key:'a'},'a') ,
          h('p',{key:'b'},'b') ,
          h('p',{key:'c'},'c') ,
          h('p',{key:'d'},'d') ,
          h('p',{key:'e'},'e') ,
          h('p',{key:'f'},'f') ,
          h('p',{key:'g'},'g') ,
        ]
        i=>5 e1=>4 e2=>6
     */
    while (i <= e1 && i <= e2) {
      let n1 = c1[i], n2 = c2[i]
      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }
    // 只跑 头时 i=>5 e1=>4 e2=>6

    /** 跑头跑尾
     c1 = [
          h('p',{key:'a'},'a') ,
          h('p',{key:'b'},'b') ,
          h('p',{key:'c'},'c') ,
          h('p',{key:'d'},'d') ,
          h('p',{key:'e'},'e')
        ] , 
        c2 = [
          h('p',{key:'a'},'a') ,
          h('p',{key:'b'},'b') ,
          h('p',{key:'c'},'c') ,
          h('p',{key:'f'},'f') ,
          h('p',{key:'g'},'g') ,
          h('p',{key:'d'},'d') ,
          h('p',{key:'e'},'e') ,
        ]
        i=>3 e1=>2 e2=>4
     */
    while (i <= e1 && i <= e2) {
      let n1 = c1[e1], n2 = c2[e2]

      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el)
      } else {
        break
      }
      e1--
      e2--
    }

    // 跑头跑尾时 i=>3 e1=>2 e2=>4
    console.log(246, i, e1, e2)
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0
    if (i > e1) { // 旧少新多
      if (i <= e2) {
        const nextPos = e2 + 1 // 插入的位置
        let anchor = nextPos < c2.length ? c2[nextPos].el : null
        while (i <= e2) {
          patch(null, c2[i++], el, anchor)
        }
      }
    }
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) { // 旧多新少
      console.log(277, '旧多新少')
      while (i <= e1) {
        unmount(c1[i++], null, null)
      }
    }
    // a b c d e
    // a z b c d e f g 
    else {
      console.log(300, '乱')
      let s1 = i, s2 = i
      let keyIndexMap = new Map()
      let toBePatched = e2 - s2 + 1 // 乱序个数 
      let newIndexToPatchMap = new Array(toBePatched).fill(0)
      for (let s = s2; s <= e2; s++) {
        keyIndexMap.set(c2[s].key, s)
      }

      for (let s = s1; s <= e1; s++) {
        let vnode = c1[s]
        let index = keyIndexMap.get(vnode.key)
        if (index == undefined) {
          unmount(vnode, null, null)
        } else {
          patch(vnode, c2[index], el)  // 1。位置不对 2。新的未添加
          // 旧的和新的关系（索引） 新的数据在旧的数据中的索引
          newIndexToPatchMap[index - s2] = s + 1
        }
      }

      console.log(322, i, keyIndexMap, newIndexToPatchMap)  // i=>1 ,  0, 2, 3, 4, 5, 0, 0
      // 移动或创建节点
      for (let l = toBePatched - 1; l >= 0; l--) {  // toBePatched => 7
        let index = l + s2
        let child = c2[index]
        let anchor = index + 1 < c2.length ? c2[index + 1].el : null
        if (newIndexToPatchMap[l] == 0) {
          // console.log(326, child, anchor, c2[index + 1])
          patch(null, child, el, anchor)
        } else {
          console.log(child, el, anchor, index)
          hostInsert(child.el, el, anchor)  // 要先通过patch(新旧节点 创建出el对象)
        }
      }

    }


  }

  const setupRenderEffect = (instance, vnode, container) => {

    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook
        // const { el, props } = vnode
        // const { bm, m, parent } = instance 
        let proxy = instance.proxy
        const subTree = (instance.subTree = instance.render.call(proxy, proxy))
        patch(null, subTree, container)
        vnode.el = subTree.el
        console.log(162, subTree)
        instance.isMounted = true
      } else {
        console.log('render effect update', instance, vnode)
        let proxy = instance.proxy
        let prevTree = instance.subTree
        let nextTree = instance.render.call(proxy, proxy)
        console.log(169, prevTree, nextTree)
        instance.subTree = nextTree
        patch(prevTree, nextTree, container)
      }
    }
    const effect = (instance.effect = new ReactiveEffect(componentUpdateFn))

    const update = (instance.update = () => effect.run())
    update()
    // update.id = instance.uid

    // 创建一个effect 在effect中调用render方法（获取数据收集effect）
    // effect(function componentEffectFn() {
    //   if (!instance.isMounted) { // 第一次加载 获取render 返回值
    //     let proxy = instance.proxy
    //     let subTree = instance.render.call(proxy, proxy)   // 组件渲染的节点 => 渲染到页面
    //     patch(null, subTree, container)
    //     instance.isMounted = true
    //     console.log(145, subTree, instance)
    //   } else {
    //     console.log('render effect update')
    //   }
    // }, {})

  }


  const isSameVnodeType = (p, n) => {
    return p.type == n.type && p.key == n.key
  }

  const patch: Function = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null) => {
    console.log('patch', n1, n2, n1 == n2)
    if (n1 == n2) {
      return
    }
    if (n1 && !isSameVnodeType(n1, n2)) {
      unmount(n1, parentComponent, parentSuspense)
      n1 = null
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
          processElement(n1, n2, container, anchor)
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
    console.log(246, vnode)
    hostRemove(vnode.el)
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


