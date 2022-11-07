// 单向链表
function LinkedList() {

  function Node(data) {
    this.data = data
    this.next = null
  }

  this.Head = null
  this.length = 0

  LinkedList.prototype.append = function (data) {
    let newNode = new Node(data)
    if (this.length) {
      let current = this.Head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    } else {
      this.Head = newNode
    }
    this.length++
  }


  LinkedList.prototype.toString = function () {
    let current = this.Head
    let result = ''
    while (current) {
      result += current.data + '=>'
      current = current.next
    }
    return result
  }
  // p postion 位置
  LinkedList.prototype.insert = function (p, data) {

    if (p < 0 || p > this.length) return false

    let newNode = new Node(data)

    if (p) {
      let i = 0,
        current = this.Head,
        prev = null
      while (i++ < p) {
        prev = current
        current = current.next
      }
      newNode.next = current
      prev.next = newNode
    } else {
      newNode.next = this.Head
      this.Head = newNode
    }
    this.length += 1
    return true
  }
  // p 位置下标 
  LinkedList.prototype.get = function (p) {
    if (p < 0 || p >= this.length) return null

    let i = 0,
      current = this.Head
    while (i < p) {
      current = current.next
      i++
    }
    return current
  }

  LinkedList.prototype.indexOf = function (data) {
    let i = 0,
      current = this.Head
    while (current) {
      if (current.data === data) {
        return i
      }
      current = current.next
      i++
    }
    return -1
  }

  LinkedList.prototype.update = function (p, data) {
    let i = 0,
      current = this.Head
    if (p < 0 || p >= this.length) return false
    while (i < p) {
      current = current.next
      i++
    }
    current.data = data
    return true
  }

  LinkedList.prototype.removeAt = function (p) {
    if (p < 0 || p >= this.length) return false
    if (!!p) {
      let i = 0,
        prev = null,
        current = this.Head
      while (i < p) {
        prev = current
        current = current.next
        i++
      }
      prev.next = current.next
    } else {
      this.Head = this.Head.next
    }
    this.length -= 1
  }

  LinkedList.prototype.remove = function (data) {
    let p = this.indexOf(data)
    return this.removeAt(p)
  }

  LinkedList.prototype.isEmpty = function () {
    return this.Head === null
  }
  LinkedList.prototype.size = function () {
    return this.length
  }

}


let l = new LinkedList()
console.log(l.isEmpty(), l.size())
l.append(1)
l.append(2)
// l.insert(2, 3)
l.append(4)
l.append(5)
l.insert(4, 6)
l.append(7)
// l.removeAt(4)

l.remove(5)

console.log(35, l, l.toString(), l.get(3), l.indexOf(6))
console.log(0.1 + 0.2)
