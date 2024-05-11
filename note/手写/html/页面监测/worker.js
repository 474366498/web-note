let timer
self.addEventListener('message', event => {
  console.log(3, event)
  let sum = 0
  let msg

  if (event.data === 'start') {
    timer = setInterval(() => {
      sum += 1
      msg = {
        text: 'editing',
        sum
      }
      self.postMessage(msg)
    }, 6e1 * 1e3);
  } else {
    clearInterval(timer)
  }
})