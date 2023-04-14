### 
1. 初始化 node 18.1.0
  ``` yarn init -y 

2. 创建子包 

> 在根目录下创建 packages 并在 packages下创建其它子包

> packages 
  >> reactivity 
    >>> src 
      >>>> index.ts
    >>> package.json
  >> shared 
    >>> src 
      >>>> index.ts 
    >>> package.json  
    
3. install typescript 并生成tsconfig 
  + a. packages目录下所有的文件都要用 ts 所以在根目录下安装 typescript 
    ``` yarn add typescript -D -W (package.json 中有 workspaces 所以要添加-W) ```
  + b. 通过 tsc --init 生成tsconfig.json   

4. rollup 

``` yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D -W ```

5. 打包前配置 
*** packages.json 子包中的 *** 

``` json 
"buildOptions" : {
    "name" : "VueReactivity" , // 包名
    "formats" : [
      "esm-bundler" ,   // es6 => es5
      "esm-browser" ,   // 用于通过原生ES模块导入使用 (在浏览器中通过 <script type="module"> 来使用)
      "cjs" ,           // commonjs
      "global"          // 全局js 挂在window 上
    ]
  }

```

6. rollup 并行打包 

  1. package.json 添加 
  ```
    scripts : {
      build:"node scripts/build "
    }

  ```
  2. 根目录下创建 scripts/build.js 

  3. scripts/build.js

  ```javascript 
      const fs = require('fs')

      // 获取packages中的文件夹
      const dirs = fs.readdirSync('packages').filter(p => {
        if (!fs.statSync(`packages/${p}`).isDirectory()) {
          return false
        }
        return true
      })

      // 进行打包
      async function build(target) {
        const { execa } = await import('execa')
        console.log(16, 'build')
        // execa 打包 参数 打包方式 ， [-c rollup环境配置  , 环境变量 -env ] 
        await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
      }



      async function runBuild(dirs, itemFn) {
        let result = []
        for (let dir of dirs) {
          result.push(itemFn(dir))
        }
        return Promise.all(result)
      }

      runBuild(dirs, build).then(() => {
        console.log('success')
      })

      console.log(13, dirs)

  ```

  4. 根目录下添加 rollup.config.js

  ```javascript 

      const { log } = console

      // import ts from 'rollup-plugin-typescript2'  // 解析ts rollup 3不支持
      // import json from '@rollup/plugin-json'   // 解析
      // import resolvePlugin from '@rollup/plugin-node-resolve' // 解析三方插件

      const ts = require('rollup-plugin-typescript2')  // 解析ts
      const json = require('@rollup/plugin-json')
      const resolvePlugin = require('@rollup/plugin-node-resolve') // 解析三方插件


      const path = require('path')

      let packagesDir = path.resolve(__dirname, 'packages')  // packages

      let packageDir = path.resolve(packagesDir, process.env.TARGET) // packages 下的子包 如reactivity

      const resolve = p => path.resolve(packageDir, p)
      const pkg = require(resolve(`package.json`))

      const packageOptions = pkg.buildOptions || {}

      const filename = packageOptions.filename || path.basename(packageDir)  // 包名 文件名
      const fnName = packageOptions.name || path.basename(packageDir)  // 方法名 打包后的方法名 如 VueReactivity 
      const defaultFormats = ['esm-bundler', 'cjs']
      const packageFormats = packageOptions.formats || defaultFormats

      // 输出  
      const outputOptions = {
        'esm-bundler': {
          file: resolve(`dist/${filename}.esm-bundler.js`),
          format: `es`
        },
        'esm-browser': {
          file: resolve(`dist/${filename}.esm-browser.js`),
          format: `es`
        },
        cjs: {
          file: resolve(`dist/${filename}.cjs.js`),
          format: `cjs`
        },
        global: {
          file: resolve(`dist/${filename}.global.js`),
          format: `iife`
        },
        // runtime-only builds, for main "vue" package only
        'esm-bundler-runtime': {
          file: resolve(`dist/${filename}.runtime.esm-bundler.js`),
          format: `es`
        },
        'esm-browser-runtime': {
          file: resolve(`dist/${filename}.runtime.esm-browser.js`),
          format: 'es'
        },
        'global-runtime': {
          file: resolve(`dist/${filename}.runtime.global.js`),
          format: 'iife'
        }
      }


      function createConfig(format, output, plugins = []) {
        output.name = fnName  // 打包后的方法名 如 VueReactivity 
        output.sourcemap = true

        return {
          input: resolve('src/index.ts'),
          output,
          plugins: [
            json(),
            ts({
              tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin()
          ]
        }
      }
      console.log(79, packageFormats)
      const packageConfigs = packageFormats.map(f => createConfig(f, outputOptions[f]))

      console.log(82, packageConfigs)

      exports.default = packageConfigs
      // rollup 导出配置
      // export default packageConfigs


  ```










