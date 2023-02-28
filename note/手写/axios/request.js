import axios from 'axios'


// NO.1
const api = axios.create({
  baseUrl: '',
  timeout: 5e3
})

// 请求拦截器 在请求拦截中可以补充请求相关配置
api.interceptors.request.use(config => {
  console.log(config, config.headers)
  return config
}, error => {
  Promise.reject(error)
})

api.interceptors.response.use(res => {
  console.log(res)
  return res.data || res
}, error => {
  console.log(error)
  Promise.reject(error)
})


const service = axios.create({
  baseUrl: process.env.NODE_ENV === 'production' ? process.env.NODE_API : '/api',
  withCredentials: true, // 跨域请求中是否发送cookie 
  timeout: 5e3
})



service.interceptors.request.use(request().callback, request().error)
service.interceptors.response.use(response().callback, response().error)

function request() {
  return {
    callback: (config) => {
      console.log(config)
      return config
    },
    error: (error) => {
      console.log(error)
      Promise.reject(error)
    }
  }
}

function response() {
  return {
    callback: (res) => {
      console.log(res)
      return res
    },
    error: error => {
      console.log(error)
      Promise.reject(error)
    }
  }
}


export { api, sevice }

