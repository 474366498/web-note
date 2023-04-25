import { hasChanged, isArray } from "@vue/shared"
import { createDep, Dep } from "./dep"
import { activeEffect, shouldTrack, trackEffects, triggerEffects } from "./effect"
import { TriggerOpTypes } from "./operations"
import { isReadonly, isShallow, toRaw, toReactive } from "./reactive"





declare const RefSymbol: unique symbol
export declare const RawSymbol: unique symbol
export interface Ref<T = any> {
  value: T,
  [RefSymbol]: true
}

type RefBase = {
  dep?: Dep,
  value: any
}

export function trackRefValue(ref: RefBase) {
  if (shouldTrack && activeEffect) {
    ref = toRaw(ref)
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

export function triggerRefValue(ref, newV?) {
  ref = toRaw(ref)
  if (!ref.dep) return
  triggerEffects(ref.dep, {
    target: ref,
    type: TriggerOpTypes.SET,
    key: 'value',
    newValue: newV
  })
}


export function isRef(raw) {
  return raw && raw.__ref_ === true
}

export function ref(value) {
  return createRef(value, false)
}

export function shallowRef(value) {
  return createRef(value, true)
}

function createRef(val, shallow = false) {
  if (isRef(val)) {
    return val
  }
  return new RefImpl(val, shallow)
}



class RefImpl {
  private _value
  private _rawValue

  public dep?: Dep = undefined
  public readonly __ref_ = true

  constructor(value, public readonly __shallow_: boolean) {
    this._rawValue = __shallow_ ? value : toRaw(value)
    this._value = __shallow_ ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    const useDirectValue = this.__shallow_ || isShallow(newValue) || isReadonly(newValue)
    newValue = useDirectValue ? newValue : toRaw(newValue)
    if (!hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = useDirectValue ? newValue : toReactive(newValue)
      triggerRefValue(this, newValue)
    }
  }

}

export function triggerRef(ref) {
  triggerRefValue(ref, ref.value | 0)
}

export function unref(ref) {
  return isRef(ref) ? ref.value : ref
}

const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key]

    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value
      return true
    } else {
      return Reflect.set(target, key, value, receiver)
    }

  }
}

export function toRef(object, key) {
  const val = object[key]
  return isRef(val) ? val : new ObjectRefImpl(object, key)
}

class ObjectRefImpl {

  public readonly __ref_ = true

  constructor(private readonly object, private readonly key) {

  }
  get value() {
    const val = this.object[this.key]
    return val === undefined ? 'default' : val
  }
  set value(newV) {
    this.object[this.key] = newV
  }
}

export function toRefs(object) {
  let result = isArray(object) ? new Array(object.length) : {}
  for (let key in object) {
    result[key] = toRef(object, key)
  }
  return result
}


