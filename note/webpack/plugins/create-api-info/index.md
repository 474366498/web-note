

## why 
1. 打包的时候要放在不同的服务器地址 每个服务器地址都不相同 从而导致前端api调用的地址也不相同

``` javascript
//  vue.config.js 

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 自定义 config.js
const UserCreateApiInfo = require('./create-api-info.js')
const { version } = require('./package.json')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const timeStamp = new Date().getTime()
const { VUE_APP_BASE_API, VUE_APP_SOCKET_API } = process.env
let api = VUE_APP_BASE_API,
  sockApi = VUE_APP_SOCKET_API
console.log(api, sockApi)
const apiInfo = `window.api={
  apiURL : '${api}',
  websocketURL : '${sockApi}'
}`
let apiSplit = api.match(/\.[0-9]{1,}/g)
console.log(21, apiSplit)
let suffix = apiSplit ? apiSplit[apiSplit.length - 1].replace('.', '-') : ''
let outputDir = process.env.NODE_ENV === 'development' ? 'dist' : 'client' + suffix
module.exports = {
  publicPath: '/admin',
  outputDir:
    process.env.NODE_ENV === 'development' ? 'dist' : 'client' + suffix,
  assetsDir: './static',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Pages',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: process.env.NODE_ENV === 'development' ? 'warning' : false,
  productionSourceMap: false,
  chainWebpack: config => {
    // console.log(34, config)
    config.resolve.alias.set('@', resolve('src'))
    // modules es6 => es5
    config.resolve.alias.set('querystring', 'querystring-browser')
  },

  devServer: {
    https: false,
    open: false,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: api,
        changeOrigin: true
      }
      // '/ip': {
      //   // http://pv.sohu.com/cityjson?ie=utf-8 IP 地址
      //   target: 'http://pv.sohu.com',
      //   ws: true,
      //   changOrigin: true, //允许跨域
      //   pathRewrite: {
      //     '^/ip': '' //请求的时候使用这个api就可以
      //   }
      // }
    }
  },

  configureWebpack: config => {
    // babel es6 => es5
    // config.entry.app = ['babel-polyfill', './src/main.js']
    if (process.env.NODE_ENV === 'production') {
      const productionGzipExtensions = ['html', 'js', 'css']
      Object.assign(config, {
        entry: {
          ...config.entry,
          app: ['babel-polyfill', './src/main.js']
        },
        output: {
          ...config.output,
          filename: `static/js/[name].[${version}].[chunkhash:12].js?time=${timeStamp}`,
          chunkFilename: `static/js/[name].[${version}].[chunkhash:12].js?time=${timeStamp}`
        },
        plugins: [
          ...config.plugins,
          // 去除console
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_debugger: true,
                dead_code: true,
                drop_console: true,
                pure_funcs: ['console.log']
              },
              warnings: false
            },
            sourceMap: false,
            parallel: true
          }),

          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240, // 只有大小大于该值的资源会被处理 10240
            minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
            deleteOriginalAssets: false // 删除原文件
          }),
          // 这个就是单独写的一个生成文件 写入数据的class类plugin 
          new UserCreateApiInfo({
            entryFile: `./env.prod`,        // 入口文件 路径
            entryText: `${apiInfo}`, // 入口内容 （写入内容）
            filePath: `./${outputDir}/`, //输出路径
            fileName: 'config.js',       // 写入文件名
            editFile: `./${outputDir}/index.html`, // 编辑文件
            editKey: 'config.js'  // 编辑文件 关键字
          })
        ]
      })
    }
  }
}

``` 

``` javascript 
// https://www.jianshu.com/p/04eda3f5d174
// https://blog.csdn.net/qq_41968486/article/details/125427031
// https://juejin.cn/post/6844904018666323975
// https://webpack.docschina.org/api/compiler-hooks/

const path = require('path')
const fs = require('fs')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 创建新文件 js
function createFile(filePath, fileName, fileCont) {
  console.log(22, filePath + fileName, fileCont)
  fs.writeFileSync(filePath + fileName, fileCont)
}
// 改写文件 html 添加 link script
function readWriteFile(path, key) {
  let _file = fs.readFileSync(path).toString()
  let flg = _file.search(key) > 0
  if (!flg) {
    let isJs = /\.js/.test(key)
    let _fileArr = _file.split("</head>")
    let addText = '',
      newFile = ''
    if (isJs) { // 添加js
      addText = `<script id="config" src="./${key}" ></script>`
    } else { // 添加其它
      addText = `<link id="config" href="./${key}" rel="stylesheet" />`
    }
    console.log('添加一个', isJs)
    newFile = _fileArr.reduce((str, item, index) => {
      str += index < 1 ? item : addText + '' + item
      return str
    }, '')
    console.log(15, flg, newFile)
    fs.writeFileSync(path, newFile)
  }

}
class UserCreateApiInfo {
  constructor(options) {
    console.log(3, options)
    let {
      filePath,
      entryFile,
      entryText,
      fileName,
      editFile,
      editKey
    } = options
    if (filePath && (entryFile || entryText)) {
      this.filePath = filePath
      let fileCont
      try {
        fileCont = fs.readFileSync(entryFile)
      } catch (error) {
        fileCont = entryText
      }
      this.fileCont = fileCont
      this.fileName = fileName || 'config.js'
    } else {
      throw new Error('没有文件路径和文件内容')
    }
    if (editFile &&
      editKey) {
      this.editFile = editFile
      this.editKey = editKey
    } else {
      throw new Error('编辑文件 、关键字')
    }
    console.log(36, this)
  }
  apply(compiler) {
    let {
      filePath,
      fileCont,
      fileName,
      editFile,
      editKey
    } = this
    compiler.plugin('afterEmit', function (compilation) {
      console.log(46, 'afterEmit')
    })
    compiler.plugin('done', function () {
      console.log(7, 'done')
      setTimeout(() => {
        // 生成文件
        if (filePath && fileCont) {
          createFile(filePath, fileName, fileCont)
        }
        if (editFile && editKey) {
          readWriteFile(editFile, editKey)
        }
      }, 5000)
    })
  }
}
module.exports = UserCreateApiInfo


```