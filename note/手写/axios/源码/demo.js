const axios = require('./index.js').default

// axios.get('asdfasdf')

axios.interceptors.request.use(function (config) {
  console.log('demo:', 6, config)
  config.a = 7
  return config
}, function () {
  console.log('demo:', 11)
})
axios.interceptors.request.use(function (config) {
  console.log('demo:', 13, config)
  config.b = 14
  return config
}, function () {
  console.log('demo:', 17)
})




axios.interceptors.response.use(function (res) {
  console.log('demo:', 6, res)
  res.a = 25
  return res
}, function () {
  console.log('demo:', 11)
})
axios.interceptors.response.use(function (res) {
  console.log('demo:', 13, res)
  res.b = 32
  return res
}, function () {
  console.log('demo:', 17)
})


axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})

// axios.get('http://bit.ly/2mTM3nY', {
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// }).then(res => {
//   console.log('demo:', 27, res)
// })

// console.log(3, axios)