
import { buildURL } from "./helpers/utils"
console.log(3, 'axios')

function extend(to, from, ctx) {
  console.log(7, to, from, ctx)
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


const xhr = config => {
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}


const transformURL = config => {
  const { url, params } = config
  return buildURL(url, params)
}

const processConfig = config => config.url = transformURL(config)

class Axios {
  // 用来存储配置信息
  // config = {}

  constructor(initConfig) {
    // 实例化时接收一个配置信息 并保存到config属性中
    this.config = initConfig
  }
  // 该类有一个request方法 用来发送请求
  request(config) {
    processConfig(config)
    xhr(config)
  }
  get() { }
  delete() { }
  head() { }
  options() { }
  post() { }
  put() { }
  patch() { }
}

function createInstance(initConfig) {
  // 创建Axios实例
  const context = new Axios(initConfig)
  // 变量 instance 保存了Axios类上的request方法 并使用实例对象绑定
  const instance = Axios.prototype.request.bind(context)

  extend(instance, Axios.prototype, context)
  return instance
}

const defaults = {
  method: 'get'
}

const axios = createInstance(defaults)

axios.create = function (config) {
  return createInstance(defaults)
}
console.log(47, axios)

export default axios

