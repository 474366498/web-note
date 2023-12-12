
// WebSocket 从入门到入土
// https://mp.weixin.qq.com/s/TzUXR78NlJNgsR3p__tERQ

class WebSocketClass {
  constructor(params) {
    this.lock = params.lock
    this.url = params.url
    this.callback = params.callback || null
    this.userClose = false
    this.time = params.time || 5e3
    this.createWebSocket()
    this.webSocketState = false
    this.params = params
  }

  createWebSocket() {
    let _this = this

    if (typeof WebSocket !== 'function') {
      console.error(
        '您的浏览器不支持Websocket通信协议，请更换浏览器为Chrome或者Firefox再次使用！'
      )
      return false
    }

    try {
      this.ws = new WebSocket(_this.url)
      this.initEventHandle()
      this.startHeartBeat()
    } catch (error) {
      this.reconnect()
    }
  }
  // 重连
  reconnect() {
    let _this = this
    if (_this.lock) return
    this.lock = true

    setTimeout(() => {
      _this.createWebSocket()
      _this.params.openSuccess && _this.params.openSuccess(_this)
      _this.params.getSocketMsg && _this.params.getWebSocketMsg(_this)
    }, 3 * _this.time)
  }

  initEventHandle() {
    const _this = this
    const { ws } = this
    console.log(66, ws, this)
    ws.onopen = function () {
      console.log('websocket连接成功', this)
    }

    ws.onclose = function () {
      console.log(70, _this)
      if (!_this.userClose) {
        _this.reconnect()
      }
    }

    ws.onerror = function () {
      console.log(76, _this)
      if (!_this.userClose) {
        _this.reconnect()
      }
    }

    ws.onmessage = function (event) {
      console.log(96, _this)
      _this.getWebSocketMsg(_this.callback)
    }
  }

  startHeartBeat() {
    // const _this = this
    console.log(102, 'heart')
    setTimeout(() => {
      let params = {
        request: 'ping'
      }
      this.webSocketSendMsg(JSON.stringify(params))
      this.waitingServer()
    }, this.time)
  }
  webSocketSendMsg(msg) {
    console.log(113, this.ws, msg)
    this.ws.send(msg)
  }

  getWebSocketMsg(callback) {
    console.log(116, callback)
    this.ws.onmessage = event => {
      callback && callback(event)
    }
  }

  waitingServer() {
    this.webSocketState = false
    setTimeout(() => {
      if (this.webSocketState) {
        this.startHeartBeat()
        return
      }
      try {
        this.closeSocket()
      } catch (e) {
        console.warn('连接已关闭，无需关闭', new Date().toLocaleString())
      }
      this.reconnect()
    }, this.time)
  }
}

let ws = new WebSocketClass({
  url: 'ws://47.108.226.58:8081/webSocket/afd00d061247436faeb881fa3c4159c6',
  callback: function (msg) {
    console.log(141, msg.data)
  }
})
// console.log(65, ws.webSocketSendMsg)
setTimeout(() => {
  ws.webSocketSendMsg('123')
}, 5e3)