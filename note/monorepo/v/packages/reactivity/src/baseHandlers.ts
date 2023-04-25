


import { hasOwn, isArray, isBuiltInDirective, isIntegerKey, isObject, isSymbol, makeMap, extend, hasChanged } from '@vue/shared'

import { ReactiveFlags, reactive, reactiveMap, isReadonly, isShallow, readonlyMap, shallowReactiveMap, shallowReadonlyMap, Target, toRaw, readonly } from './reactive'

import {
  TrackOpTypes,
  TriggerOpTypes
} from './operations'

import { track, trigger, ITERATE_KEY, pauseTracking, resetTracking } from "./effect";





const isNonTrackableKeys = /*#__PURE__*/  makeMap(`__proto__,__v_isRef,__isVue`)

//Symbol的所有属性值
const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .filter(key => key !== 'arguments' && key !== 'caller')
    .map(key => (Symbol as any)[key])
    .filter(isSymbol)
)





const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const arrayInstrumentations = createArrayInstrumentations()

function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {}

    ; (['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
      instrumentations[key] = function (this: unknown, ...args: unknown[]) {
        const arr = toRaw(this) as any
        for (let i = 0; i < arr.length; i++) {
          track(arr, TrackOpTypes.GET, i + '')
        }
        const res = arr[key](...args)
        if (res === -1 || res === false) {
          return arr[key](args.map(toRaw))
        } else {
          return res
        }
      }
    })

    ; (['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
      instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
        console.log(60, this, args)

        pauseTracking()
        const res = (toRaw(this) as any)[key].apply(this, args)
        resetTracking()
        return res
      }
    })
  return instrumentations
}

function createGetter(_readonly = false, _shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.REACTIVE) {
      return !_readonly
    } else if (key === ReactiveFlags.READONLY) {
      return _readonly
    } else if (key === ReactiveFlags.SHALLOW) {
      return _shallow
    } else if (
      key === ReactiveFlags.RAW
      &&
      receiver ===
      (
        _readonly
          ? _shallow ? shallowReadonlyMap : readonlyMap
          : _shallow
            ? shallowReactiveMap : reactiveMap
      ).get(target)
    ) {
      return target
    }

    const targetIsArray = isArray(target)

    if (!_readonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    // if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
    //   return res
    // }

    if (!_readonly) {
      track(target, TrackOpTypes.GET, key)
    }

    if (_shallow) return res

    // if (isRef(res)) {
    //   return targetIsArray && isIntegerKey(key) ? res : res.vLUE
    // }

    if (isObject(res)) {
      return _readonly ? isReadonly(res) : reactive(res)
    }

    return res
  }
}

const set = createSetter()
const shallowSet = createSetter(true)

function createSetter(_shallow = false) {
  return function set(target, key, value, receiver) {

    let oldValue = (target as any)[key]

    if (isReadonly(oldValue)) {
      // if (isRef(oldValue) && isRef(value)) {
      return false
      // }
    }
    if (!_shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      /* 暂无 ref 
      if (!isArray(target)) {
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value
          return true
        }
      }
      */
    } else {

    }

    const hasKey = isArray(target) && isIntegerKey(key)
      ? Number(key) < target.length
      : hasOwn(target, key)

    const result = Reflect.set(target, key, value, receiver)

    if (target === toRaw(receiver)) {
      console.log(158, target, toRaw(receiver))
      if (!hasKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}




export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}
export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    console.log(`Object:${target} is readonly `)
    return true
  }
}
export const shallowReactiveHandlers: ProxyHandler<object> = {
  get: shallowGet,
  set: shallowSet
}
export const shallowReadonlyHandlers: ProxyHandler<object> = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
})