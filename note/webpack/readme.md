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




#### 5.字体(ttf|woff)处理

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












#### 6.其它资源处理

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