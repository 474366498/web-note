//  monerepo

const fs = require('fs')

// 获取packages中的文件夹
const dirs = fs.readdirSync('packages').filter(p => {
  console.log(7, p)
  if (!fs.statSync(`packages/${p}`).isDirectory() || p === 'v3') {
    return false
  }
  return true
})

// 进行打包
async function build(target) {
  const { execa } = await import('execa')
  console.log(16, 'build')
  // execa 打包 参数 打包方式 ， [-c rollup环境配置  , 环境变量 -env ] 
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}



async function runBuild(dirs, itemFn) {
  let result = []
  for (let dir of dirs) {
    result.push(itemFn(dir))
  }
  return Promise.all(result)
}

runBuild(dirs, build).then(() => {
  console.log('success')
})

console.log(13, dirs)


