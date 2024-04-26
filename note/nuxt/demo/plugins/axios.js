
export default ({ $axios }) => {
  $axios.onRequest(config => {
    console.log(44, config)
  })

  $axios.onError(error => {
    console.log(88, error)
  })

  $axios.onResponse(res => {
    console.log(1212, res)
    return res.data
  })
}


/*

app 中包含有
$axios 
$config 
app 
base 
route 
redirect
...

*/