const { log, error, info } = console
// js字符串翻转算法
// 如：字符串 “abcdef” 转换为 “fedcba”;
function reverseString(str) {
  return str.split('').reverse().join('')
}

// log(reverseString('123456'))

// js数学阶层算法
// 5! = 1 * 2 * 3 * 4 * 5; 最后结果是 120
function stratum(num) {
  for (var i = 1, sum = 1; i <= num; i++) sum *= i
  return sum
}
// js数学阶层算法 递归
function recursionStratum(num) {
  if (num == 1) return 1
  return recursionStratum(num - 1) * num
}
// log(stratum(5), recursionStratum(5))

// 回文算法
/**
 要求：如果给定的字符串是回文，返回true，反之，返回false
回文是指一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样。
注意:您需要删除字符串多余的标点符号和空格，然后把字符串转化成小写来验证此字符串是不是回文。
函数参数的值可以为”racecar”，”RaceCar”和”race CAR”。
 */

function palindrome(str) {
  str = str.replace(/\s/g, '').toLowerCase()
  return str === str.split('').reverse().join('')
}

// log(palindrome('abCDcbAa'))

// 寻找最长的单词算法
/**
 要求：返回提供的句子中最长的单词的长度。
例如： “my name is mt” 那么这个字符串最长的单词长度为 4
例如： “What’ s your name” 那么这个字符串最长单词长度为 5
 */

function findLongestWord(str) {
  return Math.max(...str.split(' ').map(item => item.length))
}

// log(findLongestWord('What’ s your name'))

// 设置首字母大写
/**
  要求：返回一个字符串,确保字符串的每个单词首字母都大写，其余部分小写。
  要求：像’the’和’of’这样的连接符同理。
  例如：字符串 “I’m a little tea pot” 应该得到一个 “I’m A Little Tea Pot” 字符串
  例如：字符串 “sHoRt AnD sToUt” 应该得到一个 “Short And Stout” 字符串
  例如：字符串 “HERE IS MY HANDLE HERE IS MY SPOUT” 应该得到一个 “Here Is My Handle Here Is My Spout” 字符串
 */

function titleCase(str) {
  return str.toLowerCase().replace(/^\w|\s\w/g, w => w.toUpperCase())
}

// log(titleCase('HERE IS MY HANDLE HERE IS MY SPOUT'))


// js寻找二维数组中的最大值算法
/*
要求：请分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新的数组。
例如：二维数组 [[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]，应该返回一个 [27,5,39,1001] 数组
例如：二维数组 [[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]],应该返回一个 [9, 35, 97, 1000000] 数组
*/
function largestOf(arr) {
  return arr.map(item => Math.max(...item))
}
// log(largestOf([[4, 9], [13, 305], [32, 35], [1001, 857, 1]]))

// 确认末尾字符算法
/*
要求：检查一个字符串是否以指定的字符串结尾。
如果是，返回true;如果不是，返回false。
要求： 不能使用数组的ES6新增方法endsWith();
例如：confirmEnding(“abcd”, “d”); // true
例如：confirmEnding(“abcd”, “dd”); // false
*/

function confirmEnding(str, target) {
  return str.slice(-target.length) === target
}

// log(confirmEnding('“abcd”', 'd”'))

// 计算季度
/*
给定一个整数（从1到12）的月份，以整数形式返回到该年份的哪一季度。
例如：2月是第一季度的一部分；第6个月是第二季度的一部分；第11个月是第四季度的一部分。
*/
function quarterOf(month) {
  return Math.ceil(month / 3)
}
// log(quarterOf(10))


// 平方根或者平方
/*
编写一个方法该方法接受一个整数数组作为参数，对该数组每个数字进行处理
要求返回一个新的数组
如果该数字有整数的平方根则返回整数平方根，没有则返回这个数的平方
例如：数组[4,3,9,7,2,1] 应该返回一个 [2,9,3,49,4,1] 新数组
*/
function squareOrSquareRoot(arr) {
  return arr.map(item => {
    return Math.sqrt(item) % 1 === 0 ? Math.sqrt(item) : item ** 2
  })
}
// log(squareOrSquareRoot([4, 3, 9, 7, 2, 1]))

// 计算字符串中元音字母出现的次数
/*
编写一个函数，给定一个字符串参数返回该字符串中包含元音字母的个数
元音字母有 a、e、i、o、u 这5个字母
不考虑大写字母，也就是说假设给定的字符串都是小写字母
例如：getCount(‘abracadabra’) 应该返回 5
*/

// 计算字符串中元音字母出现的次数
/*
编写一个函数，给定一个字符串参数返回该字符串中包含元音字母的个数
元音字母有 a、e、i、o、u 这5个字母
不考虑大写字母，也就是说假设给定的字符串都是小写字母
例如：getCount(‘abracadabra’) 应该返回 5
*/
function getCount(str) {
  const vowel = 'aeiou'
  let count = 0
  str.split('').forEach(item => {
    if (vowel.includes(item)) count++
  })
  return count
}

function getCountReg(str) {
  return (str.match(/[aeiou]/gi) || []).length
}

// log(getCount('abracadabra'), getCountReg('abracadabra'))



