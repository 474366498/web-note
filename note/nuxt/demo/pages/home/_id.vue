<template>
  <div>http://localhost:3000/home/123 home id:</div>
</template>
<script>

export default {
  name : 'home_id',
  data() {
    return {
      title : 'home_id'
    }
  },
  head() {
    console.log(14, this.$route)
    return {
      title: `${this.title}~${this.$route.params.id || '暂无id'}`,
      meta: [
        {hid : 'description',name :'description',content:`${this.$route.name}页面详细描述`} , 
        {hid : 'keywords',name :'keywords',content:`${this.$route.name}页面详细描述、${this.$route.fullPath}`} , 
      ]
    }
  }    
}
</script>