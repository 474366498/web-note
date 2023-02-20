// event 手写公共方法

// 鼠标位置
function getMouse(element) {
  let mouse = { x: 0, y: 0 }
  element.addEventListener('mousemove', e => {
    // console.log(9, e)
    let x = e.pageX, y = e.pageY
    mouse.x = x - element.offsetLeft
    mouse.y = y - element.offsetTop
  })
  return mouse
}

// https://www.jianshu.com/p/d9f5f19e78da
// 判断一个元素是否在可视区域中 01
function isInViewPortOfOne(el) {
  let viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  let offsetTop = el.offsetTop, scrollTop = document.documentElement.scrollTop, top = offsetTop - scrollTop
  return top <= viewPortHeight
}

// 判断一个元素是否在可视区域中 02
function isInViewRect(el) {
  let rectInfo = el.getBoundingClientRect()
  let { left, top, bottom, right } = rectInfo
  let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  return left >= 0 && top >= 0 && right <= width && bottom <= height
}

// 判断一个元素是否在可视区域中 03
// const Observer = new IntersectionObserver(call, { threshold: 1.0 })

// function call(entries, observer) {
//   console.log(37, entries, observer)
//   entries.forEach(entry => {
//     console.log(38, entry)
//     return entry.isIntersecting
//   });
// }
// https://www.jianshu.com/p/d9f5f19e78da
// 判断一个元素是否在可视区域中 03 IntersectionObserver https://juejin.cn/post/7035821803431788551 
function isInWindowRect(el) {
  // console.log(46, Observer, Observer.observe(el))
  return new Promise((res, rej) => {
    const Observer = new IntersectionObserver(function (entries, observe) {
      let flg = entries.some(item => item.isIntersecting)
      console.log(48, flg)
      res(flg)
    }, { threshold: 1 })

    Observer.observe(el)
  })
}

// 键盘事件
function getKey(e) {
  let keyInfo = {}
  let { key, keyCode, altKey, ctrlKey, shiftKey } = e
  keyInfo = {
    key,
    code: keyCode,
    alt: altKey,
    ctrl: ctrlKey,
    shift: shiftKey
  }
  console.log(70, e, keyInfo)
  return keyInfo
}
// 浏览器分辨率比例
function getRatio() {
  let ratio = 0
  const screen = window.screen,
    ua = navigator.userAgent.toLowerCase()
  if (window.devicePixelRatio) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && srceen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth && window.innerWidth) {
    ratio = window.outerWidth / window.innerWidth
  }
  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  console.log(89, ratio)
  return ratio
}
/*
availHeight: 1040
availLeft: 1536
availTop: -216
availWidth: 1920
colorDepth: 24
height: 1080
isExtended: true
*/


/**
 * 防抖
 * @param {*} fn function 
 * @param {*} wait timeout 时间间隔
 * @param {*} immediate 单次执行 boolean 
 * @returns 
 */
function debounce(fn, wait, immediate) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait);
      if (callNow) {
        fn.apply(this, arguments)
      }
    } else {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, wait);
    }
  }
}

/**
 * 节流
 * @param {*} fn function 
 * @param {*} wait timer
 */
function throttle(fn, wait) {
  let timer,
    previous = 0
  return function () {
    let now = +new Date()
    let remaining = wait - (now - previous)
    if (remaining < 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = now
      fn.apply(this, arguments)
    } else if (!timer) {
      timer = setTimeout(() => {
        previous = new Date().getTime()
        timer = null
        fn.apply(this, arguments)
      }, remaining);
    }
  }
}