// js符号转码_js 字符串编码转换函数 https://blog.csdn.net/weixin_32676101/article/details/112805647

let s = '世界电影史分厘卡十九点零分'
// console.log(escape(s), encodeURI(s), encodeURIComponent(s))
let s1 = `%u4E16%u754C%u7535%u5F71%u53F2%u5206%u5398%u5361%u5341%u4E5D%u70B9%u96F6%u5206`,
  s2 = `%E4%B8%96%E7%95%8C%E7%94%B5%E5%BD%B1%E5%8F%B2%E5%88%86%E5%8E%98%E5%8D%A1%E5%8D%81%E4%B9%9D%E7%82%B9%E9%9B%B6%E5%88%86`

// console.log(unescape(s1), decodeURI(s2), decodeURIComponent(s2))



// 是否是质数
function isPrime(num: number) {
  let temp = Math.round(num ** (1 / 2))
  for (let k = 2; k <= temp; k++) {
    if (num % k === 0) {
      return false
    }
  }
  return true
}


let primeArr = []   // 质数组
console.time()
for (let i: number = 2; i < 100; i++) {
  if (isPrime(i)) {
    primeArr.push(i)
  }
}

console.log(35, 16, primeArr)
console.timeEnd()




