import { isPlainObject, isURLSearchParams, isDate } from "./utils"

// url + params 二次组合
export const buildURL = (url, params) => {
  // console.log(16, url, params)
  if (!params) return url

  let serializedParams

  if (isURLSearchParams(params)) {
    // eslint-disable-next-line no-unused-vars
    serializedParams = params.toString()
  } else {
    const parts = []
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val === null || typeof val === 'undefined') return

      let values = []

      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(v => {
        if (isDate(v)) {
          v = v.toISOString()
        } else if (isPlainObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(`${encodeURI(key)}=${encodeURI(v)}`)
      })

    })
    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
export const transformURL = config => {
  const { url, params } = config
  return buildURL(url, params)
}