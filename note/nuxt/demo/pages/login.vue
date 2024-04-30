<template>
  <div>
    <button @click="login()"> 登录</button>
  </div>
</template>

<script>
import qs from 'qs' 
import { mapMutations } from 'vuex'
var apiUser 
export default {
  name: 'login',
  mounted() {
    apiUser = this.$apiUser()
  },
  methods: {
    ...mapMutations(['setToken']),
    login() {
      let data = qs.stringify({
        username: 'test',
        password:'admin123' 
      })
      this.$axios({
        url: '/api/login',
        method: 'post',
        data
      }).then(res => {
        console.log(23, this, res)
        this.$apiGet()
        apiUser && apiUser.add()
        // this.setToken(res.data.id)
        this.$store.commit('setToken', res.token)
        this.$router.push({path:'/'})
      })
    }
  }
}
</script>