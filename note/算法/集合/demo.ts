// 集合
class Gather {
  [x: string]: any;
  public length = 0
  constructor(data?: any[]) {
    console.log(6, data)
    this.items = {}
    if (data) {
      if (Array.isArray(data)) {
        data.forEach(item => {
          this.items[item] = item
          this.length++
        })
      } else {
        throw new Error('data is not a array')
      }
    }
    // this.length = 0
  }

  add(value: any) {
    if (this.has(value)) {
      return false
    }
    this.items[value] = value
    this.length++
    return true
  }
  remove(value: any) {
    if (this.has(value)) {
      delete this.items[value]
      this.length--
      return true
    }
    return false
  }
  has(value: any) {
    return this.items.hasOwnProperty(value) || Object.keys(this.items).includes(value)
  }
  clear() {
    this.items = {}
    this.length = 0
  }
  size() {
    return this.length
  }
  values() {
    return Object.keys(this.items)
  }
  forEach(fn: Function) {
    console.log(51, fn)
    Object.keys(this.items).forEach((item: any) => fn ? fn(item) : null)
  }
  // set { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ] } 
  entries() {

  }

  // 并集操作
  union(other: Gather) {
    let unionSet = new Gather()
    for (let i = 0; i < this.values().length; i++) {
      let item = this.values()[i]
      unionSet.add(item)
    }
    for (let i = 0; i < other.values().length; i++) {
      let _item = other.values()[i]
      unionSet.add(_item)
    }
    return unionSet
  }
  // 交级操作
  social(other: Gather) {
    let socialSet = new Gather()
    let _other = other.values()
    for (let i = 0; i < this.values().length; i++) {
      let item = this.values()[i]
      if (_other.includes(item)) {
        socialSet.add(item)
      }
    }
    return socialSet
  }
  // 差级操作
  order(other: Gather) {
    let orderSet = new Gather()
    let _this = this.values()
    let _other = other.values()
    for (let i = 0; i < _this.length; i++) {
      let item = _this[i]
      if (!_other.includes(item)) {
        orderSet.add(item)
      }
    }
    // for (let i = 0; i < _other.length; i++) {
    //   let item = _other[i]
    //   if (!_this.includes(item)) {
    //     orderSet.add(item)
    //   }
    // }
    return orderSet
  }
  // 是否是其父级
  sub(other: Gather) {
    if (this.size() > other.size()) {
      let _this = this.values()
      let _other = other.values()
      let flg = _other.every(item => _this.includes(item))
      return flg
    } else {
      return false
    }
  }
}



// Set.prototype.keys() ：返回键名的遍历器
// Set.prototype.values() ：返回键值的遍历器
// Set.prototype.entries() ：返回键值对的遍历器
// Set.prototype.forEach() ：使用回调函数遍历每个成员

let g = new Gather()
g.add('a')
g.add('b')
g.add('c')
console.log(27, g.length, g.values(), g)
// g.forEach((item: any) => {
//   console.log(68, item)
// })

let h = new Gather(['a', 1])

let union = g.union(h)
console.log(93, union)

let social = g.social(h)
console.log(110, social)

let order = g.order(h)
console.log(123, order)

let sub = g.sub(h)
console.log(144, sub)