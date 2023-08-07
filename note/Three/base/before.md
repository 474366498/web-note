

### 引入与使用 Three.js 
[!开发和学习环境，引入threejs](http://www.webgl3d.cn/pages/cd35b2/)
#### 开发环境 

``` npm install three@version ``` 
``` javascript 
import * as THREE from 'three' // three 核心库 

// 在threejs文件包中examples/jsm目录下，你还可以看到各种不同功能的扩展库
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' // 功能扩展库 按需引入

```

#### 学习环境 

##### 普通式 html标签(script)

``` html 
<script src='three文件地址'> </script>

<script>
  console.log(THREE)
</script>  

```

##### ES6 

>> 给script标签设置type="module",也可以在.html文件中使用import方式引入three.js。

```HTML 
<script type='module'> 

// 必须要浏览器支持ES6语法 
import * as THREE from 'three相对当前文件的相对路径'
import * as THREE from './build/three.module.js';

<script>

``` 

##### importmap 配置

``` html 
<script type='importmap'>
{
  "imports" : {
    "three": "three相对当前文件的相对路径" ,
    "three":"./build/three.module.js" ,
    "three/addons/": "../three/jsm/" , // 功能扩展库(当前Three 目录下的引用)
    "three/addons/":"./three.js/examples/jsm/" // 功能扩展库
  }
}
</script>  

<script type='module'>
  // three 核心库
  import * as THREE from 'three' 
  // 扩展库OrbitControls.js
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js' 
  // GLTFLoader
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' 

  console.log(THREE , OrbitControls , GLTFLoader)


</script>

```





