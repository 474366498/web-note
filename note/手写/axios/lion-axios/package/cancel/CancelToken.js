
import Cancel from './Cancel'


export default class CancelToken {
  constructor(executor) {
    console.log('CancelToken', executor)
    let resolvePromise
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    // 执行 source.cancel('...'); 相当于执行 cancelFn 方法
    const cancelFn = msg => {
      if (this.reason) return
      this.reason = new Cancel(msg)
      console.log('cancel fn', this, msg)
      resolvePromise(this.reason)
    }

    executor(cancelFn)

    // executor(message => {
    //   if (this.reason) return
    //   this.reason = new Cancel(message)
    //   console.log('cancelToken', this, message)
    //   resolvePromise(this.reason)
    // })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source() {
    let cancel
    const token = new CancelToken(f => {
      console.log('CancelToken', f)
      cancel = f
    })
    return {
      cancel,
      token
    }
  }
}