
import { Axios } from './core/Axios'
import { extend } from "./helpers/utils"
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(initConfig) {
  // 创建Axios实例
  const context = new Axios(initConfig)
  // 变量 instance 保存了Axios类上的request方法 并使用实例对象绑定
  const instance = Axios.prototype.request.bind(context)

  extend(instance, Axios.prototype, context)
  return instance
}


const axios = createInstance(defaults)

axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config))
}
console.log(47, axios.defaults)

export default axios

