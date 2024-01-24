import { IfAny, hasChanged } from "@vue/shared"
import { Dep, createDep } from "./dep"
import { isReadonly, isShallow, toRaw, toReactive } from "./reactive"
import { activeEffect, shouldTrack, trackEffects, triggerEffects } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { CollectionTypes } from "./collectionHandlers"








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


export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}






export type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>


















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