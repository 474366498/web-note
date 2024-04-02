import { parseHeaders } from '../helpers/header'
import { createError } from '../core/error'
// es6 
export const xhr = config => {
  return new Promise((resolve, reject) => {
    console.log(6, config)
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType = 'json',
      timeout,
      cancelToken,
      withCredentials // 在同域情况下，发送请求会默认携带当前域下的 cookie，但是跨域的情况下，默认是不会携带请求域下的 cookie，如果想携带，只需要设置请求的 xhr 对象的 withCredentials 为 true 即可。
    } = config

    const request = new XMLHttpRequest()
    // 判断用户是否设置了返回数据类型
    if (responseType) {
      request.responseType = responseType
    }
    // 设置timeout
    if (timeout) {
      request.timeout = timeout
    }
    // 设置跨域 cookie 
    if (withCredentials) {
      request.withCredentials = withCredentials
    }
    console.log(31, request)
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = () => {
      if (request.readyState !== 4) return
      if (request.status === 0) return

      // 返回的header 是字符串类型 通过parseHeaders解析成对象类型 
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      console.log(32, response)
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    request.onerror = () => {
      reject(
        createError(
          `Network Error`,
          config,
          null,
          request
        )
      )
    }
    request.ontimeout = () => {
      reject(
        createError(
          `Timeout of ${config.timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }

    console.log('xhr 35', headers)
    Object.keys(headers).forEach(name => {
      // console.log(36, name, headers[name])
      // Refused to set unsafe header "User-Agent"  拒绝设置不安全标头用户代理
      // 如果 data 为空的话，则删除 content-type 
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise
        .then(reason => {
          request.abort()
          console.log(74, reason)
          reject(reason)
        })
        .catch(() => { })
    }

    request.send(data)

  })
}
// commonjs
module.exports = xhr