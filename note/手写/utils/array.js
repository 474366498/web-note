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

// array 转 tree 使用递归实现
function arrToTree(arr) {
  const root = { id: null, children: [] }

  const nodeMap = {}

  arr.forEach(item => {
    nodeMap[item.id] = {
      id: item.id,
      children: []
    }
  })

  arr.forEach(item => {
    const node = nodeMap[item.id]
    if (item.parentId) {
      const parentNode = nodeMap[item.parentId]
      parentNode.children.push(node)
    } else {
      root.children.push(node)
    }
  })

  return root
}
// array 转 tree 循环太多耗性能
function tranListToTreeData(array, parentId = null) {
  const result = []
  array.forEach(item => {
    if (item.parentId === parentId) {
      const children = tranListToTreeData(array, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  })
  return result
}

function arrayToTree(array, parentId = null) {
  var map = {}

  array.forEach(item => {
    if (!item.parentId) {
      if (map['root']) {
        map['root'].push(item)
      } else {
        map['root'] = [item]
      }
    } else {
      if (map[item.parentId]) {
        map[item.parentId].push(item)
      } else {
        map[item.parentId] = [item]
      }
    }
  })

  array.forEach(item => {
    if (map[item.parentId] || item.parentId == null) {
      item.children = map[item.id]
    }
  })

  return array.filter(item => !item.parentId)

}

const array = [
  { id: 2, name: 'B', parentId: 1 },
  { id: 6, name: 'F', parentId: 3 },
  { id: 1, name: 'A', parentId: null },
  { id: 3, name: 'C', parentId: 1 },
  { id: 5, name: 'E', parentId: 2 },
  { id: 4, name: 'D', parentId: 2 },
  { id: 7, name: 'G', parentId: null }
];

console.log(78, JSON.stringify(arrayToTree(array), 2))