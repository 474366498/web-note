

export default class InterceptorManager {
  interceptors = []

  constructor() {

  }

  use(resolved, rejected) {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回拦截器在数组中索引
    return this.interceptors.length - 1
  }

  forEach(fn) {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor)
    })
  }
  // 根据索引删除拦截器
  eject(id) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

}
