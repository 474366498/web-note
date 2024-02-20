import { isProxy } from "@vue/reactivity";
import { ConcreteComponent } from "./component";
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





export const Text = Symbol('Text' || undefined)
export const Comment = Symbol('Comment' || undefined)
export const Static = Symbol('Static' || undefined)
export const InternalObjectKey = `__vInternal`

export function isVNode(value) {
  return value ? value.__v_isVNode === true : false
}





export interface VNode<> {

}


export function createVNode(type: ConcreteComponent, props, children = null, patchFlag = 0) {

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
  /* 
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

}


function guardReactiveProps(props) {
  if (!props) return null
  return isProxy(props) || InternalObjectKey in props
    ? extend({}, props)
    : props
}


