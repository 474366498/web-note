
## vue项目上线发布后通知用户刷新页面
[!vue项目上线发布后通知用户刷新页面](https://juejin.cn/post/7258129183330254906)

### 思路 
  *** 发布前端项目时，使用webpack构建命令生成一个json文件 json中写个随机生成的一个字符串 每次打包程序都会自动更新这个json ***
  *** 在项目中 通过定时任务或者切换页面路由时 请求json文件 使用本地保存的上一次生成的字符串和json文件中的字符进行比较，如果两个字符串不一样 则说明前端重新部署了 提醒用户进行更新或者强制刷新操作 *** 

### 实现

1. 项目根目录下新建version.js

``` javascript 
  const fs = require('fs')
  const timeStamp = new Date().getTime()
  fs.writeFile(
    'public/version.json',
    `{
      version:${timeStamp}
    }`,
    error =>{
      if(error){
        console.error(error)
      }
  })

```
2. 修改构建命令 添加执行version.js命令

``` json
 // package.json
  "script" : {
    "build":"node version.js && vue-cli-service build"
  }

```
3. vue.config.js 
添加配置，自定义html注入变量

``` javascript 

chainWebpack(config) {
  // 获取版本号数据
  const bpmVersion = require('./public/version.js') 
  // 自定义html注入变量
  config.plugin('html').tap((args) => {
    args[0].version = bpmVersion.version
  })
}

```
4. index.html 
利用meta标签 存储版本号字段 

``` html 
<meta name="version" content="<%= htmlWebpackPlugin.options.bpmVersion %>"

```
5. store.js

``` javascript 

const actions = {
  checkVersion ({commit,state}) {
    return new Promise (resolve => {
      axios.get(
        '/version.json?v'+new Date().getTime(),
        {
          headers:{'Cache-Control':'no-cache'}
        },
        baseURL : window.location.origin
      ).then(res=>{
        const latesVersion = res.data.version 
        const currentPageVersion = document.querySelector('meta[name="version"]').content || '' 
        resolve(latesVersion == currentPageVersion)
      }).catch(error=>{
        console.error('actions checkVersion error:',error)
      })
    })
  }
}

```
6. router.js
切换页面路由，对比版本
``` javascript
// router.js 
router.afterEach(async ()=> {
  if(process.env.NODE_ENV == 'production') {
    const checkVersion = await store.dispatch('checkVersion')
    if(!checkVersion) {
      // 1强制刷新 
      Message.warning('正在自动升级新版本...',3,()=>{
        window.location.reload()
      })

      // 2、需要用户主动刷新，需要考虑只提醒一次，而不是每次切换路由都提示
      //MessageBox.alert('检测到新版本，刷新后立即使用', '发现新版本', {
      //  confirmButtonText: '立即刷新',
      //  showClose: false,
      //  callback: action => {
      //    window.location.reload() // 版本不同 刷新 获取最新版本
      //  }
      //})

    }
  }
})

```


## 另一种轮询方式 

[!前端重新部署如何通知用户 ](https://juejin.cn/post/7264396960558399549#heading-4)

### 方案
1. 每次打包写入一个json文件 或者对比生成的script的src引用的hash地址或者tag不同 轮询调用判断是否更新
2. 前端使用websocket长连接，具体是每次构建，打包后通知后端，更新后通过websocket通知前端

### 实现
1. 轮询方式

``` typescript 

export class Monitor {
  private oldScript:string[] = [] 

  private newScript:string[] = [] 

  private oldTag : string|null = null 

  private newTag : string | null = null 

  dispatch : Record<string ,(()=>void)[]> = {} 

  private stop = false 

  constructor () {
    this.init()
  }

  init () {
    const html : string = await this.getHtml() 
    this.oldScript = this.parserScript(html)
    this.oldTag = await this.getTag()
  }
  // 获取 经过打包处理后dist目录下的index.html内容
  async getHtml () {
    const html = await fetch('/').then(res=>res.text())
    return html 
  }
  /*
      html 示例内容
      <!DOCTYPE html><html lang=zh-cn><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1"><meta http-equiv=X-UA-Compatible content="IE=edge ,IE=IE9"><meta http-equiv=X-UA-Compatible content="IE=edge"><link rel=icon href=/admin/favicon.ico><title>标书制作</title><link href=/admin/static/css/404.0f739e91.css rel=prefetch><link href=/admin/static/css/Layout.bcce48c9.css rel=prefetch><link href=/admin/static/css/accountsAuthen.c475cab3.css rel=prefetch><link href=/admin/static/css/accountsInfo.d56a55a4.css rel=prefetch><link href=/admin/static/css/accountsService.5c5ecca6.css rel=prefetch><link href=/admin/static/css/accountsUnsafe.bf93fbb2.css rel=prefetch><link href=/admin/static/css/balanceManage.f3ce6355.css rel=prefetch><link href=/admin/static/css/basicConfiguration.58bcbd9d.css rel=prefetch><link href=/admin/static/css/bidderList.49d4a164.css rel=prefetch><link href=/admin/static/css/bidderMake.16957c05.css rel=prefetch><link href=/admin/static/css/builtTenderMode.d2865b26.css rel=prefetch><link href=/admin/static/css/businessInfo.dc53ac29.css rel=prefetch><link href=/admin/static/css/chunk-103ae3b3.a21fe669.css rel=prefetch><link href=/admin/static/css/chunk-45767074.0eb2de7e.css rel=prefetch><link href=/admin/static/css/chunk-56f95a9e.b2c24762.css rel=prefetch><link href=/admin/static/css/companyDataManage.99b51f6b.css rel=prefetch><link href=/admin/static/css/companyManage.331d1764.css rel=prefetch><link href=/admin/static/css/dataManage.58313fde.css rel=prefetch><link href=/admin/static/css/depManage.8685b1d7.css rel=prefetch><link href=/admin/static/css/financialInfo.3d86b606.css rel=prefetch><link href=/admin/static/css/financialInfo~honestryCert~honorCert~qualCert.d05d78f6.css rel=prefetch><link href=/admin/static/css/home.3cd39b41.css rel=prefetch><link href=/admin/static/css/honestryCert.cfca189a.css rel=prefetch><link href=/admin/static/css/honorCert.10592c89.css rel=prefetch><link href=/admin/static/css/invoiceManage.88ed3976.css rel=prefetch><link href=/admin/static/css/memberManage.e69ad0c6.css rel=prefetch><link href=/admin/static/css/menuManage.a562b0a2.css rel=prefetch><link href=/admin/static/css/partnerBusinessInfo.936af2ea.css rel=prefetch><link href=/admin/static/css/partnerFinancialInfo.6b325cda.css rel=prefetch><link href=/admin/static/css/partnerHonestryCert.3550d2c3.css rel=prefetch><link href=/admin/static/css/partnerHonorCert.9b09ad87.css rel=prefetch><link href=/admin/static/css/partnerList.51e8bafe.css rel=prefetch><link href=/admin/static/css/partnerProjectAchieve.87b9f349.css rel=prefetch><link href=/admin/static/css/partnerProjectPersonnel.4d95649a.css rel=prefetch><link href=/admin/static/css/partnerQualCert.797f8d42.css rel=prefetch><link href=/admin/static/css/projectAchieve.9953ddf6.css rel=prefetch><link href=/admin/static/css/projectPersonnel.0ddf28c0.css rel=prefetch><link href=/admin/static/css/qualCert.1ae47f51.css rel=prefetch><link href=/admin/static/css/roleManage.d8065b03.css rel=prefetch><link href=/admin/static/css/tenderMode.cd98ad9a.css rel=prefetch><link href=/admin/static/css/userManage.161adb1c.css rel=prefetch><link href=/admin/static/css/userMode.7f4fa873.css rel=prefetch><link href=/admin/static/css/userModeCheck.4d97c5b8.css rel=prefetch><link href=/admin/static/css/voucherInfo.e4d8626f.css rel=prefetch><link href="/admin/static/js/404.[24.01.02].ffd96293f72c.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/Layout.[24.01.02].1a60d04905e8.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/accountsAuthen.[24.01.02].4fae7c4dae97.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/accountsInfo.[24.01.02].3af8231a8304.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/accountsInfo~bidderList~bidderMake~businessInfo~invoiceManage~partnerBusinessInfo~partnerProjectAchi~683457ae.[24.01.02].abb5b9b26bb2.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/accountsService.[24.01.02].de5ddd91a627.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/accountsUnsafe.[24.01.02].0e1737c5e338.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/balanceManage.[24.01.02].9eeed75b8d77.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/basicConfiguration.[24.01.02].4b75dec47cf6.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/bidderList.[24.01.02].2653414f8499.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/bidderMake.[24.01.02].6296b25041a0.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/builtTenderMode.[24.01.02].57c8fb39197e.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/businessInfo.[24.01.02].dfd1ff75bc23.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/chunk-103ae3b3.[24.01.02].13d22f6fac89.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/chunk-2d0cc229.[24.01.02].f421752cc96d.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/chunk-45767074.[24.01.02].bbcdefc7190f.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/chunk-56f95a9e.[24.01.02].f1d8a3498d66.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/companyDataManage.[24.01.02].377082f491db.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/companyManage.[24.01.02].563faccc2a34.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/dataManage.[24.01.02].c94323074814.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/depManage.[24.01.02].fa00b79c51ac.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/financialInfo.[24.01.02].15758bcf24d0.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/financialInfo~honestryCert~honorCert~qualCert.[24.01.02].99bbd5926b1e.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/home.[24.01.02].8ae88ea75547.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/honestryCert.[24.01.02].7770a29e561d.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/honorCert.[24.01.02].a7c3b9cc18da.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/invoiceManage.[24.01.02].e73c9f140ce1.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/memberManage.[24.01.02].0e11a2082b1e.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/menuManage.[24.01.02].bc08d66a8baf.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerBusinessInfo.[24.01.02].e7e2c1cca553.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerFinancialInfo.[24.01.02].01de458f1fa2.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerHonestryCert.[24.01.02].ffba3eb8c3cc.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerHonorCert.[24.01.02].d4c3a031d345.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerList.[24.01.02].d8515fc61140.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerProjectAchieve.[24.01.02].36f5efe2488a.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerProjectPersonnel.[24.01.02].8272a99b24e0.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/partnerQualCert.[24.01.02].f5398516e1aa.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/projectAchieve.[24.01.02].64913977d7ed.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/projectPersonnel.[24.01.02].938d3fb0135c.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/qualCert.[24.01.02].961dfda7cf07.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/roleManage.[24.01.02].cb0211e5aa33.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/tenderMode.[24.01.02].901ce08853aa.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/userManage.[24.01.02].2023226e84e1.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/userMode.[24.01.02].1a4b43846335.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/userModeCheck.[24.01.02].e9f32a0a690a.js?time=1704264025895" rel=prefetch><link href="/admin/static/js/voucherInfo.[24.01.02].da67c0357cd9.js?time=1704264025895" rel=prefetch><link href=/admin/static/css/chunk-common.cfce6135.css rel=preload as=style><link href=/admin/static/css/chunk-vendors.08349251.css rel=preload as=style><link href="/admin/static/js/chunk-common.[24.01.02].2b851984041b.js?time=1704264025895" rel=preload as=script><link href="/admin/static/js/chunk-vendors.[24.01.02].0a76cad3a82d.js?time=1704264025895" rel=preload as=script><link href="/admin/static/js/index.[24.01.02].f8b960641844.js?time=1704264025895" rel=preload as=script><link href=/admin/static/css/chunk-vendors.08349251.css rel=stylesheet><link href=/admin/static/css/chunk-common.cfce6135.css rel=stylesheet><script id="config" src="./config.js" ></script><body><noscript><strong>We're sorry but tender-work doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src="/admin/static/js/chunk-vendors.[24.01.02].0a76cad3a82d.js?time=1704264025895"></script><script src="/admin/static/js/chunk-common.[24.01.02].2b851984041b.js?time=1704264025895"></script><script src="/admin/static/js/index.[24.01.02].f8b960641844.js?time=1704264025895"></script></body></html>
  */
  // 解析 script 标签  
  parserScript (html:string) {
    const reg = /<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi
    return html.match(reg) as string[]
  }
  async getTag () {
    const res = await fetch('/')
    return res.headers.get('etag') // 接口请求中的响应头内容
    /*
      HTTP/1.1 304 Not Modified
      Server: nginx
      Date: Mon, 25 Mar 2024 07:16:36 GMT
      Last-Modified: Wed, 03 Jan 2024 06:41:08 GMT
      Connection: keep-alive
      ETag: "65950184-24cb"  
      Expires: Mon, 25 Mar 2024 07:17:36 GMT
      Cache-Control: max-age=60
    */
  }
  // 订阅
  on (key:'update',fn:()=>void) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this 
  } 
  // 停止
  pause () {
    this.stop = !this.stop
  }

  get value () {
    let { oldTag , newTag , oldScript,newScript} = this 
    return {oldTag , newTag , oldScript,newScript }
  }

  // 两层对比是否有变化 
  compare () {
    if(this.stop) return 
    const oldLen = this.oldScript.length 
    const newLen = Array.from(
      new Set(this.oldScript.concat(this.newScript))
    ).length 
    if(this.oldTag !== this.newTag || newLen !== oldLen) {
      this.dispatch.update.forEach(fn=>fn())
    }
  }
  
  // 检查更新
  async check (){
    const newHtml = await this.getHtml() 
    this.newScript = this.parserScript(newHtml)
    this.newTag = await this.getTag() 
    this.compare()
  }

}


```
``` typescript 
// router.ts 

import { Monitor } from './monitor' 

const m = new Monitor() 

m.on('update',()=>{
  console.log('更新数据',m.value)
  Modal.confirm({
    title: '更新提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '版本有更新，是否刷新页面！',
    okText: '刷新',
    cancelText: '不刷新',
    onOk() {
      // 更新操作
      location.reload()
    },
    onCancel() {
      monitor.pause()
    }, 
  })
})

router.beforeEach((t,f,n)=>{
  m.check()
})

```