// 获取浏览器类型
function getBrowserType() {

  // 获取浏览器 userAgent
  var ua = navigator.userAgent

  // 是否为 Opera
  var isOpera = ua.indexOf('Opera') > -1
  // 返回结果
  if (isOpera) { return 'Opera' }

  // 是否为 IE
  var isIE = (ua.indexOf('compatible') > -1) && (ua.indexOf('MSIE') > -1) && !isOpera
  var isIE11 = (ua.indexOf('Trident') > -1) && (ua.indexOf("rv:11.0") > -1)
  // 返回结果
  if (isIE11) {
    return 'IE11'
  } else if (isIE) {
    // 检测是否匹配
    var re = new RegExp('MSIE (\d+\.\d+);')
    re.test(ua)
    // 获取版本
    var ver = parseFloat(RegExp["$1"])
    // 返回结果
    if (ver == 7) {
      return 'IE7'
    } else if (ver == 8) {
      return 'IE8'
    } else if (ver == 9) {
      return 'IE9'
    } else if (ver == 10) {
      return 'IE10'
    } else { return "IE" }
  }

  // 是否为 Edge
  var isEdge = ua.indexOf("Edg") > -1
  // 返回结果
  if (isEdge) { return 'Edge' }

  // 是否为 Firefox
  var isFirefox = ua.indexOf("Firefox") > -1
  // 返回结果
  if (isFirefox) { return 'Firefox' }

  // 是否为 Safari
  var isSafari = (ua.indexOf("Safari") > -1) && (ua.indexOf("Chrome") == -1)
  // 返回结果
  if (isSafari) { return "Safari" }

  // 是否为 Chrome
  var isChrome = (ua.indexOf("Chrome") > -1) && (ua.indexOf("Safari") > -1) && (ua.indexOf("Edge") == -1)
  // 返回结果
  if (isChrome) { return 'Chrome' }

  // 是否为 UC
  var isUC = ua.indexOf("UBrowser") > -1
  // 返回结果
  if (isUC) { return 'UC' }

  // 是否为 QQ
  var isQQ = ua.indexOf("QQBrowser") > -1
  // 返回结果
  if (isUC) { return 'QQ' }

  // 都不是
  return ''
}

/**
 * 通过链接下载文件
 * @param {*} url 
 * @param {*} name 
 */
const downloadFile = function (Url, name) {
  const x = new XMLHttpRequest()
  x.open('GET', Url, true)
  x.onload = function (e) {
    let url = window.URL.createObjectURL(x.response)
    let a = document.createElement('a')
    a.href = url
    a.download = name ? name : Url.replace(/(.*\/)*([^.]+).*/gi, '$2')
    a.click()
  }

  x.send()
}

// https://juejin.cn/post/6844903608585027597
/** 节流函数 预先设定一个执行周期 当调用动作的时刻大于等于执行周期执行该动作 
 * 应用场景 1。window resize scroll  2。拖拽时的mousemove事件
 * @param {function} fn 
 * @param {number} delay 
 */
function throttle(fn, delay) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last > delay) {
      fn.call(this, args)
      last = now
    }
  }
}

/**
 * 防抖函数
 * 应用场景 文字输入 自动完成的keyup事件
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce(fn, delay) {
  let last = 0
  return (...args) => {
    clearTimeout(last)
    last = setTimeout(() => {
      fn.call(this, args)
    }, delay)
  }
}


/*
// call、apply和bind区别：
 
相同点：作用相同，都是动态修改this指向；都不会修改原先函数的this指向。

异同点：
1)执行方式不同：
        call和apply是改变后页面加载之后就立即执行，是同步代码。
        bind是异步代码，改变后不会立即执行；而是返回一个新的函数。
2)传参方式不同：
        call和bind传参是一个一个逐一传入，不能使用剩余参数的方式传参。
        apply可以使用数组的方式传入的，只要是数组方式就可以使用剩余参数的方式传入。
3)修改this的性质不同：
        call、apply只是临时的修改一次，也就是call和apply方法的那一次；当再次调用原函数的时候，它的指向还是原来的指向
 */

/**
 * 防抖 节流 二合一
 * @param {*} fn 需要调用的函数
 * @param {*} delay 延迟时间 毫秒
 * @param {*} immediate immediate参数传递false 绑定的函数先执行，而不是delay后后执行
 * @param {*} debounce 是节流还是防抖 默认节流
 */
function Throttle(fn, delay, immediate, debounce = false) {

  var curr = +new Date(),
    last_call = 0,
    last_exec = 0,
    timer = null,
    diff,
    context,
    args,
    exec = function () {
      last_exec = curr
      fn.apply(context, args)
    }
  return function () {
    curr = +new Date()
    context = this
    args = arguments
    diff = curr - (debounce ? last_call : last_exec) - delay
    clearTimeout(timer)
    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec()
      }
    } else {
      if (diff >= 0) {
        exec()
      } else if (immediate) {
        timer = setTimeout(exec, delay);
      }
    }
    last_call = curr
  }
}
/**
 * 
 * @param {*} fn 要调用的函数
 * @param {*} delay 调用时差
 * @param {*} immediate immediate参数传递false 绑定的函数先执行，而不是delay后后执行
 * @returns 
 */
function Debounce(fn, delay, immediate) {
  return Throttle(fn, delay, immediate, true)
}

/**
 * 
 * @param  {...any} fns 要组合的函数
 */
function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((fna, fnb) => (...args) => fna(fnb(...args)))
}