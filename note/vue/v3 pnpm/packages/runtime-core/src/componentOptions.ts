import { Component } from "./component"
import { Directive } from "./directives"




export interface MethodOptions {
  [key: string]: Function
}

export interface ComponentOptionBase<
  Props = {},
  RawBindings = any,
  D = any,
  C extends Object = any,
  M extends MethodOptions = any,
  Mixin extends Object = any,
  Extends extends Object = any,
  E extends Object = any
> {

  setup?: (this, props, ctx) => Promise<RawBindings> | void
  name?: string
  template?: string | object
  render?: Function
  components?: Record<string, Component>
  directives?: Record<string, Directive>
  inheritAttrs?: boolean
  emits?: (E) & ThisType<void>
  expose?: string[]
}





export type ComponentOptions<
  Props = {},
  RawBindings = any,
  D = any,
  C extends Object = any,
  M extends MethodOptions = any,
  Mixin extends Object = any,
  Extends extends Object = any,
  E extends Object = any
> = ComponentOptionBase<Props, RawBindings, D, C, M, Mixin, Extends, E> & ThisType<object>


