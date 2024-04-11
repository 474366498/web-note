

# js几种打印方法的几种方法 
![js几种打印方法的几种方法](https://blog.csdn.net/ACCPluzhiqi/article/details/131803570)


## 使用PrintJs库实现打印功能
![Print.js javascript库 实现页面打印](https://blog.csdn.net/sunxiaoju/article/details/126284860)
![printJS~api](https://printjs.crabbly.com/)
``` html 
<!DOCTYPE html>
<html>
  <head>
    <title> PrintJS Example</title>
    <script src='https://printjs-4de6.kxcdn.com/print.min.js'></script>
    <link rel='stylesheet' href='https://printjs-4de6.kxcdn.com/print.min.css' />
  </head>
  <body>
    <h1> PrintJS Example</h1>
    <div id='element'>
      <p> this is the content to be printed </p>
    </div>
    <button id='print'>Print</button>
  </body>
  <script>
    document.getElementById('print').addEventListener('click',function () {
      printJS({
        printable : 'element' ,
        type :'html'   // pdf html image json raw-html 
      })
    })
  </script>
</html>

``` 
## 使用 window.print 
``` html 
<button id='print'>Print</button>

<script>
  document.getElementById('print').addEventListener('click',()=> window.print() )
</script>

```

## 使用 window.open 
``` html 
<button id='print'>Print</button>

<script>
  document.getElementById('print').addEventListener('click',()=> {
    let printWin = window.open('','_blank')
    printWin.document.open()
    let html = `<html>
      <head><title>print</title></head>
      <body>
        <h1> Content to be printed </h1>
      </body>
    </html>`
    printWin.document.write(html)
    printWin.document.close()
    printWin.print()
  
  } )

</script>

```
## Electron 打印 桌面应用
``` javascript 

// 渲染进程
const {ipcRenderer } = require('electron')
ipcRenderer.send('print')

// 主进程
const {ipcMain , BrowserWindow} = require('electron')
ipcMain.on('print',event=>{
  let win = BrowserWindow.getFocusedWindow()
  win.webContents.print()
})
```


