const { log } = console;


function myInstanceof(l: any, r: any): Boolean {
  if (typeof l !== 'object' || l === null) return false

  let p = Object.getPrototypeOf(l)

  while (true) {
    if (p === null) return false
    if (p == r.prototype) return true
    p = Object.getPrototypeOf(p)
  }
}


log(myInstanceof(1, String), Object.is(1, '1'))


for (var i = 1; i < 3; i++) {
  setTimeout(function (...args) {
    log(args);
  }, 1, i, 2 * i);
}





