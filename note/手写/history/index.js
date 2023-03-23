window.addEventListener('popstate', function (event) {
  console.log(2, event)
})

window.onpopstate = function (event) {
  console.log(event)
}
