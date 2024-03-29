

 ## vite.config
[!vite 文档](https://www.vitejs.net/config/)

[!Vite 配置篇：日常开发掌握这些配置就够了！](https://www.51cto.com/article/742582.html)
``` javascript 
// vite.config.js
import { defineConfig } from 'vite' // 使用 defineConfig 工具函数获取类型提示：
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  base: '/foo/', // 开发或生产环境服务的公共基础路径
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  css: {
    preprocessorOptions: {
      scss: {
        // .scss 全局预定义变量 引入多个文件以;(分号分割)
        additionalData: `@import '/src/assets/styles/variables.scss';` // 引入全局变量文件
      }
    },
    postcss: {
      plugins: [
        // viewport 布局适配
        postcssPxToViewport({
          viewportWidth: 375
        })
      ]
    },
    // 可以查看css的源码
    devSourcemap:true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    },
    extensions: ['.js', '.ts', '.json'] // 导入时想要省略的扩展名列表
  },
  server: {
    host: true, // 监听所有地址
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  },
  build: {
    outDir: 'build', // 打包文件的输出目录
    assetsDir: 'static', // 静态资源的存放目录
    assetsInlineLimit: 4096 // 图片转 base64 编码的阈值
  },
  plugins: [
    vue(),
    viteMockServe()
  ]
})

```

[!vue3中vite.config.js文件常用配置](https://blog.csdn.net/xu1912715645/article/details/135444266)

配置 
  1. root 
  指定项目的根目录
  2. base 
  该选项指定应用的基础路径，通常用于将应用部署到非根目录的情况
    a. 绝对 URL 路径名，例如 /foo/
    b. 完整的 URL，例如 https://foo.com/
    c. 空字符串或 ./（用于开发环境）
  3. publicDir 
  该选项指定静态资源文件夹 默认为public 在public文件夹中的内容被复制到输出目录
  4. plugins 
  配置vite插件 可以是一个数组 
  5. optimizeDeps 
  配置第三方模块的优化策略
  6. server 
  用于配置开发服务器 包括端口 代理等 
  7. build 
  用于配置生产构建相关的选项 如输出目录 代码压缩等
  8. resolve
  配置模块解析规则 如设置别名


## vite打包配置以及性能优化
[!vite打包配置以及性能优化](https://blog.csdn.net/qq_43940789/article/details/132325840)

``` c  
  vite 4.4.6 
  vite-plugin-html 3.2.0 
  @vitejs/plugin-vue 4.2.3

```


``` typescript 

import { resolve } from 'path' 
import { loadEnv } from 'vite' 
import vue from '@vitejs/plugin-vue' 
import { createHtmlPlugin } from 'vite-plugin-html' 

// npm i rollup-plugin-visualizer -D 打包体积分析插件
import { visualizer } from 'rollup-plugin-visualizer'

// npm i vite-plugin-css-injected-by-js 减少http接口请求 但是css中的背景图片路径会出错 选择性使用
// https://www.npmjs.com/package/vite-plugin-css-injected-by-js
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// npm i vite-plugin-compression -D 文件压缩插件 
import viteCompression from 'vite-plugin-compression'


// npm i vite-plugin-imagemin -D 图片压缩 国外资源 
import viteImagemin from 'vite-plugin-imagemin'

import type { UserConfig , ConfigEnv } from 'vite'

function pathResolve(dir:string) {
  return resolve(__dirname ,'.',dir)
}

export default ({mode}:ConfigEnv) : UserConfig => {

  const root = process.cwd() 
  const env = loadEnv(mode,root) 
  // 应该来自 .env 
  const { 
    VITE_APP_TITLE ,
    VITE_OUT_DIR ,
    VITE_PORT ,
    VITE_PUBLIC_PATH ,
    VITE_APP_PROXY  
  } = env
  
  return {
    base : VITE_PUBLIC_PATH ,
    // 配置模块解析规则
    resolve : {
      alias : {
        '/@' : pathResolve('src')
      }
    },
    server : {
      open : true ,
      port : Number(VITE_PORT) ,
      hmr : {
        overlay : true 
      },
      proxy : {
        '/api' : {
          target : VITE_APP_PROXY ,
          changeOrigin : true ,
          rewrite : path => path.replace(/&\/api/,'')
        }
      }
    },

    build : {
      outDir : VITE_OUT_DIR ,
      sourcemap : true ,
      target :['es2020'] ,
      chunkSizeWarningLimit : 1e3 ,
      minify : 'terser' ,   // 压缩方式
      terserOptions : {
        compress : {
          drop_console : true ,
          drop_debugger:true 
        }
      }
    },

    plugins : [
      vue() ,
      createHtmlPlugin({
        minify : mode === 'production' ,
        inject : {
          data : {
            title : VITE_APP_TITLE ,
            vueScript :'<script src="https://unpkg.com/vue@3.1.5/dist/vue.global.js?"></script>' 
            // vueScript 在入口html 中引用  
            /** html
              <head>
                <%- vueScript %>
              </head>
             */
          }
        }
      }),
      visualizer({open:true}) , // 打包体积分析插件
      cssInjectedByJsPlugin(), // 减少资源http接口
      viteCompression({
        verbose : true ,      // 是否在控制台输出压缩结果
        disable : false ,
        threshold:10240 ,     // 如果体积大于阈值将被压缩 体积过小时压缩可能适得其反
        algorithm:'gzip' ,    // 压缩算法 可选['gzip','brotliccompress','deflate','deflateRow']
        ext :'.gz' ,
        deleteOriginFile : false // 源文件压缩后是否删除
      }),
      viteImagemin({
        gifsicle : {
          optimizationLevel : 7 ,
          interlaced :false 
        },
        optipng : {
          optimizationLevel : 7 
        },
        mozjpeg: {
          quality : 20 
        },
        pngquant : {
          quality : [.8,.9] ,
          speed : 4
        },
        svgo : {
          plugins : [
            {
              name :'removeViewBox'
            },
            {
              name :'removeEmptyAttrs' ,
              active : false 
            }
          ]
        }
      })
    ]

  }
}

``` 
[!WEBPACK、VITE 常用配置（对照）及迁移指南](https://blog.csdn.net/ssrc0604hx/article/details/130453970)
[!vue.config.js的详解(vue-cli)](https://blog.csdn.net/Litt_White/article/details/128725823)


