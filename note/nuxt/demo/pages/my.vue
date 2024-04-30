<template>
  <div>
    <p>  我的 {{ name ? name :'***' }} </p>
    <button @click="logout()">退出</button>
  </div>
</template>


<script>
export default {
  name: 'my-page',
  middleware :'auth',
  data() {
    return {

    }
  },
  async asyncData({ $axios}) {
    const res = await $axios({
        url: `/api/userInfo/${Math.random() * 1e2}`,
      method: 'get'
    })
    console.log(14,res)
    if (res.code === 200) {
      console.log()
      return { ...res.data }
    } else {
      return {}
    }
  },
  methods: {
    logout() {
      this.$store.commit('setToken', '')
      this.$router.push({path:'/'})
    }
  }   
}
</script>
