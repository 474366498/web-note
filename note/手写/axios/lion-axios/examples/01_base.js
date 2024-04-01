
axios.get("http://127.0.0.1:4523/m1/2783543-0-default/pet/1?b=2", { params: { a: 1 } });

axios.request({
  url: "http://127.0.0.1:4523/m1/2783543-0-default/pet/1",
  params: {
    c: 1,
    d: 2
  }
});

// axios({
//   method: "post",
//   url: "/user/12345",
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   }
// });

// axios({
//   method: "post",
//   url: "http://127.0.0.1:4523/m1/2783543-0-default/pet",
//   headers: {
//     // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
//     'Accept': '*/*',
//     // 'Host': '127.0.0.1:4523',
//     // 'Connection': 'keep-alive',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data: {
//     name: "Hello Kitty",
//     status: "sold",
//   },
//   params: {
//     a: 1,
//     b: 2
//   }
// });

const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
