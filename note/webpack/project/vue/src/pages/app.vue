<template>
  <section>
    <h1>{{name}}</h1>
    <img :src="jdImg" alt='jdImg' /> 
   
    <img  :src="logoImg" alt='logoImg' />
    
    <img :src="require('../../assets/images/user-avatar.jpg')" alt='userImg' />
    <i className='iconfont txuanzhongshangcheng'></i>
  </section>
</template>
<script type='text/typescript'>
import {defineComponent, ref } from 'vue' 
import jdImg from '../../assets/images/jd.jpg'

  export default defineComponent ({ 
    name :'App' ,
    cname : '主页' ,
    setup  (c,p){
      const name = ref('name') 
      const logoImg = require('../../assets/images/logo.png')

      return {
        name ,
        jdImg ,
        logoImg
      }
    }
  })
</script>

<style lang="scss" scoped>
img{
  height: 100px;
  width:auto;
}
</style>