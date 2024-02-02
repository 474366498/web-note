// 手写diff算法之最长递增子序列vue3（例子+图解+详细注释）  https://blog.csdn.net/weixin_46098276/article/details/126935174

// 最长递增子序列是什么？
//  答：属于一种算法，在一个乱序的数值序列中，遍历这个序列，找出依次递增的数值，保存在新序列中，使得这个新序列元素的数值依次递增，并且这个新序列的长度尽可能地大（从乱序序列中找出越多越好） 最长递增子序列中的数值在原序列中不一定是要连续的，只要是递增的数值就符合！
const array = [2, 3, 7, 4, 5, 8, 1, 9]
/*
// 这只是个子序列 不是最长
function getSequence(arr) {
  let len = arr.length
  const result = [0]

  let resultLastIndex

  for (let i = 0; i < len; i++) {
    let item = arr[i]
    if (item !== 0) {
      resultLastIndex = result[result.length - 1]
      if (item > arr[resultLastIndex]) {
        result.push(i)
        continue
      }
    }
  }
  return result
}
console.log(24, getSequence(array))  // [2,3,7，8,9]  => [ 0, 1, 2, 5, 7 ]  
*/


// 最长递增子序列 不符合 vue3 diff 算法
function getSequence(arr) {
  let len = arr.length

  const result = [0]

  let s, e, m  // 二分查找参数
  let resultLastIndex

  for (let i = 0; i < len; i++) {
    let item = arr[i]
    if (item != 0) {
      resultLastIndex = result[result.length - 1]
      if (item > arr[resultLastIndex]) {
        result.push(i)
        continue
      }

      s = 0
      e = result.length - 1
      while (s < e) {
        m = ((s + e) / 2) | 0
        let middle = arr[result[m]]
        if (middle < item) {
          s = m + 1
        } else {
          e = m
        }
      }

      // console.log('s and e', s, e, arr[result[s]], arr[result[e]])
      if (arr[result[e]] > item) {
        result[e] = i
      }
    }
  }


  return result
}

function getSequenceV(arr) {
  let len = arr.length
  const result = [0]

  const p = new Array(len).fill(0)

  let s, m, e
  let resultLastIndex

  for (let i = 0; i < len; i++) {
    let item = arr[i]

    if (item != 0) {
      resultLastIndex = result[result.length - 1]
      if (item > arr[resultLastIndex]) {
        result.push(i)
        p[i] = resultLastIndex
        continue
      }

      s = 0
      e = result.length - 1
      while (s < e) {
        m = ((s + e) / 2) | 0
        let middle = arr[result[m]]
        if (middle < item) {
          s = m + 1
        } else {
          e = m
        }
      }

      if (arr[result[e]] > item) {
        result[e] = i
        p[i] = result[e - 1]
      }

    }

  }

  let l = result.length
  let last = result[l - 1]

  while (l-- > 0) {
    result[l] = last
    last = p[last]
  }

  return result
}



console.log(69, getSequence(array), getSequenceV(array))

console.log(getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4]), getSequenceV([2, 3, 1, 5, 6, 8, 7, 9, 4]))



