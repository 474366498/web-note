
import './public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

var router = null, instance = null;
var routes = []
function render(props = {}) {
  const { container } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `${props?.name}` : '/',
    mode: 'history',
    routes: routes ? routes : []
  })
  Vue.use(router)
  console.log(19, container)
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#vue2-app') : '#vue2-app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log(`vue2 bootstrap`)
}

export async function mount(props) {

  console.log('mount', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}



