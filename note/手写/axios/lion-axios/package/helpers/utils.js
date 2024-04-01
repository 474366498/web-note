
import { transformURL } from './url'
import { transformData } from './data'
import { transformHeaders } from "./header"

export function isDate(v) {
  return toString.call(v) === '[object Date]'
}

export function isPlainObject(val) {
  return toString.call(val) === '[object Object]'
}
// 判断是否URLSearchParams对象实例
export function isURLSearchParams(val) {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend(to, from, ctx) {
  // console.log(7, to, from, ctx)
  Object.getOwnPropertyNames(from).forEach(key => {
    if (typeof from[key] === 'function') {

      to[key] = from[key].bind(ctx)
    }
  })
  for (let v in ctx) {
    if (ctx.hasOwnProperty(v)) {
      to[v] = ctx[v]
    }
  }
  return to
}


export function processConfig(config) {
  config.url = transformURL(config)
  config.data = transformData(config)
  config.headers = transformHeaders(config)
}

export const deepMerge = (...objs) => {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        let val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}