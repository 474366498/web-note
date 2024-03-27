

const { defineConfig } = require('@vue/cli-service')
// vue.config.js的详解 https://blog.csdn.net/Litt_White/article/details/128725823



// console.log(2, defineConfig({ transpileDependencies: true }))
// module.exports = defineConfig({
//   transpileDependencies: true
// })
//  npm install terser-webpack-plugin  --save-dev
// cnpm install compression-webpack-plugin@6.1.1 -D       gzip压缩插件，需要引入
// cnpm i image-webpack-loader@8.1.0 --save-dev           图片压缩，不需要引入
// npm i webpack-bundle-analyzer@4.7.0 --save-dev         打包分析插件
// npm i speed-measure-webpack-plugin -D                  打包时间
// npm i hard-source-webpack-plugin -D                    构建时进行缓存

const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const webpack = require('webpack')

const VersionPlugin = require('./plugins/version')


const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i    // 开启gzip压缩 按需写入
const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : './'
const path = require('path')

const bit = 1024

// console.log(31, webpack)

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',   // 生产环境不进行eslint 校检
  productionSourceMap: false,                          // 生产环境是否生成sourceMap文件
  assetsDir: '',                                     // 静态文件

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {

    }
  },

  chainWebpack: config => {
    // 移除 preload （预加载）插件
    config.plugins.delete('preload')
    // 移除prefetch（预取）插件
    config.plugins.delete('prefetch')

    if (isProduction) {
      // 生产环境下 压缩图片  
      /* deprecate
      报莫名其妙的错
      Syntax Error: Error: 'E:\web-note\note\vue\version\node_modules\.store\pngquant-bin@6.0.1\node_modules\pngquant-bin\vendor\pngquant.exe' �����ڲ
����ⲿ���Ҳ���ǿ���
      解决方法：
      1.卸载了再重新安装image-webpack-loader
      2. 最好是把node_modules删除 清空缓存 npm cache clean --force 再重新用 cnpm 跑安装 
      */
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          },
          bypassOnDebug: true
        })
        .end()
    }
  },

  configureWebpack: config => {
    // 生产 开发都有的配置
    config.devtool = 'source-map'
    // 开启缓存 HardSourceWebpackPlugin 用了就报错
    // const cache = new HardSourceWebpackPlugin()
    // config.plugins.push(
    //   new HardSourceWebpackPlugin()
    // )
    // HardSourceWebpackPlugin 无效 使用其它插件
    config.cache = {
      type: 'filesystem',
      allowCollectingMemory: true
    }

    // 配置别名
    Object.assign(config.resolve, {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    })

    // 生产环境
    if (isProduction) {
      // console.log(79, config)
      // 添加webpack插件
      config.plugins.push(
        new SpeedMeasurePlugin(),    // 构建时间
        // new BundleAnalyzerPlugin(),    // 构建体积
        // 一些依赖，咱们也许只是用到了一部分，不必所有解析，好比moment中的语言包，咱们通常只用中文包就够了，因此能够这样配置：
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
        new VersionPlugin()
      )

      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 1e6,     // 根据入口起点的最大体积，控制 webpack 何时生成性能提示。
        maxAssetSize: 3e6          // 根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示。
      }

      // 生产环境 优化打包chunk-vendors.js 文件体积过大
      Object.assign(config.optimization, {
        runtimeChunk: 'single',
        // 默认的splitChunks会全部清空
        splitChunks: {
          chunks: 'all',
          minSize: 2e1 * bit, // chunks超过20kb将被单独打包

          // 对node_modules下的库单独打包 可根据打包后的体积做判断是否开启
          cacheGroups: {
            // 默认的vendor.js
            vendor: {
              test: /[\\/]node_modules[\\/]/,  // 匹配映射文件
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // console.log(112, packageName)
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      })
      // 移除console.log
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      )
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

      // 添加gzip压缩插件
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 1e1 * bit, // 只有大小大于该值的资源会被处理
          minRatio: .8,       // 只有压缩率小于这个值的资源才会处理
        })
      )

    }

  },

  // css 相关

  css: {
    loaderOptions: {
      // 启用less中javascript支持 
      less: {
        // less-loader 配置项 详见 https://www.webpackjs.com/loaders/less-loader/#lessoptions
        javascriptEnabled: true
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {

  }


}
