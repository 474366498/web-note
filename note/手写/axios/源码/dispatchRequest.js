exports.dispatchRequest = function dispatchRequest(options) {
  console.log(2, options)

  return getAdapter(options).then(res => {
    console.log('dispatch-request', 4, res, options)
    return res
  }, err => {
    console.log(err)
  })
}




function getAdapter(options) {
  let adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = xhrAdapter
  } else if (typeof process !== 'undefined') {
    adapter = httpAdapter
  }
  console.log(22, adapter)
  return adapter(options)
}

function xhrAdapter(options) {
  return new Promise(function (resolve, reject) {
    console.log(27, XMLHttpRequest)
    const xhr = new XMLHttpRequest()
    xhr.open(options.method.toUpperCase(), options.url, true)

    function loaded() {
      console.log('dis', xhr)
    }

    function abort() {
      console.log('dis abort')
    }

    xhr.onloadend = loaded
    xhr.onabort = abort
    xhr.onreadystatechange = function () {
      if (!xhr || xhr.readyState !== 4) {
        return
      }
      setTimeout(() => {
        loaded()
      }, 1);
    }

    xhr.send()

  })
}

function httpAdapter(options) {
  return new Promise(function (resolve, reject) {
    resolve(options)
  })
}

