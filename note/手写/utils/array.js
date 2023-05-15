/**
 * 
 * @param {*} items 数据 数组或树
 * @param {*} childKey children key 关键字
 * @param {*} findKey item数据中对比的关键字
 * @param {*} val 对比的value
 * map 无法正常跳出循环(可以通过 try catch 跳出) 
 */

function find(items, childKey = 'children', findKey, val) {

  var result
  let has = _find(items, childKey, findKey, val)
  console.log(161, has, result)
  function _find(data, ckey, fkey, val) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[fkey] === val) {
        result = item
        console.log(166, item, result)
        return
      } else {
        if (item[ckey]) {
          _find(item[ckey], ckey, fkey, val)
        }
      }
    }
    // data.map(item => {
    //   if (item[fkey] === val) {
    //     result = item
    //     console.log(166, item, result)
    //   } else {
    //     if (item[ckey]) {
    //       _find(item[ckey], ckey, fkey, val)
    //     }
    //   }
    // })
  }

}