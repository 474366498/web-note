

// import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


var router = null,
  instance = null,
  history = null
var routes = []

function render(props = {}) {
  const { container } = props
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? `${props.name}` : '/')
  router = createRouter({
    history,
    routes: routes ? routes : []
  })
  instance = createApp(App)
  instance.use(router)
  instance.mount(container ? container.querySelector('#vue3-app') : '#vue3-app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('%c', 'color:green', 'vue3 bootstrap')
}

export async function mount(props) {
  console.log('mount', props)
  render(props)
}

export async function unmount() {
  instance && instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  router = null
  history.destroy()
}

// createApp(App).mount('#app')
