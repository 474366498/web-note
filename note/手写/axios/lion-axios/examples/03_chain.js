const baseURL = "https://reqres.in/api/users";

console.log(axios.interceptors.request);

axios.interceptors.request.use((config) => {
  console.log('demo', 123)
  config.headers.test = "123";
  return config;
});

axios.interceptors.response.use((res) => {
  console.log('demo', res)
  return res.data;
});

axios({
  method: "get",
  url: `${baseURL}?foo=bar`,
  headers: {
    test: "",
  },
  params: {
    bar: "baz1",
  },
}).then((res) => {
  console.log(res);
});


/*

const baseURL = "http://127.0.0.1:4523/m1/2783543-0-default/pet";
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
*/