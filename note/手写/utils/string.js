const { log } = console
/**
 * 7854123.211 => 7,854,123.21
 * @param {*} num 
 * @returns 
 */
function toThousandFilter(num) {
  return (+num || 0).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

// log(toThousandFilter(7854123.211))
/**
 * 驼峰式转下横线
 * @param {*} str 字符串
 * @param {*} sp  分割符 默认 -
 * @returns 
 */
function toLowerLine(str, sp = '-') {
  let temp = str.replace(/[A-Z]/g, function (m) {
    return sp + m.toLowerCase()
  })
  return temp.slice(0, 1) === sp ? temp.slice(1) : temp
}

// let arr = ['ExpandList', 'expandList']
// let _arr = arr.map(item => {
//   log(item, toLowerLine(item))
//   return toLowerLine(item)
// })

// console.log(_arr)
/**
 * 横线转驼峰式
 * @param {*} str 有横线的字符串 
 * @param {*} flg 是否是大驼峰 默认true 
 */
function toCamel(str, flg = true) {
  let temp = str.replace(/([^_-])(?:[_-]+([^_-]))/g, function ($, $1, $2) {
    log($, $1, $2)
    return $1 + $2.toUpperCase()
  })
  return flg ? temp.slice(0, 1).toUpperCase() + temp.slice(1) : temp
}

// log(toCamel('expand_list'))