import { isFunction } from "@vue/shared"
import { Dep } from "./dep"
import { ReactiveEffect } from "./effect"
import { toRaw } from "./reactive"
import { trackRefValue, triggerRefValue } from "./ref"


export type ComputedGetter<T> = (...args: any[]) => T
export type ComputedSetter<T> = (v: T) => void

// export interface ComputedOptions {
//   get: ComputedGetter <T>,
//   set:ComputedSetter <T>
// }

export function computed(optionsOrFunc) {
  let getter, setter
  const defaultSetter = () => {
    console.warn('setter is not found')
  }
  let onlyGetter = isFunction(optionsOrFunc)
  if (isFunction(optionsOrFunc)) {
    getter = optionsOrFunc
    setter = defaultSetter
  } else {
    getter = optionsOrFunc.get
    setter = optionsOrFunc.set
  }
  return new ComputedRefImpl(getter, setter, onlyGetter || !setter)
}

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  private _value
  public readonly effect: ReactiveEffect

  public readonly __ref_ = true
  public _dirty = true
  // public _cacheable:boolean

  constructor(getter: ComputedGetter<T>, private readonly _setter: ComputedSetter<T>, isReadonly) {

    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
  }

  get value() {
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }
  set value(newV: T) {
    this._setter(newV)
  }
}



