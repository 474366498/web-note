// 进行打包 monerepo

const fs = require('fs')
const execa = require('execa')

const dirs = fs.readdirSync('packages').filter(f => {
  // 判断 packages/${f} 是否是一个文件夹 
  if (fs.statSync(`packages/${f}`).isDirectory()) {
    return true
  }
  return false
})

console.log(7, dirs)


async function run(dirs, buildFn) {
  const result = []
  for (let item of dirs) {
    result.push(buildFn(item))
  }
  return result
}

async function build(target) {
  // execa  -c 执行rollup 环境配置
  console.log('build', target)
  await execa(
    'rollup',
    [
      '-c',
      '--environment', // 环境变量
      `TARGET:${target}`
    ],
    { stdio: 'inherit' }
  )


}


run(dirs, build).then(() => {
  console.log('build success')
}) 
