const { log } = console

// 斐波那契数列算法
/**
斐波那契数列： 0 1 1 2 3 5 8 13 21
数列满足第0项对应数值 0，第1项对应数值 1，第二项对应数值 1，第三项对应数值 2，第n项的数值等于第n-1项的值加n-2项的值
斐波那契数列规律： fib(n) = fib(n-1) + fib(n-2);
要求： 给定一个项数得到对应斐波那契数列对应项的值
 */
function fib(n) {
  if (n < 0) {
    return new Error('n 要大于0')
  } else if (n <= 1) {
    return n
  }
  let one = 0, two = 1, temp, i
  for (i = 0; i < n - 1; i++) {
    temp = one + two
    one = two
    two = temp
  }
  return two
}
// 斐波那契数列的通项公式。
function fibFormula(n) {
  return parseInt((Math.pow((1 + Math.sqrt(5)) / 2, n) - Math.pow((1 - Math.sqrt(5)) / 2, n)) / Math.sqrt(5))
}

var fibMap = new Map()

function fibRecursion(n) {
  if (fibMap.has(n)) {
    return fibMap.get(n)
  }
  if (n < 0) {
    return new Error('n 要大于0')
  } else if (n <= 1) {
    fibMap.set(n, n)
    return n
  }
  let s = fibRecursion(n - 1) + fibRecursion(n - 2)
  fibMap.set(n, s)
  return s
}


log(fib(10), fibFormula(10), fibRecursion(10), fibRecursion(8))

// 寻找奇偶数算法 返回第一奇数或偶数的index + 1
/*
给定一个字符串寻找出其中一个与其他数不同的数
返回的数字是该不同数的所在的位置从1开始
例如： 给定字符串 “2 4 7 8 10” 应该返回这个不同的数所在的位置 3
例如： 给定字符串 “1 2 1 1” 应该返回不同数字所在的位置 2
*/

function iqTest(str) {
  let s = str.split(' ').map(item => item % 2)
  let num = s.reduce((a, b) => a + b)
  let target = num > 1 ? 0 : 1
  return s.indexOf(target) + 1
}

function iqReg(str) {
  str = str.replace(/(\d+\s)|(\d+$)/g, c => c % 2)
  console.log(str)
  return str.indexOf(str.match(/0/g).length > 1 ? '1' : '0') + 1
}

log(iqTest('2 4 5 7 8 10'), iqReg('2 4 7 8 10'))

// 寻找特殊数字
/*
给定一个范围内的数，寻找满足条件的数字
例如： 89 = 8^1 + 9^2 注：(^) 这个符号表示多少次方
例如： 135 = 1^1 + 3^2 + 5^3
给定一个范围内的数返回所有满足条件的数 sumDigPow(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
给定一个范围内的数返回所有满足条件的数 sumDigPow(1, 100) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
如果该范围内没有满足条件的数字则返回空数组： sumDigPow(90, 100) // []
*/
function sumDigPow(a, b) {
  let arr = []
  for (let i = a; i <= b; i++) {
    if (i == String(i).split('').reduce((a, b, index) => { return a + b ** (index + 1) }, 0)) {
      arr.push(i)
    }
  }
  return arr
}
log(sumDigPow(1, 10))

// 差异函数算法
/*
要求:给定一个函数，第一个参数为一个数组，第二个参数也是一个数组
从第一个数组中剔除第二个数组中所包含的值
例如 array_diff([1,2,3],[2]); —> [1,3];
例如 array_diff([1,2,3,2,5], [2, 1]); —> [3, 5]
*/
function array_diff(a, b) {
  return a.filter(e => !b.includes(e))
}
log(array_diff([1, 2, 3], [2]), array_diff([1, 2, 3, 2, 5], [2, 1]))

// 寻找数组中缺失的元素
/*
编写一个方法，该方法将连续（递增）字母的数组作为输入，并返回数组中缺少的字母。
您将始终获得有效的数组。而且总是会丢失一个字母。数组的长度将始终至少为2。
数组将始终包含字母。
例：
  ['a'，'b'，'c'，'d'，'f']->'e'['O'，'Q'，'R'，'S']->'P'
  ["a","b","c","d","f"] -> "e"
  ["O","Q","R","S"] -> "P"
*/
function findMissingLetter(array) {
  let first = array[0].charCodeAt(0)
  for (let i = 1; i < array.length; i++) {
    if (first + i !== array[i].charCodeAt(0))
      return String.fromCharCode(first + i)
  }
}
log(findMissingLetter(['a', 'b', 'c', 'd', 'f']), findMissingLetter(['O', 'Q', 'R', 'S']))

// 寻找1出现的次数
/*
要求： 编写一个函数，该函数以整数作为输入，并返回该数字的二进制表示形式中等于1的位数。
输入的数是非负数。
示例：1234 的二进制表示形式10011010010，因此函数应该返回5。
*/
function countBits(n) {
  return n.toString(2).split('0').join('').length
}
log(countBits(1234))






