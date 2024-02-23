import { isFunction } from "@vue/shared";
import { DebuggerOptions, ReactiveEffect, activeEffect, shouldTrack, trackEffects, triggerEffects } from "./effect";
import { Ref } from "./ref";
import { Dep, createDep } from "./dep";
import { ReactiveFlags, toRaw } from "./reactive";
import { TrackOpTypes, TriggerOpTypes } from "./operations";


export type ComputedGetter<T> = (...args: any[]) => T
export type ComputedSetter<T> = (v: T) => void

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>
  set: ComputedSetter<T>
}

declare const ComputedRefSymbol: unique symbol

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>
}
export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
  [ComputedRefSymbol]: true
}



export function computed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>
export function computed<T>(options: WritableComputedOptions<T>, debugOptions?: DebuggerOptions): WritableComputedRef<T>

export function computed<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>, debugOptions?: DebuggerOptions, isSSR = false) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  console.log(35, getterOrOptions, Object.prototype.toString.call(getterOrOptions))
  const onlyGetter = isFunction(getterOrOptions)

  if (onlyGetter) {
    getter = getterOrOptions
    setter = () => {
      console.warn('Write operation failed: computed value is readonly')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

  if (debugOptions) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }
  return cRef as any
}

type RefBase<T = any> = {
  dep?: Dep,
  value: T
}
export const triggerRefValue = (ref: RefBase<any>, newV?: any) => {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref)
    trackEffects(ref.dep || (ref.dep = createDep()), { target: ref, type: TrackOpTypes.GET, key: 'value' })
  }
}

export const trackRefValue = (ref: RefBase<any>, newV?: any) => {
  ref = toRaw(ref)
  if (ref.dep) {
    triggerEffects(ref.dep, { target: ref, type: TriggerOpTypes.SET, key: 'value', newValue: newV })
  }
}


export class ComputedRefImpl<T> {
  public dep?: Dep = undefined
  private _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true
  public _cacheable: boolean

  constructor(getter: ComputedGetter<T>, private readonly setter: ComputedSetter<T>, isReadonly: boolean, isSSR: boolean) {

    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }
  get value() {
    // debugger
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }
  set value(newV) {
    this.setter(newV)
  }
}

