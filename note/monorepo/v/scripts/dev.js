


// 子包单独打包
async function build(target) {
  const { execa } = await import('execa')
  console.log('单独打包:', target, process.env)
  await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

build('runtime-dom')