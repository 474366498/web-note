import { VNode } from "./vnode"




export type DirectiveModifiers = Record<string, boolean>

export interface DirectiveBinding<V = any> {
  instance: Object | null   // ComponentPublicInstance
  value: V
  oldValue: V | null
  arg?: string
  modifiers: DirectiveModifiers
  dir: ObjectDirective<any, V>
}

export type DirectiveHook<T = any, Prev = VNode | null, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode,
  prevVNode: Prev
) => void


export interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  beforeUpdate?: DirectiveHook<T, VNode, V>
  updated?: DirectiveHook<T, VNode, V>
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
  deep?: boolean

}

export type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>

export type Directive<T = any, V = any> = ObjectDirective<T, V> | FunctionDirective<T, V>



