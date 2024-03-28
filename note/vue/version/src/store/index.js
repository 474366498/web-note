import { createStore } from 'vuex'

export default createStore({
  state: {
    appVersionChecked: false
  },
  getters: {
  },
  mutations: {
    changeAppVersionChecked(state) {
      state.appVersionChecked = !state.appVersionChecked
    }
  },
  actions: {
    changeVersionChecked() {
      console.log(13, this)
      this.commit('changeAppVersionChecked')
    }
  },
  modules: {
  }
})
