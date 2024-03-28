

// https://zhuanlan.zhihu.com/p/380783632
// https://webpack.docschina.org/concepts/plugins/#anatomy
// https://webpack.docschina.org/api/compiler-hooks/

const fs = require('fs'),
  path = require('path')

function resolve(d) {
  return path.join(__dirname, d)
}


class RobotPlugin {
  apply(compiler) {
    // console.log('hooks:', compiler.hooks)
    let keys = []
    for (let key in compiler.hooks) {
      // console.log(12, key)
      keys.push(key)
    }
    console.log(16, keys)
    /* 钩子函数顺序
      environment
      afterEnvironment
      entryOption
      afterPlugins
      afterResolvers
      initialize
      beforeRun
      run
      readRecords
      normalModuleFactory
      contextModuleFactory
      beforeCompile
      compile
      thisCompilation
      compilation
      make
      normalModuleFactory
      contextModuleFactory
      beforeCompile
      compilation     
      infrastructureLog
      assetEmitted
      afterEmit
      emitRecords
      done 
      infrastructureLog
      shutdown
      afterDone
    */
    compiler.hooks.done.tap('robot plugin', compilation => {
      // VUE_APP_TARGET_ENVIRONMENT 对应不通的部署环境如：开发环境，集成环境，生产环境
      this.notify(process.env.VUE_APP_TARGET_ENVIRONMENT);
    });
    compiler.hooks.afterDone.tap('version plugin', () => {
      let f = fs.readdirSync(resolve('../dist'))
      if (f) {
        createVersionFile()
      }
      console.log(59, f)
    })
  }
  notify(env) {
    // do something
    console.log(13, 'notify')
  }
}

function createVersionFile() {
  /*
  let fileCont = fs.readFileSync(resolve('../package.json'), 'utf-8')
  let version = JSON.parse(fileCont).version || '0-0'
  console.log(version)
  let writeCont = `window.appInfo = {
    version:'${version}',
    buildTime : ${Date.now()}
  }`
  fs.writeFileSync(resolve('../dist/version.js'), writeCont)
  */

  fs.readFile(resolve('../package.json'), 'utf-8', (err, data) => {
    if (err) return
    let version = JSON.parse(data).version || '0.0.1'
    let writeJson = `{
      "version":"${version}",
      "buildTime" : ${Date.now()}
    }`
    let writeCont = `window.appInfo = ${writeJson}`
    fs.writeFile(resolve('../dist/version.json'), writeJson, (error) => {
      if (error) {
        console.log(81, err)
        return
      }
      console.log('写入json成功！')
    })
    fs.writeFile(resolve('../dist/version.js'), writeCont, (error) => {
      if (error) {
        console.log(81, err)
        return
      }
      console.log('写入js成功！')
      mergeFileContent()
    })
  })

}
// 合并代码内容
function mergeFileContent() {
  let html = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')
  let newHtml = html.replace('<body>', `<script id="app-version-s" src="./version.js?${Date.now()}"></script><body>`)
  fs.writeFileSync(resolve('../dist/index.html'), newHtml)
  console.log(newHtml)
}
// createVersionFile()

module.exports = RobotPlugin