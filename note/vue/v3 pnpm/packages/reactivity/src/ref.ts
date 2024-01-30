import { IfAny, hasChanged, isArray } from "@vue/shared"
import { Dep, createDep } from "./dep"
import { isProxy, isReactive, isReadonly, isShallow, toRaw, toReactive } from "./reactive"
import { activeEffect, shouldTrack, trackEffects, triggerEffects } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { CollectionTypes } from "./collectionHandlers"


const { warn } = console





declare const RefSymbol: unique symbol
export declare const RawSymbol: unique symbol

export interface Ref<T = any> {
  value: T
  [RefSymbol]: true
}

type RefBase<T> = {
  dep?: Dep
  value: T
}



export function isRef(target: any): boolean {
  return !!(target && target.__v_isRef)
}


export function ref<T extends object>(value: T): [T] extends [Ref] ? T : Ref<T>
export function ref<T>(value: T): T | Ref<T>
export function ref<T = any>(): T | Ref<any>
export function ref(value?: unknown) {
  return createRef(value, false)
}


declare const ShallowRefMarker: unique symbol
export type ShallowRef<T = any> = Ref<T> & { [ShallowRefMarker]?: true }


export function shallowRef<T extends object>(value: T): T extends Ref ? T : ShallowRef<T>
export function shallowRef<T>(value: T): T | ShallowRef<T>
export function shallowRef<T = any>(): T | ShallowRef<T | undefined>
export function shallowRef(value?: unknown) {
  return createRef(value, true)
}

function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue
  }
  console.log(57, rawValue, shallow)
  return new RefImpl(rawValue, shallow)
}

const trackRefValue = (ref) => {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref)
    trackEffects(
      ref.dep || (ref.dep = createDep()),
      {
        target: ref,
        type: TrackOpTypes.GET,
        key: 'value'
      }
    )
  }
},
  triggerRefValue = (ref, newVal) => {
    ref = toRaw(ref)
    if (ref.dep) {
      triggerEffects(
        ref.dep,
        {
          target: ref,
          type: TriggerOpTypes.SET,
          key: 'value',
          newValue: newVal
        }
      )
    }
  }


class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
    console.log(100, __v_isShallow, this)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    console.log(107, newVal)
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)

    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }

  }

}


export function triggerRef(ref: Ref) {
  triggerRefValue(ref, ref.value)
}

export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? (ref as Ref).value : ref
}



export type ShallowUnwrapRef<T> = {
  [K in keyof T]: T[K] extends Ref<infer V>
  ? V
  : T[K] extends Ref<infer V> | undefined
  ? unknown extends V
  ? undefined
  : V | undefined
  : T[K]
}

const shallowUnwrapHandlers: ProxyHandler<any> = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    debugger
    const oldVal = target[key]
    if (isRef(oldVal) && !isRef(value)) {
      oldVal.value = value
      return true
    } else {
      return Reflect.set(target, key, value, receiver)
    }
  }
}

export function proxyRefs<T extends object>(objectWithRefs: T): ShallowUnwrapRef<T> {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers)
}





export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}

export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (!isProxy(object)) {
    warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret: any = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}


export type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>

export function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<Exclude<T[K], undefined>>
export function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>
export function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue?: T[K]): ToRef<T[K]> {
  const val = object[key]
  return isRef(val) ? val : (new ObjectRefImpl(object, key, defaultValue) as any)
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true

  constructor(private readonly _object: T, private readonly _key: K, private readonly _defaultValue: T[K]) {

  }

  get value() {
    const val = this._object[this._key]
    return val === undefined ? (this._defaultValue as T[K]) : val
  }
  set value(newV) {
    this._object[this._key] = newV
  }
}

















type BaseTypes = string | number | boolean
export interface RefUnwrapBailTypes { }

export declare const ShallowReactiveMarker: unique symbol

export type UnwrapRef<T> = T extends ShallowRef<infer V>
  ? V
  : T extends Ref<infer V>
  ? UnwrapRefSimple<V>
  : UnwrapRefSimple<T>

export type UnwrapRefSimple<T> = T extends | Function
  | CollectionTypes
  | BaseTypes
  | Ref
  | RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
  | { [RawSymbol]?: true }
  ? T
  : T extends Array<any>
  ? { [K in keyof T]: UnwrapRefSimple<T[K]> }
  : T extends object & { [ShallowReactiveMarker]?: never }
  ? {
    [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>
  }
  : T