
const fs = require('fs'), chalk = require('chalk')



//  targets: allTargets, fuzzyMatchTarget

const targets = (exports.targets = fs.readdirSync('packages').filter(f => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
}))

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []

  partialTargets.forEach(partial => {
    for (const target of targets) {
      if (target.match(partial)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })

  if (matched.length) {
    return matched
  } else {
    console.log(`%c 提示警告开始`, "background:red;color:white")
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    )
    console.log(`%c 提示警告结束`, "background:green;color:white")
    process.exit(1)
  }

}


