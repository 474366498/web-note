

import { processConfig } from '../helpers/utils'
import { transformResponse } from '../helpers/data'





function transformResponseData(res) {
  res.data = transformResponse(res.data)
  return res
}

const getDefaultAdapter = () => {
  let adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = require('../adapters/xhr')
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    adapter = require('../adapters/http')
  }
  return adapter
}


const dispatchRequest = config => {
  const adapter = config.adapter || getDefaultAdapter()
  // console.log(28, adapter)
  processConfig(config)
  return adapter(config).then(res => transformResponseData(res))
}

export default dispatchRequest