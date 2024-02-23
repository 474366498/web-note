import { isArray, isObject } from "@vue/shared";
import { Comment, Text, VNode, createVNode, isVNode } from "./vnode";





// element 
export function h(type: string, children?): VNode
export function h(type: string, props?: object | null, children?): VNode

// text/comment 
export function h(type: typeof Text | typeof Comment, children?: string | number | boolean): VNode
export function h(type: typeof Text | typeof Comment, props?: object | null, children?): VNode

// function component 
export function h(type, props?: object | null, children?): VNode


export function h(type: any, propsOrChildren?: any, children?: any) {
  const l = arguments.length
  console.log(22, l)
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      return createVNode(type, propsOrChildren)
    } else {
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}

// Function implementation is missing or not immediately following the declaration