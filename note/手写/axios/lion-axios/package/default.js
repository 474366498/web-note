

const defaults = {
  method: 'get',
  timeout: 5e3,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  }
}
// 'delete', 'get', 'head', 'options' 这四种类型请求时默认 headers 为空
const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

// 'post', 'put', 'patch' 这三种类型请求时设置一个默认的 Content-Type
const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults





