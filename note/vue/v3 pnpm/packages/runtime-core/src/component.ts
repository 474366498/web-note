import { ComponentPropsOptions } from './componentProps'

import { MethodOptions, ComponentOptions } from './componentOptions'




export type Data = Record<string, unknown>

export interface ComponentCustomProps { }

export interface AllowedComponentProps {
  class?: unknown
  style?: unknown
}

export interface ComponentInternalOptions {
  __scopeId?: string
  __cssModules?: Data
  __hmrId?: string
  __isBuiltIn?: boolean
  __file?: string
  __name?: string
}

// E extends EmitsOptions = {}  ?? EmitsOptions
export interface FunctionalComponent<P = {}, E extends Object = {}> extends ComponentInternalOptions {
  (props: P, ctx: Omit<Object, 'expose'>): any
  props?: ComponentPropsOptions<P>
  emits?: E | (keyof E)[]
  inheritAttrs?: boolean
  displayName?: string
  compatConfig?: Object  //CompatConfig 
}


export interface ClassComponent {
  new(...args: any[]): Object
  __vccOpts: Object
}


export type ConcreteComponent<
  Props = {},
  RawBindings = any,
  D = any,
  C extends Object = {},
  M extends MethodOptions = MethodOptions
> = | ComponentOptions<Props, RawBindings, D, C, M>
  | FunctionalComponent<Props, any>

// compat         compat
export type Component<Props = any> = any



export interface ComponentInternalInstance {

}




