




class ArrayList {

  public items: any[]
  constructor() {
    this.items = []
  }
  insert(item: any) {
    this.items.push(item)
  }

  toString() {
    return this.items.join(' ')
  }
  swap(m: number, n: number) {
    let temp = this.items[m]
    this.items[m] = this.items[n]
    this.items[n] = temp
  }
  // 冒泡排序
  bubbleSort() {
    let { items } = this
    let length = this.items.length
    for (let j = length - 1; j >= 0; j--) {
      for (let i = 0; i < j; i++) {
        if (this.items[i] > this.items[i + 1]) {
          // let temp = this.items[i]
          // this.items[i] = this.items[i + 1]
          // this.items[i + 1] = temp
          // this.swap(i, i + i)
          this.items = swap(items, i, i + 1)
        }
      }
    }
  }
  // 选择排序
  selectSort() {
    let { items } = this
    let length = this.items.length
    for (let i = 0; i < length - 1; i++) {
      let min = i
      for (let j = i + 1; j < length; j++) {
        if (this.items[min] > this.items[j]) {
          min = j
        }
      }
      this.items = swap(items, min, i)
    }
  }

  // 插入排序
  inserSort() {
    let length = this.items.length

    for (let i = 1; i < length; i++) {
      let temp = this.items[i]
      let j = i
      while (this.items[j - 1] > temp && i > 0) {
        this.items[j] = this.items[j - 1]
        j--
      }
      this.items[j] = temp
    }
  }
  // 希尔排序
  shellSort() {
    let { items } = this
    let length = this.items.length

    let gap = Math.floor(length / 2)

    while (gap >= 1) {
      for (let i = gap; i < length; i++) {
        let temp = this.items[i]
        let j = i
        while (this.items[j - gap] > temp && j > gap - 1) {
          this.items[j] = this.items[j - gap]
          j -= gap
        }
        this.items[j] = temp
      }
      gap = Math.floor(gap / 2)
    }

  }

  quickSort() {
    this.items = quick(this.items, 0, this.items.length)
    console.log(93, this.items)
    // this.items
  }






}

function swap(arr: any[], m: number, n: number): any[] {
  let temp = arr[m]
  arr[m] = arr[n]
  arr[n] = temp
  return arr
}

function getPivot(arr: any[], left: number, right: number) {
  let pivot = left, index = pivot + 1

  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}

function quick(arr: any[], left: number, right: number) {
  let len = arr.length, partitionIndex
  if (left < right) {
    partitionIndex = getPivot(arr, left, right)
    console.log(96, left, right, partitionIndex)
    quick(arr, left, partitionIndex - 1)
    quick(arr, partitionIndex + 1, right)
  }
  return arr
}

let a = new ArrayList()
let arr = [123, 234, 546, 67, 78, 12, 54, 34, 312, 634, 15, 55, 48, 41]

console.log(quick(arr, 0, arr.length - 1))
for (let i = 0; i < arr.length; i++) {
  a.insert(arr[i])
}
// a.swap(1, 5)
// a.bubbleSort()

// a.selectSort()
// a.inserSort()

// a.shellSort()
a.quickSort()
console.log(a.items)
