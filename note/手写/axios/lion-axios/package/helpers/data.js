import { isPlainObject } from "./utils"

// xhr data 处理
export function transformRequestData(data) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformData(config) {
  return transformRequestData(config?.data)
}


export function transformResponse(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log('response data not is json of string')
    }
  }
  return data
}