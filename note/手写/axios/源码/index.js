
const Axios = require('./Axios.js').default
const { bind, extend } = require('./utils')


console.log(6, extend)
const defaults = {
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
}

// function bind(fn, args) {
//   return function wrap() {
//     return fn.apply(args, arguments)
//   }
// }



function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig)
  const instance = bind(Axios.prototype.request, context)

  extend(instance, Axios.prototype, context, { allOwnKeys: true });
  extend(instance, context, { allOwnKeys: true });

  // console.log(3, Axios.prototype, 'instance:', instance, 'context:', context)

  return instance
}


const axios = createInstance(defaults)
axios.Axios = Axios
// console.log(global ? 'client' : 'node')

exports.default = axios