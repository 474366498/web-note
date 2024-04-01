const baseURL = "http://127.0.0.1:4523/m1/2783543-0-default/pet";

// axios({
//   method: "post",
//   url: baseURL,
//   headers:{
//     cc:"ccc"
//   },
//   data: {
//     "name": "frankshi",
//     "job": "FE"
//   },
// });

axios({
  method: "get",
  url: `${baseURL + '/' + Math.ceil(Math.random() * 1e2)}?foo=bar`,
  responseType: "json",
  params: {
    bar: "baz",
  },
}).then((res) => {
  console.log('get', res);
});

axios({
  method: 'put',
  url: `${baseURL}`,
  responseType: 'json',
  data: {
    b: 123
  }
}).then(res => {
  console.log('put', res)
}).catch(error => {
  console.error('put', error)
})

axios.delete(`${baseURL}/${Math.ceil(Math.random() * 1e1)}`, { params: { a: 123 } }).then(res => {
  console.log('delete', res)
}).catch(error => {
  console.error('delete', error)
})

// axios({
//   method: "get",
//   url: `${baseURL}?foo=bar`,
//   params: {
//     bar: "baz1",
//   },
// }).then((res) => {
//   console.log(res);
// });

// axios({
//   method: "get",
//   url:"/error/page"
// }).catch((err)=>{
//   console.log(err);
// })
