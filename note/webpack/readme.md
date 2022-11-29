

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


  #### 优化代码运行性能

  ##### Code Split 

  代码分割（Code Split）主要做了两件事：

  1.  分割文件：将打包生成的文件进行分割，生成多个 js 文件。
  2.  按需加载：需要哪个文件就加载哪个文件。



  1. 文件目录

  ```
  ├── public
  ├── src
  |   ├── app.js
  |   └── main.js
  ├── package.json
  └── webpack.config.js
  ```

  ``` npm i webpack webpack-cli html-webpack-plugin ```

  *_webpack.config 多入口 提取重复代码 _*

  ``` javascript 
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      // 多入口 
      entry : {
        main :'./src/main.js' ,
        app : './src/app.js'
      },
      output : {
        path : path.resolve(__dirname , './dist') ,
        filename : 'js/[name].js' ,
        clear : true 
      },
      plugins : [
        new HtmlWebpackPlugin({
          template : './public/index.html'
        })
      ],
      mode : 'production' ,
      optimization : {
        // 代码分割配置 
        splitChunks : {
          chunks : 'all' , // 对所有模块进行分割 
          // 以下是默认值
          // minSize: 20000, // 分割代码最小的大小
          // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
          // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
          // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
          // maxInitialRequests: 30, // 入口js文件最大并行请求数量
          // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
          // cacheGroups: { // 组，哪些模块要打包到一个组
          //   defaultVendors: { // 组名
          //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          //     priority: -10, // 权重（越大越高）
          //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          //   },
          //   default: { // 其他没有写的配置会使用上面的默认值
          //     minChunks: 2, // 这里的minChunks权重更大
          //     priority: -20,
          //     reuseExistingChunk: true,
          //   },
          // },
          // 修改配置
          cacheGroups : {
            // 组，哪些模块要打包到一个组
            // defaultVendors: { // 组名
            //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //   priority: -10, // 权重（越大越高）
            //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            // },
            default : {
              minSize : 0 , // 我们定义的文件体积太小了，所以要改打包的最小文件体积
              minChunks : 2 ,
              priority : -20 ,
              reuseExistingChunk : true 
            }
          }
        }
      }
    }


  ```

  **_ 动态导入 npm i eslint-plugin-import  _**
  *_webpack.config 单入口+代码分割+动态导入(import 引入)_*

  ``` javascript 

    const os = require('os')
    const path  = require('path')
    const ESLintWebpackPlugin = require('esling-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')


    const cups = os.cups().length 

    const getStyleLoaders = (pre) => {
      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : ['postcss-preset-env']
            }
          }
        },
        pre
      ].filter(Boolean)

    }


    module.exports = {
      entry : './src/main.js' ,
      output : {
        path : path.resolve(__dirname , '../dist') ,
        filename : 'js/[name].js',   // 动态导入文件  入口文件打包输出资源命名方式
        chunkFilename : 'js/[name].chunk.js' , // 动态导入文件 动态导入输出资源命名方式
        assetModuleFilename : 'media/[name].[hash][ext]' , // 动态导入文件  图片、字体等资源命名方式（注意用hash）
        clean: true 
      },
      module : {
        rules : [
          {
            oneOf : [
              {
                test : /\.css$/,
                use:getStyleLoaders()
              },
              {
                test:/\.less$/,
                use:getStyleLoaders('less-loader')
              },
              {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders('sass-loader')
              },
              {
                test:/\.styl$/,
                use:getStyleLoaders('stylus-loader')
              },
              {
                test : /\.(jpe?g|png|gif|svg)$/,
                type:'asset',
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
                  filename : 'images/[hash:8][ext][query]'
                }
              },
              {
                test : /\.(ttf|woff2?)$/,
                type:'asset/resource' ,
                // 动态导入文件  这个可以取消
                // generator : {
                //  filename : 'media/[hash:9][ext][query]'
                // }
              },
              {
                test:/\.js$/,
                include : path.resolve(__dirname , 'src') ,
                use : [
                  {
                    // 开启多进程
                    loader : 'thread-loader ' ,
                    options : {
                      workers : cups
                    }
                  },
                  {
                    loader :'babel-loader' ,
                    options : {
                      cacheDirectory : true ,     // 开启babel编译缓存
                      cacheCompression : false ,  // 缓存文件不要压缩
                      plugins : ['@babel/plugin-transform-runtime'] // 减少代码体积
                    }
                  }
                ]
              }

            ]
          }
        ]
      },  // module end 
      plugins : [
        new ESLintWebpackPlugin({
          context : pate.resolve(__dirname , './src') ,
          exclude : 'node_modules' ,
          cache : true ,
          cacheLocation : path.resolve(__dirname , './node_module/.cache/.eslintcache'),
          threads : cups
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template : path.resolve(__dirname , './public/index.html')
        }),
         // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename : 'css/main.css'
          // 动态导入文件 
          filename : 'css/[name].css' ,
          chunkFilename : 'css/[name].chunk.css'
        }),
      
      ],
      optimization : {
        minimizer : [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin() ,
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin ({
            parallel : cups   // 开启多进程
          }),
           // 压缩图片
          new ImageMinimizerPlugin({
            minimizer : {
              plugins : [
                ['gifsicle', {interlaced:true}] ,
                ['jpegtran',{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default',
                    'prefixIds' ,
                    {
                      name : 'sortAttrs' ,
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          })

        ],
        splitChunks : {
          chunks : 'all'
        }
      },
      mode : 'production' ,
      devtool : 'source-map'
    }















  ```


  *_eslintrc.js 动态导入(import 引入)_*

  ```
    module.exports = {
       // 继承 Eslint 规则
      extends : ['eslint:recommended'] ,
      env : {
        node : true ,  // 启用node中全局变量
        browser : true  // 启用浏览器中全局变量
      },
      plugins : ['import'] , // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
      parserOptions : {
        ecmaVersion : 6 ,
        sourceType : 'module'
      },
      rules : {
        'no-val' : 2  // 不能使用 var 定义变量
      }
    }

  ```

  ##### Preload / Prefetch  

  - `Preload`：告诉浏览器立即加载资源。

  - `Prefetch`：告诉浏览器在空闲时才开始加载资源。

  它们共同点：

  - 都只会加载资源，并不执行。
  - 都有缓存。

  它们区别：

  - `Preload`加载优先级高，`Prefetch`加载优先级低。
  - `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

  总结：

  - 当前页面优先级高的资源用 `Preload` 加载。
  - 下一个页面需要使用的资源用 `Prefetch` 加载。

  它们的问题：兼容性较差。

  - 我们可以去 [Can I Use](https://caniuse.com/) 网站查询 API 的兼容性问题。
  - `Preload` 相对于 `Prefetch` 兼容性好一点。

  ``` npm i @vue/preload-webpack-plugin ```

  *_webpack.config _*

  ``` javascript 

    const os = require('os')
    const path  = require('path')
    const ESLintWebpackPlugin = require('esling-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')


    const cups = os.cups().length 

    const getStyleLoaders = (pre) => {
      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : ['postcss-preset-env']
            }
          }
        },
        pre
      ].filter(Boolean)

    }


    module.exports = {
      entry : './src/main.js' ,
      output : {
        path : path.resolve(__dirname , '../dist') ,
        filename : 'js/[name].js',   // 动态导入文件  入口文件打包输出资源命名方式
        chunkFilename : 'js/[name].chunk.js' , // 动态导入文件 动态导入输出资源命名方式
        assetModuleFilename : 'media/[name].[hash][ext]' , // 动态导入文件  图片、字体等资源命名方式（注意用hash）
        clean: true 
      },
      module : {
        rules : [
          {
            oneOf : [
              {
                test : /\.css$/,
                use:getStyleLoaders()
              },
              {
                test:/\.less$/,
                use:getStyleLoaders('less-loader')
              },
              {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders('sass-loader')
              },
              {
                test:/\.styl$/,
                use:getStyleLoaders('stylus-loader')
              },
              {
                test : /\.(jpe?g|png|gif|svg)$/,
                type:'asset',
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
                  filename : 'images/[hash:8][ext][query]'
                }
              },
              {
                test : /\.(ttf|woff2?)$/,
                type:'asset/resource' ,
                // 动态导入文件  这个可以取消
                // generator : {
                //  filename : 'media/[hash:9][ext][query]'
                // }
              },
              {
                test:/\.js$/,
                include : path.resolve(__dirname , 'src') ,
                use : [
                  {
                    // 开启多进程
                    loader : 'thread-loader ' ,
                    options : {
                      workers : cups
                    }
                  },
                  {
                    loader :'babel-loader' ,
                    options : {
                      cacheDirectory : true ,     // 开启babel编译缓存
                      cacheCompression : false ,  // 缓存文件不要压缩
                      plugins : ['@babel/plugin-transform-runtime'] // 减少代码体积
                    }
                  }
                ]
              }

            ]
          }
        ]
      },  // module end 
      plugins : [
        new ESLintWebpackPlugin({
          context : pate.resolve(__dirname , './src') ,
          exclude : 'node_modules' ,
          cache : true ,
          cacheLocation : path.resolve(__dirname , './node_module/.cache/.eslintcache'),
          threads : cups
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template : path.resolve(__dirname , './public/index.html')
        }),
         // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename : 'css/main.css'
          // 动态导入文件 
          filename : 'css/[name].css' ,
          chunkFilename : 'css/[name].chunk.css'
        }),

        new PreloadWebpackPlugin({
          rel : 'preload' , // preload兼容性更好
          as : 'script'
          // rel: 'prefetch' // prefetch兼容性更差
        })
      
      ],
      optimization : {
        minimizer : [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin() ,
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin ({
            parallel : cups   // 开启多进程
          }),
           // 压缩图片
          new ImageMinimizerPlugin({
            minimizer : {
              plugins : [
                ['gifsicle', {interlaced:true}] ,
                ['jpegtran',{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default',
                    'prefixIds' ,
                    {
                      name : 'sortAttrs' ,
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          })

        ],
        splitChunks : {
          chunks : 'all'
        }
      },
      mode : 'production' ,
      devtool : 'source-map'
    }


  ```


  ##### Network Cache 缓存

  *_ 静态资源会使用缓存来优化 _* 

  它们都会生成一个唯一的 hash 值。

  - fullhash（webpack4 是 hash）

  每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效。

  - chunkhash

  根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值。

  - contenthash

  根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的。




   *_webpack.config _*

  ``` javascript 

    const os = require('os')
    const path  = require('path')
    const ESLintWebpackPlugin = require('esling-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')


    const cups = os.cups().length 

    const getStyleLoaders = (pre) => {
      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : ['postcss-preset-env']
            }
          }
        },
        pre
      ].filter(Boolean)

    }


    module.exports = {
      entry : './src/main.js' ,
      output : {
        path : path.resolve(__dirname , '../dist') ,
        filename : 'js/[name].[contenthash:8].js',   // 动态导入文件  入口文件打包输出资源命名方式  [contenthash:8]使用contenthash，取8位长度
        chunkFilename : 'js/[name].[contenthash:8].chunk.js' , // 动态导入文件 动态导入输出资源命名方式
        assetModuleFilename : 'media/[name].[hash][ext]' , // 动态导入文件  图片、字体等资源命名方式（注意用hash）
        clean: true 
      },
      module : {
        rules : [
          {
            oneOf : [
              {
                test : /\.css$/,
                use:getStyleLoaders()
              },
              {
                test:/\.less$/,
                use:getStyleLoaders('less-loader')
              },
              {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders('sass-loader')
              },
              {
                test:/\.styl$/,
                use:getStyleLoaders('stylus-loader')
              },
              {
                test : /\.(jpe?g|png|gif|svg)$/,
                type:'asset',
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
                  filename : 'images/[hash:8][ext][query]'
                }
              },
              {
                test : /\.(ttf|woff2?)$/,
                type:'asset/resource' ,
                // 动态导入文件  这个可以取消
                // generator : {
                //  filename : 'media/[hash:9][ext][query]'
                // }
              },
              {
                test:/\.js$/,
                include : path.resolve(__dirname , 'src') ,
                use : [
                  {
                    // 开启多进程
                    loader : 'thread-loader ' ,
                    options : {
                      workers : cups
                    }
                  },
                  {
                    loader :'babel-loader' ,
                    options : {
                      cacheDirectory : true ,     // 开启babel编译缓存
                      cacheCompression : false ,  // 缓存文件不要压缩
                      plugins : ['@babel/plugin-transform-runtime'] // 减少代码体积
                    }
                  }
                ]
              }

            ]
          }
        ]
      },  // module end 
      plugins : [
        new ESLintWebpackPlugin({
          context : pate.resolve(__dirname , './src') ,
          exclude : 'node_modules' ,
          cache : true ,
          cacheLocation : path.resolve(__dirname , './node_module/.cache/.eslintcache'),
          threads : cups
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template : path.resolve(__dirname , './public/index.html')
        }),
         // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename : 'css/main.css'
          // 动态导入文件 
          filename : 'css/[name].[contenthash:8].css' ,
          chunkFilename : 'css/[name].[contenthash:8].chunk.css'
        }),

        new PreloadWebpackPlugin({
          rel : 'preload' , // preload兼容性更好
          as : 'script'
          // rel: 'prefetch' // prefetch兼容性更差
        })
      
      ],
      optimization : {
        minimizer : [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin() ,
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin ({
            parallel : cups   // 开启多进程
          }),
           // 压缩图片
          new ImageMinimizerPlugin({
            minimizer : {
              plugins : [
                ['gifsicle', {interlaced:true}] ,
                ['jpegtran',{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default',
                    'prefixIds' ,
                    {
                      name : 'sortAttrs' ,
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          })

        ],
        splitChunks : {
          chunks : 'all'
        }
      },
      mode : 'production' ,
      devtool : 'source-map'
    }


  ```
  
  
  *_ warning start _*

  - 问题：

  当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

  但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

  - 原因：

    - 更新前：math.xxx.js, main.js 引用的 math.xxx.js
    - 更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化

  - 解决：

  将 hash 值单独保管在一个 runtime 文件中。

  我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

  runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。

  *_ warning end _*


*_webpack.config _*

  ``` javascript 

    const os = require('os')
    const path  = require('path')
    const ESLintWebpackPlugin = require('esling-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')


    const cups = os.cups().length 

    const getStyleLoaders = (pre) => {
      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : ['postcss-preset-env']
            }
          }
        },
        pre
      ].filter(Boolean)

    }


    module.exports = {
      entry : './src/main.js' ,
      output : {
        path : path.resolve(__dirname , '../dist') ,
        filename : 'js/[name].[contenthash:8].js',   // 动态导入文件  入口文件打包输出资源命名方式  [contenthash:8]使用contenthash，取8位长度
        chunkFilename : 'js/[name].[contenthash:8].chunk.js' , // 动态导入文件 动态导入输出资源命名方式
        assetModuleFilename : 'media/[name].[hash][ext]' , // 动态导入文件  图片、字体等资源命名方式（注意用hash）
        clean: true 
      },
      module : {
        rules : [
          {
            oneOf : [
              {
                test : /\.css$/,
                use:getStyleLoaders()
              },
              {
                test:/\.less$/,
                use:getStyleLoaders('less-loader')
              },
              {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders('sass-loader')
              },
              {
                test:/\.styl$/,
                use:getStyleLoaders('stylus-loader')
              },
              {
                test : /\.(jpe?g|png|gif|svg)$/,
                type:'asset',
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
                  filename : 'images/[hash:8][ext][query]'
                }
              },
              {
                test : /\.(ttf|woff2?)$/,
                type:'asset/resource' ,
                // 动态导入文件  这个可以取消
                // generator : {
                //  filename : 'media/[hash:9][ext][query]'
                // }
              },
              {
                test:/\.js$/,
                include : path.resolve(__dirname , 'src') ,
                use : [
                  {
                    // 开启多进程
                    loader : 'thread-loader ' ,
                    options : {
                      workers : cups
                    }
                  },
                  {
                    loader :'babel-loader' ,
                    options : {
                      cacheDirectory : true ,     // 开启babel编译缓存
                      cacheCompression : false ,  // 缓存文件不要压缩
                      plugins : ['@babel/plugin-transform-runtime'] // 减少代码体积
                    }
                  }
                ]
              }

            ]
          }
        ]
      },  // module end 
      plugins : [
        new ESLintWebpackPlugin({
          context : pate.resolve(__dirname , './src') ,
          exclude : 'node_modules' ,
          cache : true ,
          cacheLocation : path.resolve(__dirname , './node_module/.cache/.eslintcache'),
          threads : cups
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template : path.resolve(__dirname , './public/index.html')
        }),
         // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename : 'css/main.css'
          // 动态导入文件 
          filename : 'css/[name].[contenthash:8].css' ,
          chunkFilename : 'css/[name].[contenthash:8].chunk.css'
        }),

        new PreloadWebpackPlugin({
          rel : 'preload' , // preload兼容性更好
          as : 'script'
          // rel: 'prefetch' // prefetch兼容性更差
        })
      
      ],
      optimization : {
        minimizer : [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin() ,
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin ({
            parallel : cups   // 开启多进程
          }),
           // 压缩图片
          new ImageMinimizerPlugin({
            minimizer : {
              plugins : [
                ['gifsicle', {interlaced:true}] ,
                ['jpegtran',{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default',
                    'prefixIds' ,
                    {
                      name : 'sortAttrs' ,
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          })

        ],
        splitChunks : {
          chunks : 'all'
        },
        // 提取runtime文件
        runtimeChunk : {
          name : entrypoint => `runtime~${entrypoint.name}` // runtime文件命名规则
        }

      },
      mode : 'production' ,
      devtool : 'source-map'
    }


  ```
  


##### Core-js

  `core-js`是专门用来做 ES6 以及以上 API 的

  ``` npm i @babel/eslint-parser ```

  *_eslintrc.js _*

  ``` javascript 

    module.exports = {
      extends : ['eslint:recommended'] ,
      parser : '@babel/eslint-parser' ,
      env : {
        node : true ,
        browser : true 
      },
      plugins : ['import'],
      parserOptions : {
        ecmaVersion : 6 ,
        sourceType : 'module'
      },
      rules : {
        'no-val':2
      }
    }

  ```

  *_ 使用core-js _*

  ``` npm i core-js ``` 

  *_ 手动引入 core-js  main.js _*

  ``` javascript 

    import 'core-js'  // 全部引用
    import 'core-js/es/promise ' // 单独引用 promise

  ```

  *_ 自动引入 core-js babel.config.js _*

  ``` javascript 

    module.exports = {
      presets : [
        [
          '@babel/preset-env' ,
          {
            useBuiltIns : 'usage',
            corejs : {
              version : '3' ,
              proposals : true
            }
          }
        ]
      ]
    }



  ```

  ##### PWA  
  _*离线* 时应用程序能够继续运行功能_

  ` npm i workbox-webpack-plugin ` 


*_webpack.config _*

  ``` javascript 

    const os = require('os')
    const path  = require('path')
    const ESLintWebpackPlugin = require('esling-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const MiniCssExtractPlugin = require('css-minimizer-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
    const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

    const WorkboxPlugin = require('workbox-webpack-plugin')
    const cups = os.cups().length 

    const getStyleLoaders = (pre) => {
      return [
        MiniCssExtractPlugin.loader ,
        'css-loader' ,
        {
          loader : 'postcss-loader' ,
          options : {
            postcssOptions : {
              plugins : ['postcss-preset-env']
            }
          }
        },
        pre
      ].filter(Boolean)

    }


    module.exports = {
      entry : './src/main.js' ,
      output : {
        path : path.resolve(__dirname , '../dist') ,
        filename : 'js/[name].[contenthash:8].js',   // 动态导入文件  入口文件打包输出资源命名方式  [contenthash:8]使用contenthash，取8位长度
        chunkFilename : 'js/[name].[contenthash:8].chunk.js' , // 动态导入文件 动态导入输出资源命名方式
        assetModuleFilename : 'media/[name].[hash][ext]' , // 动态导入文件  图片、字体等资源命名方式（注意用hash）
        clean: true 
      },
      module : {
        rules : [
          {
            oneOf : [
              {
                test : /\.css$/,
                use:getStyleLoaders()
              },
              {
                test:/\.less$/,
                use:getStyleLoaders('less-loader')
              },
              {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders('sass-loader')
              },
              {
                test:/\.styl$/,
                use:getStyleLoaders('stylus-loader')
              },
              {
                test : /\.(jpe?g|png|gif|svg)$/,
                type:'asset',
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
                  filename : 'images/[hash:8][ext][query]'
                }
              },
              {
                test : /\.(ttf|woff2?)$/,
                type:'asset/resource' ,
                // 动态导入文件  这个可以取消
                // generator : {
                //  filename : 'media/[hash:9][ext][query]'
                // }
              },
              {
                test:/\.js$/,
                include : path.resolve(__dirname , 'src') ,
                use : [
                  {
                    // 开启多进程
                    loader : 'thread-loader ' ,
                    options : {
                      workers : cups
                    }
                  },
                  {
                    loader :'babel-loader' ,
                    options : {
                      cacheDirectory : true ,     // 开启babel编译缓存
                      cacheCompression : false ,  // 缓存文件不要压缩
                      plugins : ['@babel/plugin-transform-runtime'] // 减少代码体积
                    }
                  }
                ]
              }

            ]
          }
        ]
      },  // module end 
      plugins : [
        new ESLintWebpackPlugin({
          context : pate.resolve(__dirname , './src') ,
          exclude : 'node_modules' ,
          cache : true ,
          cacheLocation : path.resolve(__dirname , './node_module/.cache/.eslintcache'),
          threads : cups
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template : path.resolve(__dirname , './public/index.html')
        }),
         // 提取css成单独文件
        new MiniCssExtractPlugin({
          filename : 'css/main.css'
          // 动态导入文件 
          filename : 'css/[name].[contenthash:8].css' ,
          chunkFilename : 'css/[name].[contenthash:8].chunk.css'
        }),

        new PreloadWebpackPlugin({
          rel : 'preload' , // preload兼容性更好
          as : 'script'
          // rel: 'prefetch' // prefetch兼容性更差
        }),
        new WorkboxPlugin.GenerateSW({
          // 这些选项帮助快速启用 ServiceWorkers
          // 不允许遗留任何“旧的” ServiceWorkers
          clientsClaim:true ,
          skipWaiting : true
        })
      
      ],
      optimization : {
        minimizer : [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin() ,
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin ({
            parallel : cups   // 开启多进程
          }),
           // 压缩图片
          new ImageMinimizerPlugin({
            minimizer : {
              plugins : [
                ['gifsicle', {interlaced:true}] ,
                ['jpegtran',{progressive:true}] ,
                ['optipng',{optimizationLevel:5}] ,
                ['svgo',{
                  plugins : [
                    'preset-default',
                    'prefixIds' ,
                    {
                      name : 'sortAttrs' ,
                      params : {
                        xmlnsOrder:'alphabetical'
                      }
                    }
                  ]
                }]
              ]
            }
          })

        ],
        splitChunks : {
          chunks : 'all'
        },
        // 提取runtime文件
        runtimeChunk : {
          name : entrypoint => `runtime~${entrypoint.name}` // runtime文件命名规则
        }

      },
      mode : 'production' ,
      devtool : 'source-map'
    }


  ```

  *_ main 主入口_*
  
  ``` javascript 
    ....
    
    if('serviceWorker' in navigator) {
      window.addEventListener('load',() =>{
        navigator.serviceWorker
          .register('url')
          .then(res=>{
            console.log('res')
          })
          .catch(err=>{
            console.log(err)
          })
      })
    }



  ```

    *_Error_*
    此时如果直接通过 VSCode 访问打包后页面，在浏览器控制台会发现 `SW registration failed`。

    因为我们打开的访问路径是：`http://127.0.0.1:5500/dist/index.html`。此时页面会去请求 `service-worker.js` 文件，请求路径是：`http://127.0.0.1:5500/service-worker.js`，这样找不到会 404。

    实际 `service-worker.js` 文件路径是：`http://127.0.0.1:5500/dist/service-worker.js`。

    *_ 解决路径问题 _*

    - 下载包

    ```
    npm i serve -g
    ```

    serve 也是用来启动开发服务器来部署代码查看效果的。

    - 运行指令

    ```
    serve dist
    ```

    此时通过 serve 启动的服务器我们 service-worker 就能注册成功了。












