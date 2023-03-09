const { forEach } = require('./utils')

class InterceptorManager {
  constructor() {
    this.useManager = []
  }
  use(fulfilled, rejected, options) {
    this.useManager.push({
      fulfilled,
      rejected,
      options
    })
  }
  size() {
    return this.useManager.length
  }
  eject(id) {
    if (this.useManager[id]) {
      this.useManager[id] = null
    }
  }
  clear() {
    this.useManager = []
  }
  forEach(fn) {
    forEach(this.useManager, function (manage) {
      // console.log(27, fn, 'manage:', manage)
      manage && fn(manage)
    })
  }
}

exports.default = InterceptorManager