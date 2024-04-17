


// 获取浏览器设备网络连接信息
const networkInfo = navigator.connection
networkInfo.onchange = function () {
  console.log('网络连接发生改变')
}
/*
{
  downlink: 10
  effectiveType: "4g"
  onchange: null
  rtt: 200
  saveData: false
}
*/

// BroadcastChannel 通信的方式原理就是一个命名管道。它允许让指定的同源下浏览器不同的窗口来订阅它
// https://mp.weixin.qq.com/s/qsBxf208aZgUiaQ-un3j1A
// 页面a js
const broad = new BroadcastChannel('moment')
setInterval(() => {
  broad.postMessage({
    value: `moment ${new Date()}`
  })
}, 3e3)
broad.onmessage = function (e) {
  console.log(e.data)
}

// 页面b js 
const broad = new BroadcastChannel('moment')
let index = 1
setInterval(() => {
  broad.postMessage({
    value: `supper ${index++}`
  })
})
broad.onmessage = function (e) {
  console.log(e.data)
}