const { log, error, info } = console

// 求整数的所有除数
/*
要求： 除数不包括 1 和数字本身
要求： 如果该数没有除数 返回一个字符串
例如： 13这个数应该返回 “13 没有除数”
例如： 12这个数应该返回 [2,3,4,6]
给定数是大于 1 的
*/

function divisors(num) {
  if (num <= 1) return
  let res = []
  for (let i = 2; i <= Math.floor(num / 2); i++) {
    if (num % i === 0) {
      res.push(i)
    }
  }
  return res.length ? res : num + '没有除数'
}

// log(divisors(120))

// 字符串合并排序
/*
取2个字符串s1，s2仅包含从a到的字母z。
返回一个新的排序字符串，最长的字符串，包含不同的字母，
不能有重复的字符
*/
function longSet(s1, s2) {
  return Array.from(new Set(s1, s2)).sort().join('')
}
let a = "xyaabbbccccdefww"
let b = "xxxxyyyyabklmopq"
// console.log(longSet(a, b));

//连续奇数的三角形
/*
             1
          3     5
       7     9    11
   13    15    17    19
21    23    25    27    29

求：对应行数的数字和
例如：第一行的奇数和是 1
第二行的奇数和就是 3 + 5 = 8
第三行的奇数和就是 7 + 9 + 11 = 27
……
实现思路
根据几组数据可以分析的出
1行 —> 1
2行 —> 8
3行 —> 27
4行 —> 64
由上面的规律可知行数和奇数和满足一个公式奇数和等于行数的三次方

*/
function rowSumOddNumbers(n) {
  return n ** 3
}

// 两个数区间之和
/*
给定一个函数，该函数有一个参数，该参数是一个数组
参数的数组只有两个元素
求这两个参数范围内的和
例如：sumAll([1, 4]) // 返回 10 => 1+2+3+4 = 10
例如：sumAll([4, 1]) // 返回 10 => 1+2+3+4 = 10
例如：sumAll([10, 5]) // 返回 45 => 5+6+7+8+9+10 = 45
*/

function sumAll(n1, n2) {
  let m1 = n1 < n2 ? n1 : n2,
    m2 = n1 < n2 ? n2 : n1,
    sum = 0;
  for (let i = m1; i <= m2; i++) {
    sum += i
  }
  return sum
}

// log(sumAll(1, 4), sumAll(4, 1))

// 字符配对算
/*
DNA 链缺少配对的碱基。依据每一个碱基，为其找到配对的碱基，然后将结果作为第二个数组返回。
Base pairs（碱基对） 是一对 AT 和 CG，为给定的字母匹配缺失的碱基。
在每一个数组中将给定的字母作为第一个碱基返回。
例如：对于输入的 GCG，相应地返回 [[“G”, “C”], [“C”,”G”],[“G”, “C”]]
例如：对于输入的 CTCTA，应该返回 [[“C”,”G”],[“T”,”A”],[“C”,”G”],[“T”,”A”],[“A”,”T”]]。
字母和与之配对的字母在一个数组内，然后所有数组再被组织起来封装进一个数组。
*/

function pair(str) {
  let o = { G: 'C', C: 'G', A: 'T', T: 'A' }
  return str.split('').map(item => [item, o[item]])
}
// log(pair('CTCTA'))

// 质素求和算法
/*
求小于等于给定数值的质数之和。
只有 1 和它本身两个约数的数叫质数。例如，2 是质数，因为它只能被 1 和 2 整除。1 不是质数，因为它只能被自身整除。
给定的数不一定是质数。
例如： sumPrimes(10) 应该返回 17
例如： sumPrimes(977) 应该返回 73156
*/

