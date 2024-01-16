



const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk'),
  execa = require('execa')

const { gzipSync } = require('zlib')
const { compress } = require('brotli')
const { targets: allTargets, fuzzyMatchTarget } = require('./utils')

// const args = require('minimist')(process.argv.slice(2))
// const targets = args._
// const formats = args.formats || args.f
// const devOnly = args.devOnly || args.d
// const prodOnly = !devOnly && (args.prodOnly || args.p)
// const sourceMap = args.sourcemap || args.s
// const isRelease = args.isRelease
// const buildTypes = args.t || args.types || isRelease
// const buildAllMatching = args.all || args.a
// const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)


const args = require('minimist')(process.argv.slice(2))
const targets = args._
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)


console.log(16, process.argv)
console.log(17, args, targets, isRelease, commit)  // { _: [] }

run()

async function run() {
  if (isRelease) {
    await fs.remove(path.resolve(__dirname, '../node_modules/.rts2_cache'))
  }

  console.log(36, targets, allTargets, buildAllMatching)
  if (!targets.length) {
    await buildAll(allTargets)
  } else {

  }

}

async function buildAll(targets) {
  let cpus = require('os').cpus()
  console.log(`%c cpus : ${cpus} `, "background:red;color:white")
  await runParallel(cpus.length, targets, build)
}

async function runParallel(size, source, iteratorFn) {
  const ret = [], executing = []
  for (item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    if (size <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= size) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`),
    pkg = require(`${pkgDir}/package.json`)
  console.log(71, pkgDir, pkg)

  if ((isRelease || !target.length) && pkg.private) {
    return
  }

  if (!formats) {
    await fs.remove(`${pkgDir}/dist`)
  }

  const env = (pkg.buildOptions && pkg.buildOptions.env) || (devOnly ? 'development' : 'production')

  console.log(82, env, target)
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        buildTypes ? `TYPES:true` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
  console.log(103, buildTypes, pkg.types)
  if (buildTypes && pkg.types) {
    console.log()
    console.log(
      chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
    )

    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')
    const extractorConfigPath = path.resolve(pkgDir, 'api-extractor.json')
    console.log(110, extractorConfigPath)
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })

    if (extractorResult.succeeded) {
      const typesDir = path.resolve(pkgDir, 'types')
      if (await fs.exists(typesDir)) {
        const dtsPath = path.resolve(pkgDir, pkg.types)
        const existing = await fs.readFile(dtsPath, 'utf-8')
        const typeFiles = await fs.readdir(typesDir)
        const toAdd = await Promise.all(typeFiles.map(file => {
          return fs.readFile(path.resolve(typesDir, file), 'utf-8')
        }))
        await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      }
      console.log(
        chalk.bold(chalk.green(`API Extractor completed successfully.`))
      )
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
      )
      process.exitCode = 1
    }
    await fs.remove(`${pkgDir}/dist/packages`)
  }

}


