import { Ref, isProxy, isRef, ReactiveFlags } from "@vue/reactivity";
import { Component, ConcreteComponent } from "./component";
import {
  ShapeFlags,
  extend,
  isArray,
  isFunction,
  isObject,
  isString,
  normalizeClass,
  normalizeProp,
  normalizeStyle
} from "@vue/shared";

import { isSuspense } from './components/Suspense'
import { isTeleport } from './components/Teleport'
import { DirectiveBinding } from "./directives";
import { RendererElement, RendererNode } from "./renderer";
import { AppContext } from "./apiCreateApp ss";




export const Fragment = Symbol('Fragment' || undefined)
export const Text = Symbol('Text' || undefined)
export const Comment = Symbol('Comment' || undefined)
export const Static = Symbol('Static' || undefined)

export type VNodeTypes =
  | string
  | VNode
  | Component
  | typeof Text
  | typeof Static
  | typeof Comment
  | typeof Fragment

export type VNodeRef = string | Ref

export const InternalObjectKey = `__vInternal`

export function isVNode(value) {
  return value ? value.__v_isVNode === true : false
}

export type VNodeNormalizedRefAtom = {
  i: object  // component 组件实例接口   interface
  r: VNodeRef
  k?: string
  f?: boolean
}

type VNodeNormalizedRef = VNodeNormalizedRefAtom | VNodeNormalizedRefAtom[]

type VNodeMountHook = (vnode: VNode) => void
type VNodeUpdateHook = (vnode: VNode, oldVnode: VNode) => void

export type VNodeHook = VNodeMountHook | VNodeMountHook[] | VNodeUpdateHook | VNodeUpdateHook[]

export type VNodeProps = {
  key?: string | number | symbol
  ref?: VNodeRef
  ref_for?: boolean
  ref_key?: string

  //vnode hooks

  onVnodeBeforeMount?: VNodeMountHook | VNodeMountHook[]
  onVnodeMounted?: VNodeMountHook | VNodeMountHook[]

  onVnodeBeforeUpdate?: VNodeUpdateHook | VNodeUpdateHook[]
  onVnodeUpdated?: VNodeUpdateHook | VNodeUpdateHook[]

  onVNodeBeforeUnmount?: VNodeMountHook | VNodeMountHook[]
  onVNodeUnmounted?: VNodeMountHook | VNodeMountHook[]

}

export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any }
> {
  /**
  * @internal
  */
  __v_isVNode: true

  /**
   * @internal
   */
  [ReactiveFlags.SKIP]: true

  type: VNodeTypes
  props: (VNodeProps & ExtraProps) | null
  key: string | number | symbol | null
  ref: VNodeNormalizedRef | null

  scopeId: string | null

  slotScopeIds: string[] | null
  children: string | any[] | null
  component: object | null
  dirs: DirectiveBinding[] | null
  transition: object

  // DON 
  el: HostNode | null
  anchor: HostNode | null
  target: HostElement | null
  targetAnchor: HostNode | null

  staticCount: number

  suspense: object | null

  ssContent: VNode | null

  ssFallback: VNode | null

  shapeFlag: number
  patchFlag: number

  dynamicProps: string[] | null

  dynamicChildren: VNode[] | null

  appContext: AppContext | null

  memo?: any[]

  isCompatRoot?: true

  ce?: () => void

}



const normalizeKey = ({ key }: VNodeProps): VNode['key'] => key != null ? key : null
const normalizeRef = ({ ref, ref_key, ref_for }: VNodeProps): VNodeNormalizedRefAtom | null => {
  return (
    ref != null
      ? isString(ref) || isRef(ref) || isFunction(ref)
        ? {
          i: Object,
          r: ref,
          k: ref_key,
          f: !!ref_for
        }
        : ref
      : null
  ) as any
}

export let isBlockTreeEnabled = 1
let currentScopeId: string | null = null

function createBaseVNode(type, props, children: unknown = null, patchFlag = 0, dynamicProps: string[] | null = null, shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT) {

  const vnode = {
    __v_isVNode: true, //这是一个vnode 用来判断是不是一个VNode
    __v_skip: true, //不进行响应式代理
    type, //.vue文件编译后的对象
    props,  //组件收到的props
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null, //存放suspense
    ssContent: null, //存放suspense的default的虚拟节点
    ssFallback: null, //存放suspense的fallback的虚拟节点
    dirs: null, //解析到的自定义指令
    transition: null,
    el: null,
    anchor: null, //插入的锚点
    target: null, //teleport的参数to指定的DOM
    targetAnchor: null, //teleport插入的锚点
    staticCount: 0,
    shapeFlag, //表示当前vNode的类型
    patchFlag,
    dynamicProps, //含有动态的props
    dynamicChildren: null, //含有的动态children
    appContext: null
  } as VNode

  console.log(125, vnode)
  return vnode

}


// 创建 vnode
// createVNode = h('div',{},...children)
export function createVNode(type: ConcreteComponent, props, children = null, patchFlag = 0, dynamicProps: string[] | null = null) {

  if (!type || type === Symbol()) {
    type = Comment
  }

  if (isVNode(type)) {
    // const cloned = cloneVNode(type, props, true) 
    // if (children) {
    //   normalizeChildren(cloned,children) 
    // }

    return type
  }
  /*  class 组件
  if (isClassComponent(type)) {
    type = type.__vccOpts
  }
  */

  if (props) {
    props = guardReactiveProps(props)
    let { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style)
      }
      props.style = normalizeStyle(style)
    }
  }

  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isSuspense(type)
      ? ShapeFlags.SUSPENSE
      : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT
            : 0

  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag) as VNode
}


function guardReactiveProps(props) {
  if (!props) return null
  return isProxy(props) || InternalObjectKey in props
    ? extend({}, props)
    : props
}


