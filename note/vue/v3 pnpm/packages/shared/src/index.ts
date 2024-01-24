
import { makeMap } from './makeMap'

export {
  UnionToIntersection,
  LooseRequired,
  IfAny
} from './typeUtils'


// 空对象
export const EMPTY_OBJ: { readonly [key: string]: any } = Object.freeze({}) || {}

// 空数组 
export const EMPTY_ARR = Object.freeze([]) || []

// noop 
export const NOOP = () => { }



// 返回 false
export const NO = () => false

// event on事件判断
const onREG = /^on[^a-z]/
export const isOn = (key: string) => onREG.test(key)

// 是否是onUpdate 开头
export const isModelListener = (key: string) => key.startsWith('onUpdate:')

// extend 
export const extend = Object.assign


export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty
// key is keyof typeof object  这段代码定义了一个类型变量key，它的类型是typeof object的键集合，也就是说，key只能取object中所有键的值，不能取其他的值。这样做的目的是限制变量key只能取object中存在的键，避免使用不存在的键导致运行时错误。
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)

export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'

export const isFunction = (val: unknown): val is Function => toTypeString(val) === 'function'

export const isString = (val: unknown): val is string => toTypeString(val) === 'string'

export const isSymbol = (val: unknown): val is symbol => toTypeString(val) === 'symbol'

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export const isPromise = (val: unknown): val is Promise<any> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const toRawType = (value: unknown): string => toTypeString(value).slice(8, -1)

export const isPlainObject = (value: unknown): value is Object => toTypeString(value) === '[object object]'
// key 是否是一个数字 
export const isIntegerKey = (key: unknown) => isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key
// reserved  是否是保留的props关键字
export const isReservedProp = makeMap(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`)
// directive 指令关键字
export const isBuiltInDirective = makeMap(`bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo`)

export const cacheStringFunction = <T extends (str: string) => string>(fn: T) => {
  const cache: Record<string, string> = Object.create(null)
  return (str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeReg = /-(\w)/g

export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeReg, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateReg = /\B([A-Z])/g

export const hyphenate = cacheStringFunction((str: string): string => {
  return str.replace(hyphenateReg, '-$1').toLowerCase()
})

export const capitalize = cacheStringFunction((str: string) => str.charAt(0).toUpperCase() + str.slice(1))

export const toHandlerKey = cacheStringFunction((str: string) => str ? `on${capitalize(str)}` : '')

export const hasChanged = (value: any, oldVal: any): boolean => !Object.is(value, oldVal)

export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg)
  }
}

export const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  })
}

export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

let _globalThis: any
declare var global: typeof globalThis
export const getGlobalThis = (): any => {
  return (
    _globalThis || (
      _globalThis = typeof globalThis !== 'undefined'
        ? globalThis
        : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
              ? global
              : {}
    )
  )
}

const identReg = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/

export function genPropsAccessExp(name: string) {
  return identReg.test(name)
    ? `__props.${name}`
    : `__props[${JSON.stringify(name)}]`
}

