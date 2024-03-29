

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

export const buildURL = (url, params) => {

} 
