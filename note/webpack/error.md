## webpack 报错信息 #

1. 'webpack'不是内部或外部命令，也不是可运行的程序或批处理文件。[原文链接：](https://blog.csdn.net/DFF1993/article/details/80267149)
  说明没有安装相关依赖，使用npm install [相关组件] --save-dev进行安装，使用--save会把依赖的版本信息等同时保存在package.json文件，-dev是保存在devdependencies，即系统运行需要的依赖部分。

2. 若出现：Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema. - configuration.output.path: The provided value "./dist/js" is not an absolute path! [原文链接：](https://blog.csdn.net/DFF1993/article/details/80267149)
因为webpack版本的问题，输出路径错误，改写为下边形式就好了

3. Cannot read property 'babel' of undefined at Object.module.exports……  [原文链接：](https://blog.csdn.net/DFF1993/article/details/80267149)
  解决办法：
    第一步：新建.babelrc文件
    第二步：写入依赖

    ``` javascript json
      {
        "persets" :["ws2015","react" ,"stage-0"]
      }
    ```
    第三步：安装依赖
    npm i babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 -D
    第四步：配置webpack，加载babel-loader

    ``` javascript 
      {
        test :/\.js$/,
        loader :'babel-loader',
        exclude:'node_modules' ,
        query : {
          presets : ['react','es2015','stage-0']
        }
      }

    ```
  4. 出现Module build failed: ReferenceError: Unknown plugin "import" specified in "base" at 0, attempted to resolve relative to  [原文链接：](https://blog.csdn.net/DFF1993/article/details/80267149)

    执行npm install babel-plugin-import --save-dev

  5. 出现Module build failed: TypeError: Cannot read property 'lessLoader' of undefined at Object.module.exports   [原文链接：](https://blog.csdn.net/DFF1993/article/details/80267149)
    执行npm install less-loader --save-dev


