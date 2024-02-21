

import { isFunction, isObject } from "@vue/shared"
import { Component, Data, ConcreteComponent, ComponentInternalInstance } from "./component"
import { RootRenderFunction } from './renderer'
import { Directive } from './directives'
import { ComponentOptions } from './componentOptions'
import { createVNode } from './vnode'

export interface App<HostElement = any> {

  version: string,
  config: AppConfig,
  use(plugin, ...options): this
  mixin(mixin): this
  component(name: string): Component | undefined
  component(name: string, component: Component): this

  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this

  mount(rootComponent: HostElement | string): Object //ComponentPublicInstance 
  unmount(): void
  provide<T>(key: string, value: T): this

  _uid: number,
  _component: ConcreteComponent,
  _props: Data | null,
  _container: HostElement | null,
  _context: AppContext,
  _instance: ComponentInternalInstance | null

  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this

  _createRoot?(options: ComponentOptions): Object //ComponentPublicInstance 


}

export interface AppConfig {


}

export interface AppContext {
  app: App
  config: AppConfig
  // mixins: ComponentOptions[]
  mixins: ComponentOptions[]
  components: Record<string, Component>
  directives: Record<string, Directive>
  provides: Record<string | symbol, any>

  optionsCache: WeakMap<ComponentOptions, any>
  propsCache: WeakMap<ConcreteComponent, any>
  emitsCache: WeakMap<ConcreteComponent, any>

  reload?: () => void

  filters?: Record<string, Function>

}

export type CreateAppFunction<HostElement> = (rootComponent: Component, rootProps?: Data | null) => App<HostElement>


