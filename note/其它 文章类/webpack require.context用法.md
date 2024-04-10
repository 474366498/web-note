
// require.context()的用法详解  https://blog.csdn.net/ksjdbdh/article/details/122349542


## 1. 在组件内引入多个组件 start

![files.png](https://img-blog.csdnimg.cn/a6e0756ed45448b6b45e1f7609fcc359.png)

``` javascript 
const path = require('path') 
const files = require.context('@/views/00-99/requireContext/components',false,/\.vue$/)
const modules = {} 
files.keys().forEach(key=>{
  const name = path.basename(key,'.vue') 
  modules[name] = files(key).default || files(key)
})
console.log(modules)
export default {
  components : modules
}

``` 

``` html 
<template>
  <div>
    <COMA /> 
    <COMB />
  </div>
</template>

<script>
  import myComponents from './index' 
  export default {
    components : {
      COMA : myComponents.components.zujianA    ,
      COMB : myComponents.components.zujianB
    }
  }
</script>

```
![效果图片.png](https://img-blog.csdnimg.cn/92cc0de6ab8449a9b112ce818527de44.png)


## 2. 在main.js中引入大量公共组件 
``` javascript 
import Vue from 'vue' 
// 自定义组件 
const requireComponents = require.context('@/components',true,/\.vue/)

requireComponents.keys().forEach(fileName => {
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 截取路径作组件名
  const reqComName = reqCom.name || fileName.replace(/\.\/(.*)\.vue/,'$1') 
  Vue.component(reqComName,reqCom.default || reqCom)
})

```

## 3. 使用插件注册全局组件 start
```javascript 
// 新建一个js文件 使用插件方式一次性全局注册
const requireContext = require.context('./globalComponents',true,/\.vue$/)
const requireAll = context => context.keys().map(context)

console.log(requireContext)

export default Vue => {
  requireAll(requireContext).forEach(item=>{
    Vue.component(`gl-${item.default.name}`,item.default)
  })
}

```


## 4. 引入vuex的module start
![vuex.png](https://img-blog.csdnimg.cn/4aca49fab36549ec98d957de385c043f.png)
``` javascript 
import Vue from 'vue'
import Vuex from 'vuex' 

import getters from './getters' 
Vue.use(Vuex) 

const files = require.context('./modules',false,/\.js$/)
console.log(files)

const modules = {}

files.keys().forEach(key=>{
  modules[key.replace(/(\.\/|\.js)/g,'')] = files[key].default 
})

export default new Vuex.Strore({
  modules:{...modules} ,
  getters
})

```
![vuex.png](https://img-blog.csdnimg.cn/e5b14ce384494db0a51296ef2b23abf9.png)

## 5. 引入项目中所有svg文件 
``` javascript 
const requireContext = require.context('./svg',false,/\.svg/)
const requireAll = context => context.keys().map(context)
requireAll(requireContext)
```
![svg使用.png](https://img-blog.csdnimg.cn/4a935f00acb2494b9dbfc981ee03e166.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA55m95auWbGVhZGVy,size_20,color_FFFFFF,t_70,g_se,x_16)


## 6. 利用require.context遍历目录所有图片
``` html 
<template>
  <div id='app'>
    <li v-for="(img,index) in images" :key="index">
      <p>img :{{img}}</p>
      <img :src="imgUrl(img)" /> 
    </li>
  </div>
</template>  

<script>
  const req = require.context('@/assets/images',false , /\.(jpg|gif|png)$/)
  export default {
    name :'App' ,
    data () {
      return {
        images : [] 
      }
    },
    created () {
      this.images = req.keys() 
    },
    methods : {
      imgUrl (path) {
        return req(path)
      }
    }
  }
</script>

```
![效果.png](https://img-blog.csdnimg.cn/16a7aa72aa3a49f0a084dbdf22deb5f7.png)