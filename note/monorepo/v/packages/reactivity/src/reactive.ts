
import { def, isObject, toRawType } from '@vue/shared/src/index'

import { mutableHandlers, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHandlers } from './baseHandlers' // 普通对象处理 如 Object array 

import { mutableCollectionHandlers, readonlyCollectionHandlers, shallowReactiveCollectionHandlers, shallowReadonlyCollectionHandlers } from './collectionHandlers' // 特殊对象处理 如 map set 


export const enum ReactiveFlags {
  SKIP = '__v_skip',
  REACTIVE = '__v_reactive',
  READONLY = '__v_readonly',
  SHALLOW = '__v_shallow',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean,
  [ReactiveFlags.REACTIVE]?: boolean,
  [ReactiveFlags.READONLY]?: boolean,
  [ReactiveFlags.SHALLOW]?: boolean,
  [ReactiveFlags.RAW]?: any
}

const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}

function getTargetType(val: Target) {
  return val[ReactiveFlags.SKIP] || (!Object.isExtensible(val) ? TargetType.INVALID : targetTypeMap(toRawType(val)))
}



export const reactiveMap = new WeakMap(),
  shallowReactiveMap = new WeakMap(),
  readonlyMap = new WeakMap(),
  shallowReadonlyMap = new WeakMap()



function createReactiveObject(target: Target, isReadonly: boolean, baseHandlers: ProxyHandler<any>, collectionHandlers: ProxyHandler<any>, proxyMap: WeakMap<Target, any>) {

  if (!isObject(target)) {
    console.log(`value cannot be made reactive : ${String(target)} `)
    return target
  }

  // 是否是已经代理过 代理过的直接返回
  if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.REACTIVE])) {
    return target
  }

  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }

  const proxy = new Proxy(target, targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}



export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowReactiveCollectionHandlers, shallowReactiveMap)
}

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}

export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap)

}


export function isReactive(val: unknown): boolean {
  if (isReadonly(val)) {
    return isReactive(val as Target)[ReactiveFlags.RAW]
  }
  return !!(val && (val as Target)[ReactiveFlags.REACTIVE])
}

export function isReadonly(val: unknown): boolean {
  return !!(val && (val as Target)[ReactiveFlags.READONLY])
}

export function isShallow(val: unknown): boolean {
  return !!(val && (val as Target)[ReactiveFlags.SHALLOW])
}

export function isProxy(val: unknown): boolean {
  return isReactive(val) || isReadonly(val)
}

export function toRaw(observed) {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

export function markRaw<T extends object>(val: T) {
  def(val, ReactiveFlags.SKIP, true)
  return val
}

export const toReactive = (val) => isObject(val) ? reactive(val) : val

export const toReadonly = (val) => isObject(val) ? readonly(val as Record<any, any>) : val