
const defaults = {
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
}

function createInstance(defaultConfig) {
  console.log(3, defaultConfig)
  const context = new Axios(defaultConfig)

}

class Axios {
  constructor(opts) {
    console.log(16, opts)
  }
}

const axios = createInstance(defaults)

// console.log(global ? 'client' : 'node')

exports.default = axios