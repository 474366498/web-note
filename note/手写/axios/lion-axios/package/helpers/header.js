
import { isPlainObject } from "./utils"
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