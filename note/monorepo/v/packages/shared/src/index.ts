
import { makeMap } from './makeMap'



export { makeMap }

// 创建空对象
export const EMPTY_OBJ: { readonly [key: string]: any } = Object.freeze({}) || {}

export const EMPTY_ARR = Object.freeze([]) || []

export const NOOP = () => { }

export const NO = () => false

const onRE = /^on[^a-z]/

export const isOn = key => onRE.test(key)

export const isModelListener = key => key.startWidth('onUpdate:')

export const extend = Object.assign

export const remove = (arr, el) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}


const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol) => hasOwnProperty.call(val, key)

export const isArray = Array.isArray

export const isMap = (val) => toTypeString(val) === '[object Map]'

export const isSet = val => toTypeString(val) === '[object Set]'

export const isDate = val => toTypeString(val) === '[object Date]'

export const isFunction = val => typeof val === 'function'

export const isString = val => typeof val === 'string'

export const isSymbol = val => typeof val === 'symbol'

export const isObject = (val) => val !== null && typeof val === 'object'

export const isPromise = val => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const objectToString = Object.prototype.toString

export const toTypeString = val => objectToString.call(val)

export const toRawType = val => toTypeString(val).slice(8, -1)

export const isPlainObject = val => toTypeString(val) === '[object Object]'

// 是否是整数键
export const isIntegerKey = key => isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key

export const isReservedProp = makeMap(',key,ref,ref_for,ref_key,' +
  'onVnodeBeforeMount,onVnodeMounted,' +
  'onVnodeBeforeUpdate,onVnodeUpdated,' +
  'onVnodeBeforeUnmount,onVnodeUnmounted')


export const isBuiltInDirective = makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo')


export const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  })
}

export const hasChanged = (value, oldValue) => value === oldValue