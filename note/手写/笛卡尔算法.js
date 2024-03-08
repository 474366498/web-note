

// https://juejin.cn/post/7244009969535877180
// 	笛卡尔积：笛卡尔乘积是指在数学中，两个集合X和Y的笛卡尓积，又称直积，表示为X × Y，第一个对象是X的成员而第二个对象是Y的所有可能有序对的其中一个成员

var colors = ['黑', '白', '红', '绿',], sizes = ['XS', 'S', 'M', 'L', 'XL',], textures = ['棉布', '麻布', '丝绸', '呢绒',]

var attrArray = [colors, sizes, textures]

function generate(array) {
  let skus = []
  skus = array.reduce((col, set) => {
    let res = []
    col.forEach(c => {
      set.forEach(s => {
        let t = c + '-' + s
        res.push(t)
      })
    })
    return res
  })
  return skus
}

let s = generate(attrArray)
console.log(26, s, s.length)


