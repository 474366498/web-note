const { log } = console



interface opts {
  [name: string]: any
}
let a: number = 5
let obj: opts = {
  a: 2
}
for (let i = 0; i < 10; i++) {
  log(i, i & obj.a)
}
