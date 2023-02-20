

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