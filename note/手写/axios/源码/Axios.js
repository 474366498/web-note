

const InterceptorManager = require('./InterceptorManager').default
const { forEach } = require('./utils')
const { dispatchRequest } = require('./dispatchRequest')

class Axios {
  constructor(opts) {
    // console.log(16, opts)
    this.default = opts
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }
  request(urlOrOpts, options) {
    // console.log('Axios', 11, urlOrOpts, options, this.interceptors)
    let defaults = this.default

    if (urlOrOpts === 'string') {
      options = options || {}
      options.url = urlOrOpts
    } else {
      options = urlOrOpts || {}
    }

    options = Object.assign(options, defaults)

    let { request, response } = this.interceptors

    // console.log('Axios', 20, request, response, options)
    const requestChain = [], responseChain = []
    request.forEach(requestItem => {
      // console.log(23, requestItem, requestItem.fulfilled(defaults))
      requestChain.unshift(requestItem.fulfilled, requestItem.rejected)
    })

    response.forEach(responseItem => {
      responseChain.push(responseItem)
    })

    let promise
    promise = Promise.resolve(options)

    let newOptions = options, i = 0, len
    len = requestChain.length

    while (i < len) {
      const full = requestChain[i++],
        rej = requestChain[i++]
      try {
        newOptions = full(options)
      } catch (error) {
        rej.call(this, error)
      }
    }
    console.log(57, newOptions)

    try {
      promise = dispatchRequest.call(this, newOptions)
    } catch (error) {
      return Promise.reject(error)
    }

    // promise.then((val) => {
    //   console.log('ajax', val)
    // })
    return promise
  }
}

forEach(['get', 'post'], item => {
  // console.log(16, item)
  Axios.prototype[item] = function (url, options) {
    // console.log(12, item, this, options)
    return this.request(options || {}, {
      method: item,
      url,
      data: options?.data || null
    })
  }
})
// Axios.prototype.apply = function () {
//   console.log(16, arguments)
// }

exports.default = Axios