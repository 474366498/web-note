
/*

const defaults = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, *\/*'
    }
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

const customConfig = {
  url: "/post",
  method: "post",
  data: { a: 1 },
  headers: {
    test: "123"
  }
}


*/

import { isPlainObject, deepMerge } from "../helpers/utils";

const starts = Object.create(null),
  defaultStart = (v1, v2) => typeof v2 !== 'undefined' ? v2 : v1,
  fromVal2Start = (v1, v2) => typeof v2 !== 'undefined' && v2

// starts 补充内容
// v1 defaults 里面的内容
function deepMergeStart(v1, v2) {
  console.log(36, v1, starts, v2)
  if (isPlainObject(v2)) {
    return deepMerge(v1, v2)
  } else if (typeof v2 !== 'undefined') {
    return v2
  } else if (isPlainObject(v1)) {
    return deepMerge(v1)
  } else {
    v1
  }
}

['url', 'params', 'data'].forEach(key => starts[key] = fromVal2Start)
  ;['headers', 'auth'].forEach(key => starts[key] = deepMergeStart)



export default function mergeConfig(_, config) {
  console.log(35, _, config)
  if (!config) config = {}

  const _config = Object.create(null)
  // 遍历用户配置，mergeField方法就是根据属性选择到不同的策略，进行合并配置
  for (let key in config) {

    mergeField(key)
  }

  for (let key in _) {
    if (!config[key]) {
      mergeField(key)
    }
  }

  // 这里采用的是设计模式中的“策略模式”，有效的剔除了代码中无限个 if else 的情况
  function mergeField(key) {
    const start = starts[key] || defaultStart
    _config[key] = start(_[key], config[key])
  }
  console.log(48, _config)
  return _config
}

