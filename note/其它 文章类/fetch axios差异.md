## Axios vs. fetch()：哪个最适合 HTTP 请求？ 
![转载](https://mp.weixin.qq.com/s/VU6eUCuDCOPfvPiN3lpLQg)

### 基本语法

``` javascript 
// 公共数据
const url = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  a:10 ,
  b :20 
}
const headers = {
  Accept :'application/json' ,
  'Content-Type':'application/json;charset=UTF-8'
}


// axios 
axios.post(url,data,headers).then(({data}) => {
  console.log(data)
})
// fetch 
fetch(url,{
    method : 'POST' ,
    headers ,
    body : JSON.stringify(data)
  }).then(res=>res.json())
    .then(data=>{
      console.log(data)
    })

```
1. 为了发送数据 fetch使用body属性将数据发送到服务端 而 Axios使用data属性
2. fetch 中的数据(json数据)使用JSON.stringify 数据(formData)设置 Content-Type 'multipart/form-data'
3. Axios自动转换从服务器返回的数据 但使用fetch 必须使用.json方法将数据解析成javascript对象
4. 作用Axios 服务器提供的数据响应可以在数据对象中访问，而fetch 最终数据可以以命名为任何变量

### 向后兼容性
Axios的主要卖点之一是其广泛的浏览器支持。

即使是像IE11这样的旧浏览器也可以毫无问题地运行Axios。这是因为它背后使用了XMLHttpRequest。

而fetch()仅支持Chrome 42+，Firefox 39+，Edge 14+和Safari 10.3+。

如果你使用Axios的唯一原因是向后兼容性，那么实际上并不需要HTTP库。而且，你可以将fetch()与polyfill一起使用，在不支持fetch()的web浏览器上实现类似的功能。

要使用fetch() polyfill，可以通过npm命令进行安装，如下所示：

 *** npm install whatwg-fetch --save *** 
``` javascript 
import 'whatwg-fetch' 
window.fetch(...)

```

### 响应超时


``` javascript 

// axios 
axios({
  method:'post' ,
  url :'/' ,
  timeout : 4e3 ,
  data : {
    firstName: 'David',
    lastName: 'Pollock'
  }
}).then(res=>{
  console.log(res)
}).catch(error=>{
  console.error('timeout exceeded')
})

// fetch
const controller = new AbortController() 
const options = {
   method: 'POST',
  signal: controller.signal, // 关键点
  body: JSON.stringify({
    firstName: 'David',
    lastName: 'Pollock'
  })
}
const timer = setTimeout(()=>controller.abort(),4e3)
fetch('/',options)
.then(res=>res.json())
.catch(error => console.error('timeout exceeded'))

```
代码使用AbortController.abort()构造函数创建AbortController对象，它允许我们稍后中止请求。

Signal是AbortController的只读属性，提供了一种与请求通信或中止请求的方法。

如果服务器在4秒内没有响应，则调用controller.abort()，终止操作。


### 自动JSON数据转换
*** 使用fetch 必须手动执行操作 *** 

``` javascript 
// axios 
axios.get('./')
.then(res=>{
  console.log(res.data)
},error=>{
  console.error(error)
})
// fetch
fetch('./')
.then(res=>res.json())
.then(data => {
  console.log(data)
})
.catch(err=>{
  console.error(err)
})

```

### HTTP 拦截器

Axios的主要功能之一是它能够拦截HTTP请求。

当你需要检查或更改从应用程序到服务器的HTTP请求时，使用HTTP拦截器非常方便，从服务器到应用程序亦是如此（例如，日志记录、身份验证或重试失败的HTTP请求）。

使用拦截器就不必为每个HTTP请求编写单独的代码。

在你想要为处理请求和响应设置全局策略时，HTTP拦截器非常有用。

以下是在Axios中声明请求拦截器的方法：

``` javascript 

axios.interceptors.request.use(config=> {
  return config
})

```
上面的代码中，axios.interceptors.request.use（）方法用于定义发送HTTP请求之前要运行的代码。而axios.interceptors.response.use（）用于拦截来自服务器的响应。

假设存在网络错误，那么通过响应侦听器，可以重试相同的请求。

默认情况下，fetch()不提供拦截请求的方法，但它的解决方法也并不复杂。

那就是覆盖全局fetch()方法并定义自己的拦截器，如下所示：

``` javascript
fetch = (originalFetch=>{
  return(...arguments) => {
    const result = originalFetch.apply(this,arguments)
    return result.then(console.log('Request was sent'))
  }
})(fetch)

```

### 下载进度

``` javascript 
// 方式一
let element = document.getElementById('progress') // 进度条节点
fetch('资源地址')
.then(response =>{
  if(!response.ok) {
    throw Error(response.status+' '+response.statusText)
  }

  // ensure ReadableStream is supported
  if (!response.body) {
    throw Error('ReadableStream not yet supported in this browser.')
  }

  // store the size of the entity-body, in bytes
  const contentLength = response.headers.get('content-length')
  //  ensure contentLength is available
  if (!contentLength) {
    throw Error('Content-Length response header unavailable');
  }
  // parse the integer into a base-10 number
  const total = parseInt(contentLength, 10) 
  let loaded = 0 
  new ReadableStream({
    start(controller) {
      const reader = response.body.getReader() 
      read()
      function read() {
        reader.read().then(({done,value}) => {
          if(done) {
            controller.close()
            return 
          }
          loaded += value.byteLength 
          progress({loaded,total})
          controller.enqueue(value)
          read()
        })
        .catch(error=>{
          console.error(error)
          controller.error(error)
        })
      }
    }

  })

})
.then(res=>res.blob())
.then(data=>{
  document.getElementById('image').src = window.URL.createObjectURL(data) // 图片base64展示 
})
.catch(error=>{
  console.error(error)
})

function progress({p,t}){
  element.innerHTML = Math.round(p/t*1e2)+'%'
}
// 方式一 end 

// 方式二
fetch('资源地址')
.then(response => {
  if(response.status ===200) {
    const reader = response.body.getReader() 
    const contentLength =+ response.headers.get('Content-Length') 
    let receivedLength = 0 
    let chunks = []
    return reader.read().then(function processChunk({done,value}) {
      if(done){
        console.log('下载完成')
        let data = new Unit8Array(receivedLength) 
        let position = 0 
        for(let chunk of chunks) {
          data.set(chunk,position)
          position += chunk.length
        }
        return new Blob([data])
      }
      chunks.push(value)
      receivedLength += value.length 
      console.log(`共计${contentLength} , 已下载${receivedLength}`)
      return reader.read().then(processChunk)
    })
  }else {
    console.error('下载失败')
  }
})
.then(blob=>{
  let el = document.createElement('a')
  let href = window.URL.createObjectURL(blob)
  el.href=href
  document.body.appendChild(el)
  el.download = filename 
  el.click() 
  setTimeout(()=>{
    window.URL.revokeObjectURL(href)
    document.body.removeChild(el)
  })
})
.catch(err=>{
  console.error(err)
})



```

### 并发请求

``` javascript 
// axios 
axios.all([
  axios.get('/1'),
  axios.get('/2'),
]).then(axios.spread((res1,res2)=>{
  console.log(res1,res2)
}))

// fetch 

Promise.all([
  fetch('/1'),
  fetch('/2'),
]).then(async([res1,res2]) => {
  let d1 = await res1.json()
  let d2 = await res2.json()
  console.log(d1,d2)
})
.catch(error=>{
  console.error(error)
})


```