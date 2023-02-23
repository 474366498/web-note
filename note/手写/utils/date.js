/**
 * 时间格式转化 
 * @param {*} date 数字(秒)或时间擢
 * @param {*} fmt 格式化格式
 * @returns 
 */

function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  console.log(7, typeof date)
  if (typeof date === 'string') {
    return date
  } else if (typeof date === 'number') {
    date = new Date(date * 1E3)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(),  //日
    'h+': date.getHours(),//时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (!date || date == null) return null

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  console.log(25, fmt)
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

console.log(formatDate(new Date(), 'yyyy-M-d h:m:s'))