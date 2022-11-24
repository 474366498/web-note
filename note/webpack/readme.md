

#### SourceMap 

  *_在调试时 通过sourceMap 生成准确的错误提示，来帮助我们更好的开发代码_*
  [SourceMap](https://webpack.docschina.org/configuration/devtool/)
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
      mode:'production' ,
      devtool : 'source-map' , // production => source-map , development => cheap-module-source-map 
    }

  ```



#### 提高打包构建速度

  ##### A.HotModuleReplacement 
  *_ 热更新 更新修改的模块代码 _*

  ```javascript 

      const path = require('path')
      const ESLintWebpackPlugin = require('eslint-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

      const getStyleLoaderUser = (preProcessor) => {
        return [
          MiniCssExtractPlugin ,
          'css-loader' ,
          {
            loader : 'postcss-loader' ,
            options : {
              postcssOptions : {
                plugins : [
                  'postcss-preset-eng'
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
          path : path.resolve(__dirname,'js') ,
          filename : '' ,
          assetModuleFilename : 'images/[hash][ext][query]' ,
          clean : true ,
          
        },
        devServer : {
          host : 'localhost' ,
          port : '3000' ,
          open : true ,
          hot : true    // 热更新
        },
        module : {
          rules : [
            {
              test:/\.css$/,
              use:getStyleLoaderUser()
            },
            {
              test:/\.less$/,
              use:getStyleLoaderUser('less-loader')
            },
            {
              test:/\.s[a|c]ss$/,
              use:getStyleLoaderUser('sass-loader')
            },
            {
              test:/\.styl$/,
              use:getStyleLoaderUser('stylus-loader')
            },
            {
              test:/\.(png|gif|jpg)$/,
              type:'asset',
              parser:{
                dataUrlCondition : {
                  maxSize : 10*1024
                }
              },
              generator : {
                filename : 'static/image/[hash][ext][query]'
              }
            },
            {
              test:/\.(ttf|woff2?|mp3|mp4|avi)$/,
              type:'asset/resource' ,
              generator : {
                filename:'static/file/[hash][ext][query]'
              }
            },
            {
              test : /\.js$/,
              exclude:/node_modules/,
              loader:'babel-loader' ,
              preset:['@babel/preset-env']
            }

          ]
        },

        plugins : [
          new ESLintWebpackPlugin({
            context : path.resolve(__dirname,'src') // 指定检查的文件目录
          }),
          new HtmlWebpackPlugin({ // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
            template: path.resolve(__dirname,'html path')
          }),
          new MiniCssExtractPlugin({
            filename : 'css 打包后的单独文件路径 + 文件名'
          }),
          new CssMinimizerPlugin()
        ],
        mode:'production' ,
        devtool : 'cheap-module-source-map'

      }

  ```
  
  
  *_ src主入口 main.js _*
  
  ``` js 
      .... 
      // 判断是否支持 HMR(热更新)

      if(module.hot){
        module.hot.accept('热更新js文件路径',function (fn) {
          console.log('fn 热更新成功后的返回方法')
        })
      }

  ```

  *_上面这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决。 => vue-loader react-hot-loader _* 

  ##### oneOf 
  *_ 打包时每个文件都会经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要过一遍。比较慢 _*


   ```javascript 

      const path = require('path')
      const ESLintWebpackPlugin = require('eslint-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

      const getStyleLoaderUser = (preProcessor) => {
        return [
          MiniCssExtractPlugin ,
          'css-loader' ,
          {
            loader : 'postcss-loader' ,
            options : {
              postcssOptions : {
                plugins : [
                  'postcss-preset-eng'
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
          path : path.resolve(__dirname,'js') ,
          filename : '' ,
          assetModuleFilename : 'images/[hash][ext][query]' ,
          clean : true ,
          
        },
        devServer : {
          host : 'localhost' ,
          port : '3000' ,
          open : true ,
          hot : true    // 热更新
        },
        module : {
          rules : [
            {
              oneOf :[  // oneOf 
                {
                  test:/\.css$/,
                  use:getStyleLoaderUser()
                },
                {
                  test:/\.less$/,
                  use:getStyleLoaderUser('less-loader')
                },
                {
                  test:/\.s[a|c]ss$/,
                  use:getStyleLoaderUser('sass-loader')
                },
                {
                  test:/\.styl$/,
                  use:getStyleLoaderUser('stylus-loader')
                },
                {
                  test:/\.(png|gif|jpg)$/,
                  type:'asset',
                  parser:{
                    dataUrlCondition : {
                      maxSize : 10*1024
                    }
                  },
                  generator : {
                    filename : 'static/image/[hash][ext][query]'
                  }
                },
                {
                  test:/\.(ttf|woff2?|mp3|mp4|avi)$/,
                  type:'asset/resource' ,
                  generator : {
                    filename:'static/file/[hash][ext][query]'
                  }
                },
                {
                  test : /\.js$/,
                  exclude:/node_modules/,
                  loader:'babel-loader' ,
                  preset:['@babel/preset-env']
                }
              ]
            }
          ]
        },

        plugins : [
          new ESLintWebpackPlugin({
            context : path.resolve(__dirname,'src') // 指定检查的文件目录
          }),
          new HtmlWebpackPlugin({ // 更多配置内容 [options](https://github.com/jantimon/html-webpack-plugin#options)
          // 保留原有html内的书写内容 并添加动态引用资源
            template: path.resolve(__dirname,'html path')
          }),
          new MiniCssExtractPlugin({
            filename : 'css 打包后的单独文件路径 + 文件名'
          }),
          new CssMinimizerPlugin()
        ],
        mode:'production',
        devtool : 'cheap-module-source-map'
      }

  ```
  ##### include/Exclude 

  *_ include 只处理 _*
  *_ exclude 不处理 _*

  *_ webpack.production(config) _*
  ``` js
    ....
    {
      test :/\.js$/,
      exclude : /node_modules/ ,  // node_modules 目录不处理
      include : path.resolve(__dirname,'../src'), // 只处理 src目录下
      loader : 'babel-loader'
    }

  ```
  ##### Cache 

  *_ 缓存之前的Eslint检查和 Babel编译结果 _*

  *_ webpack.production(config)_*

  ```js

    .... 
    {
      test:/\.js$/,
      include : path.resolve(__dirname,'../src') ,
      loader : 'babel-loader' ,
      options : {
        cacheDirectory:true ,   // 开启babel编译缓存
        cacheCompression : false  // 缓存文件不要压缩
      }
    },
    ....
    plugins : [
      new ESLintWebpackPlugin({
        context : path.resolve(__dirname , '../src') ,
        exclude : 'node_modules' ,
        cache : true , // 开启缓存
        cacheLocation : path.resolve(__dirname , '../node_modules/.cache/.eslintcache') // 缓存目录 
      })
    ]

  ```

  ##### Thead 
  *_ 多进程打包 _*

  *_ 获取 cpu核数 _*
  
  ``` js

    const os = require('os')
    const threads = os.cpus().length 

  ```
  *_ npm i thread-loader _*


  *_ webpack.production(config)_*

  ``` js 

    const os = require('os')
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    
    // cup 核数
    const threads = os.cpus().length

    const pathFn = str => path.resolve(__dirname , str)

    const getStyleLoaders = (pre) => {

      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : [
                'postcss-preset-env'
              ]
            }
          }
        },
        pre
      ].filter(Boolean)
    }

  module.exports = {
    entry : './scr/main.js' ,
    output : {
      path : path.resolve(__dirname , '../dist') ,
      filename : 'static/js/main.js' ,
      clean : true 
    },
    module : {
      rules : [
        {
          oneOf : [
            {
              test : /\.css$/,
              use : getStyleLoaders()
            },
            {
              test : /\.less$/,
              use : getStyleLoaders('less-loader')
            },
            {
              test : /\.s[ac]ss$/,
              use : getStyleLoaders('sass-loader')
            },
            {
              test : /\.styl$/,
              use : getStyleLoaders('stylus-loader')
            },
            {
              test : /\.(png|gif|jpg)$/,
              type : 'asset' ,
              parser : {
                dataUrlCondition : {
                  maxSize : 10 * 1024
                }
              },
              generator : {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename : 'static/images/[hash:8][ext][query]'
              }
            },
            {
              test:/\.(ttf|woff2?)$/,
              type:'asset/resource' ,
              generator : {
                filename : 'static/media/[hash:8][ext][query]'
              }
            },
            {
              test:/\.js$/,
              include : pathFn('../src') ,
              use : [
                {
                  loader : 'thread-loader' ,  // 多进程
                  options : {
                    workers : threads // cpu 数量 
                  }
                },
                {
                  loader : 'babel-loader',
                  options : {
                    cacheDirectory : true 
                  }
                }
              ]
            }

          ]
        }
      ]
    }, // module
    plugins : [
      new ESLintWebpack({
        context : pathFn('../src') ,
        exclude : 'node_modules' ,
        cache : true ,
        cacheLocation : pathFn('../node_modules/.cache/.eslintcache') ,
        threads 
      }),
      new HtmlWebpackPlugin({
        template : pathFn('html 路径') 
      }),
      new MiniCssExtractPlugin({
        filename : 'static/css/main.css' 
      })
    ],
    optimization : {
      minimize : true ,
      minimizer : [
        // css压缩也可以写到optimization.minimizer里面，效果一样的
        new CssMinimizerPlugin() ,
        // / 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
        new TerserPlugin({
          parallel : threads 
        })
      ]
    },
    mode : 'production' ,
    devtool : 'source-map'
  }


  ```


#### 减少代码体积 

  ##### Tree Shaking

  `Tree Shaking` 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。

  *_ webpack 已经默认开启 _*

  ##### Babel 

  Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

  Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中。

  你可以将这些辅助代码作为一个独立模块，来避免重复引入。 

  *_  @babel/plugin-transform-runtime: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。_* 

  *_ npm i @babel/plugin-transform-runtime _*

  *_ webpack.production _*

  ``` js 

    .... 
    {
      test:/\.js$/ ,
      include : path.resolve(__dirname,'../src') ,
      use : [
        {
          loader : 'thread-loader ' ,
          options : {
            workers : threads // cpu 
          }
        },
        {
          loader : 'babel-loader ' ,
          options : {
            cacheDirectory : true ,  // 开启babel编译缓存
            cacheCompression : false , // 缓存文件不要压缩
            plugins : ['@babel-plugin-transform-runtime'] // 减少代码体积
          }
        }
      ]
    }

  ```

  ##### Image Minimizer 

  **注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。**

  *_ npm i image-minimizer-webpack-plugin imagemin _*  [webpack plugin](https://www.webpackjs.com/plugins/image-minimizer-webpack-plugin/#root)

  **无损压缩**

  *_ npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo _*

  **有损压缩**

  *_ npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo _*

  *_ webpack.production 无损压缩  _*

  ``` js 
    const os = require('os')
    const path = require('path')
    const ESLintWebpackPlugin = require('eslint-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')

    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    
    // cup 核数
    const threads = os.cpus().length

    const pathFn = str => path.resolve(__dirname , str)

    const getStyleLoaders = (pre) => {

      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : [
                'postcss-preset-env'
              ]
            }
          }
        },
        pre
      ].filter(Boolean)
    }

  module.exports = {
    entry : './scr/main.js' ,
    output : {
      path : path.resolve(__dirname , '../dist') ,
      filename : 'static/js/main.js' ,
      clean : true 
    },
    module : {
      rules : [
        {
          oneOf : [
            {
              test : /\.css$/,
              use : getStyleLoaders()
            },
            {
              test : /\.less$/,
              use : getStyleLoaders('less-loader')
            },
            {
              test : /\.s[ac]ss$/,
              use : getStyleLoaders('sass-loader')
            },
            {
              test : /\.styl$/,
              use : getStyleLoaders('stylus-loader')
            },
            {
              test : /\.(png|gif|jpg)$/,
              type : 'asset' ,
              parser : {
                dataUrlCondition : {
                  maxSize : 10 * 1024
                }
              },
              generator : {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename : 'static/images/[hash:8][ext][query]'
              }
            },
            {
              test:/\.(ttf|woff2?)$/,
              type:'asset/resource' ,
              generator : {
                filename : 'static/media/[hash:8][ext][query]'
              }
            },
            {
              test:/\.js$/,
              include : pathFn('../src') ,
              use : [
                {
                  loader : 'thread-loader' ,  // 多进程
                  options : {
                    workers : threads // cpu 数量 
                  }
                },
                {
                  loader : 'babel-loader',
                  options : {
                    cacheDirectory : true 
                  }
                }
              ]
            }

          ]
        }
      ]
    }, // module
    plugins : [
      new ESLintWebpack({
        context : pathFn('../src') ,
        exclude : 'node_modules' ,
        cache : true ,
        cacheLocation : pathFn('../node_modules/.cache/.eslintcache') ,
        threads 
      }),
      new HtmlWebpackPlugin({
        template : pathFn('html 路径') 
      }),
      new MiniCssExtractPlugin({
        filename : 'static/css/main.css' 
      })
    ],
    optimization : {
      minimize : true ,
      minimizer : [
        // css压缩也可以写到optimization.minimizer里面，效果一样的
        new CssMinimizerPlugin() ,
        // / 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
        new TerserPlugin({
          parallel : threads 
        }),
        new ImageMinimizerPlugin({
          minimizer : {
            implementation : ImageMinimizerPlugin.imageminGenerate ,
            options : {
              plugins : [
                ['gifsicle',{interlaced:true}] ,
                ['jpegtran' ,{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default' ,
                    'prefixIds' , 
                    {
                      name : 'sortAttrs',
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          }
        })
      ]
    },
    mode : 'production' ,
    devtool : 'source-map'
  }
  

  ```






















