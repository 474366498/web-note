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