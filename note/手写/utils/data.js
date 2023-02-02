




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

