
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'


export class Axios {
  // 用来存储配置信息
  // config = {}

  constructor(initConfig) {
    // 实例化时接收一个配置信息 并保存到config属性中
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }
  // 该类有一个request方法 用来发送请求
  request(url, config) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    // 合并默认配置与用户传进来的配置
    config = mergeConfig(this.defaults, config)
    // console.log(27, config, this.interceptors)

    const chain = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(i => {
      chain.unshift(i)
    })

    this.interceptors.response.forEach(r => chain.push(r))

    let promise = Promise.resolve(config)
    // console.log(43, promise, chain)
    let i = 0
    while (i < chain.length) {
      promise = promise.then(chain[i].resolved, chain[i].rejected)
      i++
    }
    return promise
    // return dispatchRequest(config)
  }
  // 通用不带data的调用方法
  _requestMethodWithoutData(method, url, config) {
    return this.request(Object.assign(config || {}, { method, url }))
  }
  _requestMethodWithData(method, url, data, config) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }

  get(url, config) {
    console.log('axios get', config)
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url, config) {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url, config) {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url, config) {
    return this._requestMethodWithoutData('head', url, config)
  }
  post(url, data, config) {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url, data, config) {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url, data, config) {
    return this._requestMethodWithData('patch', url, data, config)
  }
}