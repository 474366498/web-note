// 双向链表


function DoubleLinked() {

  this.Head = null
  this.Tail = null
  this.length = 0


  function Node(data) {
    this.data = data
    this.prev = null
    this.next = null
  }

  DoubleLinked.prototype.append = function (data) {
    let newNode = new Node(data)
    if (!this.length) {
      this.Head = newNode
      this.Tail = newNode
    } else {
      newNode.prev = this.Tail
      this.Tail.next = newNode
      this.Tail = newNode
    }
    this.length += 1
  }
  DoubleLinked.prototype.insert = function (p, data) {
    if (p < 0 || p >= this.length) return false

    let newNode = new Node(data)
    if (!this.length) {
      this.Head = newNode
      this.Tail = newNode
    } else {
      if (!p) {
        this.Head.prev = newNode
        newNode.next = this.Head
        this.Head = newNode
      } else if (p == this.length) {
        newNode.prev = this.Tail
        this.Tail.next = newNode
        this.Tail = newNode
      } else {
        let current = this.Head
        let i = 0
        while (i++ < p) {
          current = current.next
        }
        console.log(46, current)
        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }
    }
    this.length += 1
  }
  DoubleLinked.prototype.get = function (p) {
    if (p < 0 || p >= this.length) return null

    if (p < Math.floor(this.length / 2)) {
      console.log(38)
      let current = this.Head
      let i = 0
      while (i++ < p) {
        current = current.next
      }
      return current
    } else {
      console.log(45)
      let current = this.Tail
      let i = this.length - 1
      while (i-- > p) {
        current = current.prev
      }
      return current
    }

  }
  DoubleLinked.prototype.indexOf = function (data) {
    let i = 0,
      current = this.Head
    while (current) {
      if (current.data == data) {
        return i
      }
      current = current.next
      i++
    }
    return -1

  }
  DoubleLinked.prototype.update = function (p, data) {
    if (p < 0 || p >= this.length) return false
    if (p <= Math.floor(this.length / 2)) {
      let i = 0,
        current = this.Head
      while (i++ < p) {
        current = current.next
      }
      current.data = data
      return true
    } else {
      let i = this.length - 1,
        current = this.Tail
      while (current) {
        if (i === p) {
          console.log(109, i, current)
          current.data = data
          return true
        }
        current = current.prev
        i--
      }
    }
  }
  DoubleLinked.prototype.removeAt = function (p) {
    if (p < 0 || p >= this.length) return false
    //  只有一个    最左    最右   普通  
    if (this.length == 1) {
      this.Head = null
      this.Tail = null
    } else {
      if (!p) {
        this.Head.next.prev = null
        this.Head = this.Head.next
      } else if (p === this.length - 1) {
        this.Tail.prev.next = null
        this.Tail = this.Tail.prev
      } else {
        let i = 0,
          current = this.Head
        while (i++ < p) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
    }
    this.length--
    return true
  }
  DoubleLinked.prototype.remove = function (data) {    // indexOf + removeAt 
    let i = 0,
      current = this.Head
    while (current) {
      if (current.data == data) {
        console.log(147, i, current)
        this.removeAt(i)
        return true
      }
      i++
      current = current.next
    }
    return false
  }
  DoubleLinked.prototype.isEmpty = function () {
    return !this.length
  }
  DoubleLinked.prototype.size = function () {
    return this.length
  }

  DoubleLinked.prototype.getHead = function () {
    return this.Head.data
  }
  DoubleLinked.prototype.getTail = function () {
    return this.Tail.data
  }
  DoubleLinked.prototype.toString = function () {
    return this.backwordString()
  }


  DoubleLinked.prototype.forwardString = function () {
    let current = this.Tail
    let result = ''
    while (current) {
      result += current.data + '<='
      current = current.prev
    }
    return result
  }
  DoubleLinked.prototype.backwordString = function () {
    let current = this.Head
    let result = ''
    while (current) {
      result += current.data + '=>'
      current = current.next
    }
    return result
  }

}



let l = new DoubleLinked()

l.append(1)
// l.insert(0, 0)

l.append(3)
// l.insert(2, 2)
l.append(5)
l.append(7)
l.append(9)
// l.update(5, 7.5)
l.remove(1)
console.log(l, l.backwordString(), l.forwardString())
// console.log(l.indexOf(4))

// 0=>1=>2=>3=>5=>7.5=>9=> 9<=7.5<=5<=3<=2<=1<=0<=
// 1=>3=>5=>7=>9=> 9<=7<=5<=3<=1<=
