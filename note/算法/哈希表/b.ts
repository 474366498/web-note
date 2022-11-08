
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

    this.storage = []
    this.count = 0
    this.limit = newLimt

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

console.log(54, h)  // 0 3  6
console.timeEnd()



console.time()
let m = new Map()
m.set('afff', { a: 1, b: 2 })
m.set('afaf', { a: 1, b: 2, c: 3 })
m.set('afaaf', 123123123)

console.log(54, m)  // 0 3  6
console.timeEnd()


// h.resize(10)

// console.log(122, h)

