
import { deepMerge, isPlainObject } from "./utils"
// xhr headers 处理

function normalizeHeaderName(headers, normalizedName) {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    // 处理这种情况 如果 name 是 content-type，normalizedName 是 Content-Type，则统一使用 Content-Type
    // 并且删除 content-type。
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })

}

function processHeaders(headers, data) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
export function transformHeaders(config) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export function parseHeaders(headers) {
  // console.log('parseHeaders', headers)
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split("\r\n").forEach(line => {
    let [key, ...val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    parsed[key] = val.join(':').trim()
  })

  // console.log(parsed)
  return parsed
}


export function flattenHeaders(headers, method) {
  // console.log(35, headers, method)
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = [
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch",
    "common",
  ];

  methodsToDelete.forEach((method) => {
    delete headers[method];
  });
  // console.log('flatten', headers)

  return headers;
}