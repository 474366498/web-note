
/**
 * 
 * @param {object} a 这个对象用于继承 
 * @param {object} b 这个对象的prototype 分享到a对象
 * @param {object} thisArg 这个对象用还bind function
 * @param {*} param3 
 * @returns {object}  
 */
function extend(a, b, thisArg, { allOwnKeys } = {}) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg)
    } else {
      a[key] = val
    }
  }, { allOwnKeys })
  return a
}

/**
 * 
 * @param {*} obj 
 * @param {*} fn 
 * @param {*} param2 
 */
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  let i, l;

  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj)
    const len = keys.length
    let key

    for (i = 0; i < len; i++) {
      key = keys[i]
      fn.call(null, obj[key], key, obj)
    }
  }
}


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


exports.extend = extend
exports.bind = bind
exports.forEach = forEach



