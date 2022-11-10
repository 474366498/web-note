
/**
 * 将字符串转成比较大的数字 hashCode
 * 将数字hashCode压缩到数组范围之内
 */
function hashFn(str: string, size: number = 10) {
  let hashCode = 0

  // 霍纳算法
  for (let i = 0; i < str.length; i++) {
    // str.charCodeAt(i) 
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }
  let index = hashCode % size
  return index
}

// let a = hashFn('abc')
// let b = hashFn('cba')
// let c = hashFn('nba')

// console.log(a, b, c)

/**
 * 判断一个数字是否是质数
 * @param num 
 * @returns 
 */
function isPrime(num: number): boolean {
  let temp = Math.floor(num ** (1 / 2))
  for (let i = 2; i <= temp; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
/**
 * 查找一个数字 附近的质数
 * @param num 
 * @param flg ture 向上找 false 向下找
 * @returns 
 */
function getPrime(num: number, flg: boolean = true): number {
  while (!isPrime(num)) {
    num = flg ? num + 1 : num - 1
  }
  return num
}


class HashTable {
  [x: string]: any
  public limit = 7    // 长度
  public count = 0    // 扩容参
  constructor(storage?: any) {
    this.storage = []
  }

  put(key: string, value: any) {
    let index = hashFn(key, this.limit)
    let bucket = this.storage[index] || []

    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }
    bucket.push([key, value])
    this.storage[index] = bucket
    this.count += 1
    if (this.count > this.limit * .75) {
      this.resize(this.limit * 2)
    }
  }

  get(key: string) {
    let index = hashFn(key, this.limit)
    let bucket = this.storage[index]
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        let tuple = bucket[i]
        if (tuple[0] === key) {
          return tuple[1]
        }
      }
      return null
    } else {
      return null
    }
  }

  del(key: string) {
    let index = hashFn(key, this.limit)
    let bucket = this.storage[index]
    if (bucket) {
      console.log(69, bucket, key)
      let _index = bucket.findIndex((item: [any]) => item[0] == key)
      if (_index < 0) {
        return false
      } else {
        bucket.splice(_index, 1)
        console.log(74, _index)
        this.count--
        if (this.limit > 7 && this.count < this.limit * .25) {
          this.resize(Math.floor(this.limit / 2))
        }
        return true

      }
    } else {
      return false
    }
  }

  isEmpty() {
    return !!this.count
  }
  size() {
    return this.count
  }

  resize(newLimt: number) {
    let oldStorage = this.storage
    console.log('%c扩容了', "background:pink;color:green;")
    this.storage = []
    this.count = 0
    this.limit = getPrime(newLimt)

    for (let i = 0; i < oldStorage.length; i++) {
      let bucket = oldStorage[i]
      if (!bucket) {
        continue
      }

      for (let j = 0; j < bucket.length; j++) {
        let [key, value] = bucket[j]
        this.put(key, value)
      }
    }
  }

}

console.time()
let h = new HashTable()
h.put('afff', { a: 1, b: 2 })
h.put('afaf', { a: 1, b: 2, c: 3 })
h.put('afaaf', 123123123)
h.put('aff1f', { a: 1, b: 2 })
h.put('wwfaf', { a: 1, b: 2, c: 3 })
h.put('afqaaf', 123123123)
console.log(54, h)  // 0 3  6
console.timeEnd()



console.log(158, getPrime(15, false))


// h.resize(10)

// console.log(122, h)

