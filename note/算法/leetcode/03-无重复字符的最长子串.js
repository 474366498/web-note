

function lengthOfLong(str) {
  let num = 0, res = 0
  let m = ''

  for (let n of str) {
    if (m.indexOf(n) < 0) {
      m += n
      num++
      res = res < num ? num : res
    } else {
      m += n
      m = m.slice(m.indexOf(n) + 1)
      num = m.length
    }
  }
  return res
}


function lengthOfMap(s) {
  let res = 0, temp = []
  for (let i = 0; i < s.length; i++) {
    if (temp.indexOf(s[i]) === -1) {
      temp.push(s[i])
    } else {
      temp.shift()
      i--
      continue
    }
    res = Math.max(res, temp.length)
  }
  console.log(temp)
  return res
}


let str = 'pwwkew'

console.log('length of long', lengthOfLong(str), lengthOfMap(str))