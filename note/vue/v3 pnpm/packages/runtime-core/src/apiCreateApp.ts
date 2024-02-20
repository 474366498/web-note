

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


}

export type CreateAppFunction<HostElement> = (rootComponent: Component, rootProps?: Data | null) => App<HostElement>



// 创建context 上下文
export function createAppContext() {

  return {
    app: null as any,
    config: {
      isNativeTag: false,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }

}



let uid = 0
export function createAppAPI<HostElement>(render: RootRenderFunction<HostElement>) {
  // console.log(27, render, this)
  return function createApp(rootComponent, rootProps = null) {
    console.log('api 28', rootComponent, rootProps)
    if (!isFunction(rootComponent)) {
      rootComponent = { ...rootComponent }
    }

    if (rootProps != null && !isObject(rootProps)) {
      console.warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }

    const context = createAppContext()
    const installedPlugins = new Set()

    let isMounted = false

    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: '',

      get config() {
        return context.config
      },
      set config(v) {
        console.warn('app.config cannot be replaced. Modify individual options instead.')
      },

      use(plugin, ...options) {

        return app
      },

      mixin(m) {

        return app
      },

      component(name, component?: Component) {

        return app
      },

      directive(name, directive?: Directive) {
        if (!directive) {
          return context.directives[name] as any
        }
        context.directives[name] = directive
        return app
      },

      mount(rootContainer, isHydrate?: boolean): any {
        if (!isMounted) {
          const vnode = createVNode(rootComponent as ConcreteComponent, rootProps)
          console.log('vnode ...')
          // vnode.appContext = context 
          // render(vnode,rootContainer)
          isMounted = true
          app._container = rootContainer
        } else {

        }
      },

      unmount() {

      },

      provide(key, value) {

        return app
      }

    })

    return app


  }
}