function sumPrimeNumber(num) {
  let result = 0
  for (let j = 2, isPrime = true; j <= num; j++, isPrime = true) {
    for (let i = 2; i <= parseInt(j / 2); i++) {
      // log('for', j, i)
      if (j % i === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) result += j
  }
  return result
}
// 2 3 5 7
// console.log(sumPrimeNumber(10))

// 判断是否有1
/*
给定的数转换为二进制数时任何奇数位等于1时返回 1
如果奇数位都不为1那么返回 0
给定数是无符号的
假设给定数是32位。
例如：any_odd（2）将返回1，因为至少一个奇数位是1（0010）
例如：any_odd（170）将返回1，因为所有奇数位均为1（10101010）
例如：any_odd（5）将返回0，因为奇数位都不是1（0101）
*/

function anyOdd(x) {
  log(140, x.toString(2).split(''))
  return +x.toString(2).split('').reverse().some((item, index) => {
    return (index + 1) % 2 == 0 && item == 1
  })
}

// log(anyOdd(2), +!!(2863311530 & 2))

// 正交向量算法
/*
假设我有两个向量：[a1, a2, a3, ..., aN]和[b1, b2, b3, ..., bN]
这两个向量之间的点积定义为： a1*b1 + a2*b2 + a3*b3 + ... + aN*bN
如果点积等于零，则将矢量分类为正交。
实现一个函数接受两个序列作为输入的函数，true如果向量正交则返回两个函数，否则返回两个函数false。两个数组的长度相同
例如 isOrthogonal([1, 1, 1], [2, 5, 7]); // false
例如 isOrthogonal([1, 0, 0, 1], [0, 1, 1, 0]); // true

实现思路
由于两个数组的长度是一样，所有遍历一个数组的索引，从而可以获取两个数组的中的元素
将两个数组中的值进行相乘累加
返回sum求和后的取反值
*/

function isOrthogonal(v, u) {
  let sum = 0
  for (let i = 0; i < v.length; i++) {
    sum += v[i] * u[i]
  }
  return !sum
}

log(isOrthogonal([1, 1, 1], [2, 5, 7]), isOrthogonal([1, 0, 0, 1], [0, 1, 1, 0]))

// 有且只有一个满足条件
/*
创建一个名为的函数one，该函数接受两个参数：
第一个参数为数组，第二个参数为一个判断条件的函数
当数组中的值有且只有一个元素满足条件时返回true，否则返回 false
例如：
    one([1, 3, 5, 6, 99, 1, 3], item => item < 2);  
    one([1, 3, 5, 6, 99, 88, 3], item => item % 2);  
    one([1, 3, 5, 6, 5, 1, 3], item => item > 5); 
*/

const one = (arr, fn) => arr.filter(fn)

// log(one([1, 3, 5, 6, 99, 1, 3], item => item < 2));
// log(one([1, 3, 5, 6, 99, 88, 3], item => item % 2));
// log(one([1, 3, 5, 6, 5, 1, 3], item => item > 5));

// 寻找连续5位数中的最大数
/*
给定一个较大数的字符串
该字符串的长度大于等于五
从该数字字符串中找出连续五位数并且是其中最大的
例如：”1234567890” => 67890
例如：”987644” => 98764
方法的返回值是一个数字
*/
function solution(digits) {
  let answer = 0
  for (let i = 0; i < digits.length - 4; i++) {
    let num = digits.substr(i, 5)
    if (Number(num) > answer) {
      answer = Number(num)
    }
  }
  return answer
}

function recursiveSolution(digits) {
  return digits.length <= 5 ? +digits : Math.max(+digits.slice(0, 5), recursiveSolution(digits.slice(1)))
}

// log(solution('123456'), recursiveSolution('123456'))



// 字母加法算法
/*
实现一个函数，能够将字母进行想加并返回想加之后的字母
该还是能够将传入的参数全部进行相加
说明：
传入的参数字母总是小写。
字母可能溢出
如果没有给出字母，该函数应返回 ‘z’
例子：
    addLetters('a', 'b', 'c') // 'f'
    addLetters('a', 'b') // 'c'
    addLetters('z') // 'z'
    addLetters('z', 'a') // 'a'
    addLetters('y', 'c', 'b') // 'd'
    addLetters() // 'z'
 */

function addLetters(...letters) {
  return String.fromCharCode((letters.reduce((a, b) => a + b.charCodeAt(0) - 96, 0) + 25) % 26 + 97)
}

log(addLetters('a', 'b', 'c'))// 'f'
log(addLetters('a', 'b'))// 'c'
log(addLetters('z'))// 'z'
log(addLetters('z', 'a'))// 'a'
log(addLetters('y', 'c', 'b'))// 'd'
log(addLetters())// 'z'

// 唯一的字符串字符
/*
实现一个函数，该函数有两个参数
函数的两个参数都为字符串
该函数返回这两个字符串中没有同时存在的字符
例如:
solve("xyab","xzca") // "ybzc"
    solve("acd","agf") // "cdgf"
*/

function solve(a, b) {
  return (a + b).split('').filter(item => !a.includes(item) || !b.includes(item))
}

log(solve("xyab", "xzca"))// "ybzc"
log(solve("acd", "agf"))// "cdgf"


























