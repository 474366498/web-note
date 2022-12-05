import { createApp } from 'vue'
// import App from "./pages/app.vue";

import App from './components/layout'

import '../style/index.css'
import '../style/index.less'
import '../style/index.scss'
import '../style/index.styl'

import router from '@/router/index'



const app = createApp(App)
app.use(router)
app.mount('#root')