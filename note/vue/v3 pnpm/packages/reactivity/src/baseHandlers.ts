import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject, isSymbol } from "@vue/shared"
import { ReactiveFlags, Target, isReadonly, isShallow, reactive, reactiveMap, readonly, readonlyMap, shallowReactiveMap, shallowReadonlyMap, toRaw } from "./reactive"
import { isRef } from "./ref"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { ITERATE_KEY, track, trigger } from "./effect"
import { makeMap } from "packages/shared/src/makeMap"



const { log, warn } = console

const isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`)

const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .filter(key => key !== 'arguments' && key !== 'caller')
    .map(key => Symbol[key])
    .filter(isSymbol)
)



const arrayInstrumentations = createArrayInstrumentations()

function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {};

  ; (['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    instrumentations[key] = function (this, ...args) {

    }
  })


  return instrumentations
}



const get = createGetter(),
  shallowGet = createGetter(false, true),
  readonlyGet = createGetter(true),
  shallowReadonlyGet = createGetter(true, true)





function createGetter(isReadonly = false, shallow = false) {
  //传递进入Proxy的get函数
  //例如const obj = {a:2}
  //    const proxy = new Proxy(obj,{
  //  get(target,key,receiver){
  //    当通过proxy.a对obj进行访问的时候,会先进入这个函数
  //     返回值将会作为proxy.a获得的值
  //   }
  // })
  return function (target: Target, key: string | symbol, receiver: object) {
    //1.对isReadonly isShallow等方法的处理
    //以下前面几个判断都是为了通过一些关键key判断
    //当前的对象是否是被代理的,或者是否是只读的
    //是否是只代理第一层的。
    //假设当前我们的代理是reactive类型
    //如果我们访问__v_isReactive那么返回值应该为true
    //同理访问readonly类型则返回false
    //故而这里取反
    // debugger
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow
    } else if (
      key === ReactiveFlags.RAW &&
      receiver === (
        isReadonly ?
          shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
            ? shallowReactiveMap
            : reactiveMap
      ).get(target) // __v_raw 
    ) {
      return target
    }

    const targetIsArray = isArray(target)

    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

    if (shallow) {
      return res
    }

    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}


const set = createSetter(),
  shallowSet = createSetter(true)


function createSetter(shallow = false) {
  return function (target: object, key: string | symbol, value: unknown, receiver: object): boolean {
    console.log(22, target, key, value, receiver)
    // debugger
    let oldVal = (target as any)[key]
    if (isReadonly(oldVal) && isRef(oldVal) && !isRef(value)) {
      return false
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        //防止如果后面操作了value 引起二次setter
        oldVal = toRaw(oldVal)
        value = toRaw(value)
      }
      if (!isArray(target) && isRef(oldVal) && !isRef(value)) {
        oldVal.value = value
        return true
      }
    } else {
      warn('target is shallow')
    }

    const hadKey = isArray(target) && isIntegerKey(key)
      ? Number(key) < target.length
      : hasOwn(target, key)

    const result = Reflect.set(target, key, value, receiver)

    console.log(48, hadKey, target, toRaw(receiver))
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldVal)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldVal)
      }
    }

    return result
  }
}

function deleteProperty(target: object, key: string | symbol) {
  const hadKey = hasOwn(target, key)
  const oldVal = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  if (result && hadKey) {
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldVal)
  }
  console.log(168, hadKey, oldVal)
  return result
}

function has(target: object, key: string | symbol) {
  console.log(177, key, builtInSymbols)
  const result = Reflect.has(target, key)
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, TrackOpTypes.HAS, key)
  }
  return result
}

function ownKeys(target: object): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY)
  return Reflect.ownKeys(target)
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}

export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    warn(`Set operation on key "${String(key)}" failed: target is readonly.`,
      target)
    return true
  },
  deleteProperty(target, key) {
    warn(
      `Delete operation on key "${String(key)}" failed: target is readonly.`,
      target
    )
    return true
  }
}


export const shallowReactiveHandlers: ProxyHandler<object> = extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
)

export const shallowReadonlyHandlers: ProxyHandler<object> = extend(
  {},
  readonlyHandlers,
  { get: shallowReadonlyGet }
)