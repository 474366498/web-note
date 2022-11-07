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
g.forEach((item: any) => {
  console.log(68, item)
})
