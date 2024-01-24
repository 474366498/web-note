

import type { RawSymbol, Ref, UnwrapRefSimple } from './ref'
import { def, isObject, toRawType } from '@vue/shared'
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReactiveHandlers,
  shallowReadonlyHandlers
} from './baseHandlers'

import {
  mutableCollectionHandlers,
  readonlyCollectionHandlers,
  shallowCollectionHandlers,
  shallowReadonlyCollectionHandlers
} from './collectionHandlers'

const { warn } = console

export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw'
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.IS_SHALLOW]?: boolean
  [ReactiveFlags.RAW]?: boolean
}

export const reactiveMap = new WeakMap<Target, any>(),
  shallowReactiveMap = new WeakMap<Target, any>(),
  readonlyMap = new WeakMap<Target, any>(),
  shallowReadonlyMap = new WeakMap<Target, any>()

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

function getTargetType(target: Target) {
  return target[ReactiveFlags.SKIP] || !Object.isExtensible(target)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(target))
}

export type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T>

export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  console.log(72, target)
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap)
}

export function shallowReactive(target: object) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap)
}

export function readonly(target: object) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap)
}

export function shallowReadonly(target: object) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap)
}



function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    warn(`value cannot be made reactive: ${String(target)}`)
    return target
  }

  if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])) {
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
  console.log(103, proxy)
  proxyMap.set(target, proxy)
  return proxy
}

export function isReactive(target: unknown): boolean {
  if (isReadonly(target)) {
    return isReactive(target[ReactiveFlags.RAW])
  }
  return !!(target && target[ReactiveFlags.IS_REACTIVE])
}

export function isReadonly(target: unknown): boolean {
  return !!(target && (target as Target)[ReactiveFlags.IS_READONLY])
}

export function isShallow(target: unknown): boolean {
  return !!(target && target[ReactiveFlags.IS_SHALLOW])
}

export function isProxy(target: unknown): boolean {
  return isReactive(target) || isReadonly(target)
}

export function toRaw<T>(observed: T): T {
  const raw = observed && observed[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

export function markRaw<T extends object>(target: T): T & { [RawSymbol]?: true } {
  def(target, ReactiveFlags.SKIP, true)
  return target
}

export const toReactive = (target: any) => isObject(target) ? reactive(target) : target

export const toReadonly = (target: any) => isObject(target) ? readonly(target) : target