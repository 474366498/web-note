

// 页面加载
document.addEventListener('DOMContentLoaded', function () {
  console.log('当DOM完全加载和解析完成后触发')
})

// 页面加载完成
window.addEventListener('load', function () {
  console.log('当所有DOM、CSS、JS、图片等都加载完成后触发。')
})

// 页面卸载
window.addEventListener('beforeunload', () => {
  console.log('在用户离开页面前触发，可以用来提示用户是否有未保存的更改。')
})

// 检测页面的可见性
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {  // 隐藏
    console.log('标签页被切换到后台')
  } else {  // 最大化
    console.log('标签页被切换到前台')
  }
})

// 是否有class str
export const hasClass = function (el, classStr) {
  return el.className.indexOf(classStr) >= 0
}
// 添加 class str
export const addClass = function (el, classStr) {
  if (el.className) {
    if (hasClass(el, classStr)) return
    el.className = el.className + ' ' + classStr
  } else {
    el.className = classStr
  }
}
// 移除 class str 是否是把 classStr 进行分割成数组 进行个体单独删除 ？？
export const removeClass = function (el, classStr) {
  if (!el.className) return false
  let _classStr = el.className.replace(classStr, ' ')
  // console.log(_classStr)
  el.className = _classStr
}
// 移除替换 class str
export const replaceClass = function (el, oldStr, newStr) {
  // oldStr 不存在
  if (!hasClass(el, oldStr)) {
    addClass(el, newStr)
  } else {
    if (hasClass(el, newStr)) return
    el.className = el.className.replace(oldStr, ' ' + newStr)
  }
}

// 进入全屏
function fullScreen() {
  let el = document.documentElement
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  //typeof rfs != "undefined" && rfs
  if (rfs) {
    rfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell")
    if (wscript != null) {
      wscript.SendKeys("{F11}")
    }
  }
}
// 退出全屏
function exitScreen() {
  let el = document
  let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  //typeof cfs != "undefined" && cfs
  if (cfs) {
    cfs.call(el)
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell")
    if (wscript != null) {
      wscript.SendKeys("{F11}")
    }
  }
}