

// import typescript from 'rollup-plugin-typescript2'    //解析 ts
// import json from '@rollup/plugin-json'          //解析 json
// import resolvePlugin from '@rollup/plugin-node-resolve'   // 解析第三方插件
// import path from 'path'
const typescript = require('rollup-plugin-typescript2')
const json = require('@rollup/plugin-json')
const resolvePlugin = require('@rollup/plugin-node-resolve')
const path = require('path')

// 获取文件路径
let packagesDir = path.resolve(__dirname, 'packages')


// 获取需要打的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve('package.json'))  // 获取子包 json
const packageOptions = pkg.buildOptions || {}
const name = path.basename(packageDir)   // 文件夹名

// console.log('config ', packageDir, process.env, name)

// 创建打包映射表

const outputOptions = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es'
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}

// const options = pkg.buildOptions

// rollup 导出配置
// export default packageOptions.formats.map(format => createConfig(format, outputOptions[format]))

module.exports = packageOptions.formats.map(format => createConfig(format, outputOptions[format]))

function createConfig(format, output) {
  output.name = packageOptions.name
  output.sourcemap = true
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      resolvePlugin()
    ]
  }
}



