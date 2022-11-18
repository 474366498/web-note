### 课件信息
视频来源 [blili](https://www.bilibili.com/video/BV14T4y1z7sw?p=2&vd_source=8ddee7f1deaf1d90faf44a79c835fbc8)

老师的Webpack5的资料[link](https://pan.baidu.com/s/114lJRGua2uHBdLq_iVLOOQ) 提取码：yyds



#### 1.基本使用
  npm i webpack webpack-cli 

 development / production 
 1. 打包某个单独的文件
  ``` javascript 
    npx webpack ***(文件路径) --mode-development/production 

  ```

#### 2.基本配置

entry 
output 
loader => module 
plugins 
mode 


``` javascript 

    module.exports = {
      entry : '' ,
      output : {
        path : '' ,
        filename :''
      },
      module : {
        rules : []
      },
      plugins : [] ,
      mode:''
    }

```


#### 3.样式处理

``` javascript 

    module.exports = {
      entry : '' ,
      output : {
        path : '' ,
        filename :''
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          }
        ]
      },
      plugins : [] ,
      mode:''
    } 


```




#### 4.图片文件处理

``` javascript 

    module.exports = {
      entry : '' ,
      output : {
        path : '' ,
        filename :''
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            }
          }
        ]
      },
      plugins : [] ,
      mode:''
    } 


```


#### 5.输出处理

 [webpack](https://www.webpackjs.com/guides/asset-modules/)

``` javascript 
    const path = require('path')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : ''
            }
          }
        ]
      },
      plugins : [] ,
      mode:''
    } 


```




#### 6.字体(ttf|woff)处理

 [webpack](https://www.webpackjs.com/guides/asset-modules/)

``` javascript 
    const path = require('path')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?)$/ ,
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          }
        ]
      },
      plugins : [] ,
      mode:''
    } 


```
##### 注 
  1.  *_asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。_* 
  2.  *_asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。_*
  3.  *_asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。_* <font color=#ff0000> 源代码输出 </font>
  4.  *_asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。_* <font color=#ff0000>会对文件进行转换 </font>












#### 7.其它资源处理

``` javascript 
    const path = require('path')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          }
        ]
      },
      plugins : [] ,
      mode:''
    } 


```

#### 7.项目 eslint 
*_.eslintrt_*
##### *_.eslintrc.js_*
*_.eslintrc.json_*

[更多eslint规则](https://eslint.bootcss.com/docs/user-guide/configuring)
[规则文档](https://eslint.bootcss.com/docs/rules/)
```js
    module.exports = {
      // 解析选项
      parserOptions: {
        ecmaVersion: 6, // ES 语法版本
        sourceType: "module", // ES 模块化
        ecmaFeatures: { // ES 其他特性
          jsx: true // 如果是 React 项目，就需要开启 jsx 语法
        }
      },

      // 规则检查
      rules : {

      }
      // 引用 继承其它规则
      extends : []
    }





```
现有以下较为有名的规则：

- [Eslint 官方的规则](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
- [Vue Cli 官方的规则](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
- [React Cli 官方的规则](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`



```:no-line-numbers
npm i eslint-webpack-plugin eslint -D
```




``` javascript 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        })
      ] ,
      mode:''
    } 

```

##### 新建文件 .eslintignore 配置忽略的文件

```:no-line-numbers
dist 
node-modules

```

#### 8.项目 Babel  

```:no-line-numbers
  npm i babel-loader @babel/core @babel/preset-env 

```

1. 配置文件方式

  - `babel.config.*`：新建文件，位于项目根目录
    - `babel.config.js`
    - `babel.config.json`
  - `.babelrc.*`：新建文件，位于项目根目录
    - `.babelrc`
    - `.babelrc.js`
    - `.babelrc.json`
  - `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写



babel.config.js
``` js
  module.exports = {
    // 
    preset:['@babel/preset-env']  //  @babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript。 @babel/preset-react：一个用来编译 React jsx 语法的预设 @babel/preset-typescript：一个用来编译 TypeScript 语法的预设
  }

``` 


webpack.config.js
``` javascript 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        })
      ] ,
      mode:''
    } 

```



#### 9.项目Html 配置  

[plugin options](https://github.com/jantimon/html-webpack-plugin#options)

```:no-line-numbers
  npm i html-webpack-plugin

```
webpack.config.js
``` javascript 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        })
      ] ,
      mode:''
    } 

```


#### 10.项目热启动 自动化


```:no-line-numbers

  npm i webpack-dev-server

```

webpack.config.js
``` javascript 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      devServer:{
        host : 'localhost' , // 启动域名
        port : '9999' ,   // 启动端口
        open : true   // 是否自动打开默认浏览器
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:['style-loader' , 'css-loader']    // npm i style-loader css-loader
          } ,
          {
            test:/\.less$/ ,
            use:['style-loader','css-loader','less-loader'] // npm i less-loader
          } ,
          {
            test:/\.s[ac]ss$/,
            use:['style-loader','css-loader','sass-loader'] // npm i sass-loader sass
          },
          {
            test:/\.styl$/,
            use:['style-loader','css-loader','stylus-loader'] // npm i stylus-loader
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        })
      ] ,
      mode:'production'
    } 

```



#### 11.项目Css处理

  ##### A.提取成单独文件

  ```:no-line-numbers

    npm i mini-css-extract-plugin 

  ```
  *_webpack.prod.js_* 

  ```js 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')  


    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      devServer:{
        host : 'localhost' , // 启动域名
        port : '9999' ,   // 启动端口
        open : true   // 是否自动打开默认浏览器
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:[
                MiniCssExtractPlugin.loader , // 替换原来的style-loader
                'css-loader'
              ]    
          } ,
          {
            test:/\.less$/ ,
            use:[
              MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              'less-loader'
              ] 
          } ,
          {
            test:/\.s[ac]ss$/,
            use:[
             MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              'sass-loader'
              ] 
          },
          {
            test:/\.styl$/,
            use:[
              MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              'stylus-loader'
              ] 
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        }),
        new MiniCssExtractPlugin({
          filename : 'css 打包后的单独文件路径 + 文件名'
        })
      ] ,
      mode:'production'
    } 

  ```


  ##### B.兼容性处理

  ```:no-line-numbers

    npm i postcss-loader postcss postcss-preset-env

  ```


  *_webpack.prod.js_*

   ```js 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')  


    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      devServer:{
        host : 'localhost' , // 启动域名
        port : '9999' ,   // 启动端口
        open : true   // 是否自动打开默认浏览器
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use:[
                MiniCssExtractPlugin.loader , // 替换原来的style-loader
                'css-loader',
                {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                }
              ]    
          } ,
          {
            test:/\.less$/ ,
            use:[
              MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                }
              'less-loader'
              ] 
          } ,
          {
            test:/\.s[ac]ss$/,
            use:[
             MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                }
              'sass-loader'
              ] 
          },
          {
            test:/\.styl$/,
            use:[
              MiniCssExtractPlugin.loader , // 替换原来的style-loader
              'css-loader',
              {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                }
              'stylus-loader'
              ] 
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        }),
        new MiniCssExtractPlugin({
          filename : 'css 打包后的单独文件路径 + 文件名'
        })
      ] ,
      mode:'production'
    }

  ```

  <font>我们可以在 package.json 文件中添加 browserslist 来控制样式的兼容性做到什么程度。</font>

  [browserslist 文档](https://github.com/browserslist/browserslist)

  *_package.json_*

  ```json
    {
      ... ,
      "browserslist" : [    //兼容性做到什么程度
        "last 2 version" ,  // 各种浏览器的最后两个版本
        "> 2%" ,            // 浏览器市场上百分之(100 - 2)
        "not dead"          // 已经退出的不管了
      ]
    }
  ```




*_webpack.prod.js 合并配置项_*

   ```js 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')  

    /*
    * preProcessor 额外的css相关loader
    */
    const getStyleLoaderUser = (preProcessor) =>{
      return [
                MiniCssExtractPlugin.loader , // 替换原来的style-loader
                'css-loader',
                {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                },
                preProcessor
              ].filter(Boolean)
    }


    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      devServer:{
        host : 'localhost' , // 启动域名
        port : '9999' ,   // 启动端口
        open : true   // 是否自动打开默认浏览器
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use: getStyleLoaderUser()  
          } ,
          {
            test:/\.less$/ ,
            use:getStyleLoaderUser('less-loader')
          } ,
          {
            test:/\.s[ac]ss$/,
            use:getStyleLoaderUser('sass-loader')
          },
          {
            test:/\.styl$/,
            use:getStyleLoaderUser('stylus-loader')
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        }),
        new MiniCssExtractPlugin({
          filename : 'css 打包后的单独文件路径 + 文件名'
        })
      ] ,
      mode:'production'
    }

  ```

  ##### C.压缩处理
  
  ```:no-line-numbers 

    npm i css-minimizer-webpack-plugin 

  ```

  *_webpack.prod.js_*
  ```js 
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')  
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
    /*
    * preProcessor 额外的css相关loader
    */
    const getStyleLoaderUser = (preProcessor) =>{
      return [
                MiniCssExtractPlugin.loader , // 替换原来的style-loader
                'css-loader',
                {
                  loader:'postcss-loader' ,
                  options : {
                    postcssOptions : {
                      plugins : [
                        'postcss-preset-eng' , // 能解决大多数样式兼容性问题
                      ]
                    }
                  }
                },
                preProcessor
              ].filter(Boolean)
    }


    module.exports = {
      entry : '' ,
      output : {
        // js 打包输出文件路径
        path : path.resolve(__dirname,'js') ,
        filename :'' ,
        // 文件(图片)输出  
        assetModuleFilename :'image/[hash][ext][query]' ,
        // 清空上次打包内容
        clean : true    
      },
      devServer:{
        host : 'localhost' , // 启动域名
        port : '9999' ,   // 启动端口
        open : true   // 是否自动打开默认浏览器
      },
      module : {
        rules : [
          {
              test:/\.css$/ ,
              use: getStyleLoaderUser()  
          } ,
          {
            test:/\.less$/ ,
            use:getStyleLoaderUser('less-loader')
          } ,
          {
            test:/\.s[ac]ss$/,
            use:getStyleLoaderUser('sass-loader')
          },
          {
            test:/\.styl$/,
            use:getStyleLoaderUser('stylus-loader')
          },
          {
            test:/\.(png|gif|jpg)$/,
            type:'asset' ,    // webpack 5 将  file-loader 和 url-loader 已经内置到webpack中
            parser:{
              dataUrlCondition : {
                maxSize:10 * 1024  // 小于10kb的文件转成base64 
              }
            },
            generator : {
              // 文件输出
              filename : 'static/image/[hash][ext][query]'
            }
          },
          {
            test:/\.(ttf|woff2?|mp3|mp4|avi)$/ ,   //字体文件 其它音视频文件  原文件转出
            type:'asset/resource' ,
            generator : {
              filename : 'static/font/[hash][ext][query]'

            }
          },
          {
            test:/\.js$/,
            // 排除检查的文件目录
            exclude:/node_modules/,
            loader:'babel-loader' ,
            preset:['@babel/preset-env']
          }
        ]
      },
      plugins : [
        new ESLintWebpackPlugin({
          // 指定检查的文件目录
          context : path.resolve(__dirname,'src')
        }),
        new HtmlWebpackPlugin({   // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
          template : path.resolve(__dirname,'html文件路径')
        }),
        new MiniCssExtractPlugin({
          filename : 'css 打包后的单独文件路径 + 文件名'
        }),
        new CssMinimizerPlugin() 
      ] ,
      mode:'production'
    }

  ```



#### 12.简单总结

  1. 两种开发模式

  - 开发模式：代码能编译自动化运行
  - 生产模式：代码编译优化输出

  2. Webpack 基本功能

  - 开发模式：可以编译 ES Module 语法
  - 生产模式：可以编译 ES Module 语法，压缩 js 代码

  3. Webpack 配置文件

  - 5 个核心概念
    - entry
    - output
    - loader
    - plugins
    - mode
  - devServer 配置

  4. Webpack 脚本指令用法

  - `webpack` 直接打包输出
  - `webpack serve` 启动开发服务器，内存编译打包没有输出















