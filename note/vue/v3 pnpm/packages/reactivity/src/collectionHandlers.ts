
//  Set Map 功能扩展

import { hasChanged, hasOwn, isMap, toRawType } from "@vue/shared"
import { ITERATE_KEY, MAP_KEY_ITERATE_KEY, track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { ReactiveFlags, toRaw, toReactive, toReadonly } from "./reactive"



const { warn, log } = console

type IterableCollections = Map<any, any> | Set<any>
type WeakCollections = WeakMap<any, any> | WeakSet<any>
type MapTypes = Map<any, any> | WeakMap<any, any>
type SetTypes = Set<any> | WeakSet<any>

export type CollectionTypes = IterableCollections | WeakCollections

const toShallow = <T extends unknown>(value: T): T => value

const getProto = <T extends CollectionTypes>(v: T): any => Reflect.getPrototypeOf(v)

function checkIdentityKeys(target: CollectionTypes, has: (key: unknown) => boolean, key: unknown) {
  const rawKey = toRaw(key)
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target)
    warn(`Reactive ${type} contains both the raw and reactive ` +
      `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
      `which can lead to inconsistencies. ` +
      `Avoid differentiating between the raw and reactive versions ` +
      `of an object and only use the reactive version if possible.`)
  }
}

const get = (target: MapTypes, key: unknown, isReadonly = false, isShallow = false) => {
  target = (target as any)[ReactiveFlags.RAW]
  const rawTarget = toRaw(target),
    rawKey = toRaw(key)

  if (!isReadonly) {
    if (key !== rawKey) {
      track(rawTarget, TrackOpTypes.GET, key)
    }
    track(rawTarget, TrackOpTypes.GET, rawKey)
  }
  const { has } = getProto(rawTarget)

  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive

  if (has.call(rawTarget, key)) {
    return wrap(target.get(key))
  } else if (has.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey))
  } else if (target !== rawTarget) {
    target.get(key)
  }

},
  size = (target: IterableCollections, isReadonly = false): number => {
    target = (target as any)[ReactiveFlags.RAW]
    !isReadonly && track(toRaw(target), TrackOpTypes.ITERATE, ITERATE_KEY)
    return Reflect.get(target, 'size', target)
  },
  has = (target: CollectionTypes, key: unknown, isReadonly = false): boolean => {
    target = (target as any)[ReactiveFlags.RAW]
    const rawTarget = toRaw(target),
      rawKey = toRaw(key)

    if (!isReadonly) {
      if (key !== rawKey) {
        track(rawTarget, TrackOpTypes.HAS, key)
      }
      track(rawTarget, TrackOpTypes.HAS, rawKey)
    }
    return key === rawKey
      ? target.has(key)
      : target.has(key) || target.has(rawKey)
  },
  add = function (this: SetTypes, value: unknown) {
    // debugger
    value = toRaw(value)
    const target = toRaw(this)
    const { has } = getProto(target)
    console.log(84, has)
    const hadKey = has.call(target, value)
    if (!hadKey) {
      target.add(value)
      trigger(target, TriggerOpTypes.ADD, value, value)
    }
    return this
  },
  set = function (this: MapTypes, key: unknown, value: unknown) {
    value = toRaw(value)

    const target = toRaw(this)
    const { has, get } = getProto(target)

    let hadKey = has.call(target, key)

    if (!hadKey) {
      key = toRaw(key)
      hadKey = has.call(target, key)
    } else {
      checkIdentityKeys(target, has, key)
    }
    const oldValue = get.call(target, key)
    target.set(key, value)

    if (!hadKey) {
      trigger(target, TriggerOpTypes.ADD, key, value)
    } else if (hasChanged(value, oldValue)) {
      trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    }
    return this
  },
  deleteEntry = function (this: CollectionTypes, key: unknown) {
    const target = toRaw(this)
    const { has, get } = getProto(target)
    let hadKey = has.call(target, key)

    if (!hadKey) {
      key = toRaw(key)
      hadKey = has.call(target, key)
    } else {
      checkIdentityKeys(target, has, key)
    }

    const oldValue = get ? get.call(target, key) : undefined

    const result = target.delete(key)

    if (hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
    }
    return result
  },
  clear = (target: IterableCollections) => {
    target = toRaw(target)
    const hadItems = target.size !== 0
    const oldTarget = isMap(target) ? new Map(target) : new Set(target)
    const result = target.clear()
    if (hadItems) {
      trigger(target, TriggerOpTypes.CLEAR, undefined, undefined, oldTarget)
    }
    return result
  }

function createForEach(isReadonly: boolean, isShallow: boolean) {
  return function f(this: IterableCollections, callback: Function, thisArg?: unknown) {
    const observed = this as any
    const target = observed[ReactiveFlags.RAW]
    const rawTarget = toRaw(target)
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive

    !isReadonly && track(rawTarget, TrackOpTypes.ITERATE, ITERATE_KEY)

    return target.forEach((value: unknown, key: unknown) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed)
    })
  }
}

interface Iterable {
  [Symbol.iterator](): Iterable
}

interface Iterable {
  next(value?: any): IterationResult
}

interface IterationResult {
  value: any,
  done: boolean
}

function createIterableMethod(method: string | symbol, isReadonly: boolean, isShallow: boolean) {
  return function (this: IterableCollections, ...args: unknown[]) {
    const target = (this as any)[ReactiveFlags.RAW]
    const rawTarget = toRaw(target)
    const targetIsMap = isMap(rawTarget)

    const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap)
    const isKeyOnly = method === 'keys' && targetIsMap
    const innerIterator = target[method](...args)
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive
    !isReadonly && track(rawTarget, TrackOpTypes.ITERATE, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY)

    return {
      next() {
        const { value, done } = innerIterator.next()
        return done
          ? { value, done }
          : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          }
      },
      [Symbol.iterator]() {
        return this
      }
    }
  }
}

function createReadonlyMethod(type: TriggerOpTypes): Function {
  return function (this: CollectionTypes, ...args: unknown[]) {
    const key = args[0] ? `on key "${args[0]}" ` : ``
    warn(` ${type} operation ${key}failed: target is readonly.`, `${toRaw(this)}`)
    return type === TriggerOpTypes.DELETE ? false : this
  }
}



function createInstrumentations() {
  const mutableInstrumentations: Record<string, Function> = {
    get(this: MapTypes, key: unknown) {
      return get(this, key)
    },
    size() {
      return size(this as unknown as IterableCollections)
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  }

  const shallowInstrumentations: Record<string, Function> = {
    get(this: MapTypes, key: unknown) {
      return get(this, key, false, true)
    },
    size() {
      return size(this as unknown as IterableCollections)
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  }

  const readonlyInstrumentations: Record<string, Function> = {
    get(this: MapTypes, key: unknown) {
      return get(this, key, true)
    },
    size() {
      return size(this as unknown as IterableCollections, true)
    },
    has(this: MapTypes, key: unknown) {
      return has.call(this, key, true)
    },
    add: createReadonlyMethod(TriggerOpTypes.ADD),
    set: createReadonlyMethod(TriggerOpTypes.SET),
    delete: createReadonlyMethod(TriggerOpTypes.DELETE),
    clear: createReadonlyMethod(TriggerOpTypes.CLEAR),
    forEach: createForEach(true, false)
  }

  const shallowReadonlyInstrumentations: Record<string, Function> = {
    get(this: MapTypes, key: unknown) {
      return get(this, key, true, true)
    },
    size() {
      return size(this as unknown as IterableCollections, true)
    },
    has(this: MapTypes, key: unknown) {
      return has.call(this, key, true)
    },
    add: createReadonlyMethod(TriggerOpTypes.ADD),
    set: createReadonlyMethod(TriggerOpTypes.SET),
    delete: createReadonlyMethod(TriggerOpTypes.DELETE),
    clear: createReadonlyMethod(TriggerOpTypes.CLEAR),
    forEach: createForEach(true, true)
  }

  const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator]
  iteratorMethods.forEach(m => {
    mutableInstrumentations[m as string] = createIterableMethod(m, false, false)
    readonlyInstrumentations[m as string] = createIterableMethod(m, true, false)
    shallowInstrumentations[m as string] = createIterableMethod(m, false, true)
    shallowReadonlyInstrumentations[m as string] = createIterableMethod(m, true, true)
  })

  return {
    mutableInstrumentations,
    readonlyInstrumentations,
    shallowInstrumentations,
    shallowReadonlyInstrumentations
  }
}



const {
  shallowReadonlyInstrumentations,
  shallowInstrumentations,
  readonlyInstrumentations,
  mutableInstrumentations
} = createInstrumentations()

function createInstrumentationGetter(isReadonly: boolean, shallow: boolean) {

  const instrumentations = shallow
    ? isReadonly
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : isReadonly
      ? readonlyInstrumentations
      : mutableInstrumentations

  return (target: CollectionTypes, key: string | symbol, receiver: CollectionTypes) => {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.RAW) {
      return target
    }

    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    )

  }

}

export const mutableCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: createInstrumentationGetter(false, false)
}

export const readonlyCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: createInstrumentationGetter(false, true)
}


export const shallowCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: createInstrumentationGetter(true, false)
}

export const shallowReadonlyCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: createInstrumentationGetter(true, true)
}