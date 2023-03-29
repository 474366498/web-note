



const { log } = console

// https://blog.csdn.net/u012915128/article/details/79634670
/**
 * json 转 csv 
 * @param {*} header 
 * @param {*} data 
 * @param {*} showHeader 
 * @param {*} fileName 
 */
function toCSV(header, data, showHeader, fileName) {
  var header = header || {
    title: [],
    key: [],
    formatter: undefined
  },
    fileName = (fileName || 'userFileName') + '.cvs'
  let row = '', CSV = '', key

  if (!!showHeader) {  // 有表头
    if (header.title.length) {
      header.title.map(item => {
        row += item + ','
      })
    } else {
      for (key in data[0]) row += key + ','
    }
    row = row.slice(0, -1)
    CSV += row + '\r\n'
  }
  data.map(item => {
    row = ''
    if (header.key.length) {
      header.key.map(k => {
        row += '"' + (typeof header.formatter === 'function' ? header.formatter(k, item[k]) || item[k] : item[k]) + '",'
      })
    } else {
      for (key in item) {
        row += '"' + (typeof header.formatter === 'function' ? header.formatter(key, item[key]) || item[key] : item[key]) + '",'
      }
    }
    row.slice(0, row.length - 1)
    CSV += row + '\r\n'
  })
  if (!CSV) return
  console.log(CSV)
  return CSV
}
/**
 * 将csv字符串转 data
 * @param {*} csvData CSV字符串 
 */
function getCSVUrl(csvData) {
  let _utf = '\uFEFF'
  return 'data:attachment/csv;charset=utf-8,' + _utf + encodeURIComponent(csvData)
}




/* csv测试
let h = {
  title: ['姓名', '金额', '占比'],
  key: ['name', 'amont', 'proportion'],
  formatter: function (n, v) { }
},
  data = [
    { name: '张三', amont: '41542', proportion: '12' },
    { name: '李四', amont: '12354', proportion: '23' },
    { name: '王五', amont: '123123', proportion: '34' }

  ],
  name = 'test'
let c = toCSV(h, data, true, name)
let href = getCSVUrl(c)

console.log(70, href)
*/





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
/**
 * 通过data数据下载文件
 * @param {*} data 
 */
const downloadData = function (data, fileName) {
  let link = document.createElement('a')
  link.href = data
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


// 深拷贝
const deepCopy = function (obj) {
  var newObj = obj && obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return obj
  } else {
    for (var i in obj) {
      if (typeof obj[i] === 'object') {
        //判断对象的这条属性是否为对象
        newObj[i] = deepCopy(obj[i]) //若是对象进行嵌套调用
      } else {
        newObj[i] = obj[i]
      }
    }
  }
  return newObj //返回深度克隆后的对象
}

// function deepCopy(source) {
//   let target = Array.isArray(source) ? [] : {}
//   for (let key in source) {
//     if (source.hasOwnProperty(key)) {
//       if (typeof source[key] === 'object' && source) {
//         target[key] = deepCopy(source[key])
//       } else {
//         target[key] = source[key]
//       }
//     }
//   }
//   return target
// }

// json 转formData
function jsonToFormData(obj) {
  let formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

// json 转 query-string 
function jsonToQueryString(obj) {
  if (!obj) return ''
  return Object.keys(obj).map(key => {
    if (obj[key] === undefined) return ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  }).join('&')
}
// formData 转json
function formDataToJson(formData) {
  let json = {}
  formData.forEach((v, k) => json[k] = v)
  return json
}
// query-string 转 json 
function queryStringToJson(query) {
  let json = {}
  query.split('&').forEach(item => {
    let s = item.split('=')
    let key = s[0], value = decodeURIComponent(s[1]) || undefined
    json[key] = value
  })
  return json
}

// let a = {
//   b: 1,
//   c: 2,
//   e: 'kadflaksdkasdf中存在的',
//   f: null
// }

// let s = jsonToQueryString(a)

// log(queryStringToJson(s))

// 随机色三位或六位
function getRandomColor(length) {
  let l = length || (Math.random() < .5 ? 3 : 6)
  return '#' + (function setColor(c) {
    return (c += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && c.length === l ? c : setColor(c)
  })('')
}
// 0.2.2.0.1.0.2.0.1.0.1.0.1.0.1.0.1.0.1.0.1.0.2.0.1.0.1.0.1.0.2.0.1.0.1.0.1.0.2.0.1.0.1.0.1

// 随机色三位或六位
function getRandomRGBA(flg) {
  let rgba = ''
  for (let i = 0; i < 3; i++) {
    let r = Math.floor(Math.random() * 256) + (i < 2 ? ',' : '')
    console.log(r)
    rgba += r
  }
  return flg ? `rgba(${rgba},${Math.floor(Math.random() * 100) / 100})` : `rgb(${rgba})`
}
