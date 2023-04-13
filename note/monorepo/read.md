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












