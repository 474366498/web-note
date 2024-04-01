
function parseHeaders() {

}
// es6 
export const xhr = config => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType = 'json' } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    // 判断用户是否设置了返回数据类型
    if (responseType) {
      request.responseType = responseType
    }

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
      resolve(response)
    }
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
    request.send(data)

  })
}
// commonjs
module.exports = xhr