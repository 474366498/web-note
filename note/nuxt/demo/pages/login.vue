<template>
  <div>
    <button @click="login()"> 登录</button>
  </div>
</template>

<script>
import qs from 'qs' 
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  methods: {
    ...mapMutations(['setToken']),
    login() {
      let data = qs.stringify({
        username: 'test',
        password:'admin123' 
      })
      this.$axios({
        url: '/api/pet',
        method: 'post',
        data
      }).then(res => {
        console.log(23,this, res)
        // this.setToken(res.data.id)
        this.$store.commit('setToken', res.data.id)
        this.$router.push({path:'/'})
      })
    }
  }
}
</script>