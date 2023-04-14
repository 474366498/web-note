
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




