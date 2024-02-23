import { ComponentPropsOptions } from './componentProps'

import { MethodOptions, ComponentOptions } from './componentOptions'
import { ShapeFlags, isFunction, isObject } from '@vue/shared'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'




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

// 创建组件实例
let cId = 0
export function createComponentInstance(vnode) {

  const instance = {
    uid: cId++,
    vnode,
    type: vnode.type || '',
    parent: vnode?.parent || null,
    appContext: vnode?.parent?.appContext || vnode?.appContext || null,
    root: null!,
    next: null,
    subTree: null!,
    effect: null!,
    update: null!,
    scope: true,
    render: null,
    proxy: null,
    exposed: null,
    exposedProxy: null,
    withProxy: null,
    provides: vnode?.parent?.provides || Object.create({}),
    accessCache: null!,
    renderCache: [],

    // local resolved assets   本地清算资产
    components: null,
    directives: null,

    propsOptions: Object.create({}),
    emitsOptions: Object.create([]),

    emit: null!,
    emitted: null,

    // state 
    ctx: {},      // proxy 代理 instance.props.name => proxy.name
    data: {},
    props: {},   // 组件的属性
    attrs: {},    // attrs props 
    slots: {},
    refs: {},
    setupState: {},
    setupContext: null,

    isMounted: false,
    isUnmounted: false,
    isDeactivated: false

  }
  instance.ctx = { _: instance }
  return instance
  /*
   uid: uid++, //当前实例的id
    vnode, //当前实例对应的vnode
    type, //当前实例对应的编译后的.vue生成的对象
    parent, //当前实例的父实例
    appContext, //app的上下文包含全局注入的插件,自定义指令等
    root: null, //当前组件实例的根实例
    //响应式触发的更新next为null,
    //在更新的过程中父组件调用了子组件的
    //instance.update会赋值next为最新组件vnode
    next: null,
    subTree: null, //调用render函数后的Vnode(处理了透传)
    effect: null, //实例的ReactiveEffect
    update: null, //副作用的scheduler
    scope: new EffectScope(true),
    //template编译结果或setup返回值为函数
    //或.vue文件写的template编译为的render函数
    render: null, //渲染函数
    proxy: null, //代理后的ctx
    exposed: null, //调用了ctx.expose()方法(限制暴露的数据)
    exposeProxy: null, //调用了getExposeProxy方法后的expose
    withProxy: null,
    //当前组件的provides,父实例有则读取父实例的否则读取app上的
    //父组件的provides后续会挂载到prototype上,重新赋值当前真实
    //的provide上,这样可以通过原型链访问到所有上代组件中的provide
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null, //当前组件的可用组件
    directives: null, //当前组件的自定义指令
    //合并mixins和extends中的props属性
    propsOptions: normalizePropsOptions(type, appContext),
    //合并mixins和extends中的emits属性
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null, //当前实例调用emit的函数
    emitted: null, //含有once修饰符的,执行一次后放入这里不再执行
    propsDefaults: {}, //默认props
    //是否透传attrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: {}, //当前实例的上下文也就是this
    data: {}, //data函数返回的值,被代理后才放入
    props: {}, //接受到的组件属性
    attrs: {}, //接受到的标签属性
    slots: {}, //组件传递的插槽内容
    refs: {}, //存入的refs
    setupState: {}, //setup的返回值
    //expose attrs slots emit
    setupContext: null, //传递给setup的ctx(只有四个属性)
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null, //setup使用了async修饰符 返回的promise保存在这里
    asyncResolved: false,
    isMounted: false, //是否挂载
    isUnmounted: false, //是否卸载
    isDeactivated: false,
    bc: null, //beforeCreate
    c: null, //create
    bm: null, //beforeMount
    m: null, //mount
    bu: null, //beforeUpdate
    u: null, //update
    um: null, //unmount
    bum: null, //beforeUnmount
    //若组件实例是 <KeepAlive> 缓存树的一部分，
    //当组件从 DOM 中被移除时调用。deactivated
    da: null,
    //若组件实例是 <KeepAlive> 缓存树的一部分，
    //当组件被插入到 DOM 中时调用。activated
    a: null,
    //在一个响应式依赖被组件触发了重新渲染之后调用。
    //renderTriggered
    rtg: null,
    //在一个响应式依赖被组件的渲染作用追踪后调用。
    //renderTracked
    rtc: null,
    /**
     * 错误捕获钩子
     * 组件渲染
     * 事件处理器
     * 生命周期钩子
     * setup() 函数
     * 侦听器
     * 自定义指令钩子
     * 过渡钩子
     * 错误捕获钩子
     *
    ec: null, //errorHandler
    sp: null, //serverPrefetch

  
  */

}


export function setupComponent(instance) {

  const { props, children } = instance.vnode
  const isStateFul = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
  instance.props = props  // 对应源码中的 initProps(instance,props,isStateFul)
  instance.children = children  // initSlots(instance,children) 

  isStateFul && setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)
  const Component = instance.type
  let { data, setup, render } = Component
  instance.data = data() || {}
  if (setup) {
    let setupContext = createContext(instance)
    // instance.setupState = setup(instance.props, setupContext)
    let setupResult = setup(instance.props, setupContext)
    handlerSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
  }
  let r = render(instance.proxy)
  console.log(138, instance, r)
}

function handlerSetupResult(instance, result) {
  // setup return 返回 方法或对象
  if (isFunction(result)) {
    instance.render = result
  } else if (isObject(result)) {
    instance.setupState = result
  }
  finishComponentSetup(instance)

}
// 处理render 
function finishComponentSetup(instance) {
  let Component = instance.type
  if (!instance.render) {   // 实例上没有 render方法
    if (!Component.render && Component.template) {
      // 进行模板编译 
      console.warn('v3 模板编译')
    }
    instance.render = Component.render
  }
}



function createContext(instance) {
  return {
    attrs: instance.attrs,
    slots: instance.children,
    emit: () => { },
    expose: () => { }
  }
}