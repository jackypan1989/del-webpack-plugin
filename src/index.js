const path = require('path')
const del = require('del')
const chalk = require('chalk')

class DelWebpackPlugin {
  constructor (options = { info: true, exclude: [] }) {
    this.options = options
  }

  apply (compiler) {
    const outputPath = compiler.options.output.path

    compiler.plugin('done', stats => {
      // check all modules work
      if (stats.hasErrors()) {
        console.log()
        console.log(
          `${chalk.red(`Del Webpack Plugin stopped according to module failed.`)}`
        )
        return
      }

      // gather info from compiled files
      const assetNames = stats.toJson().assets.map(asset => asset.name)

      // delete files
      const ignorePatterns = [
        outputPath,
        ...this.options.exclude.map(name => path.join(outputPath, name)),
        ...assetNames.map(name => path.join(outputPath, name))
      ]
      del(path.join(outputPath, '**'), {
        ignore: ignorePatterns
      }).then(paths => {
        if (this.options.info) {
          console.log()
          console.log(`===== Del Webpack Plugin ===`)
          console.log(`${chalk.green('Added files:')}`)
          assetNames.map(name => console.log(name))
          console.log()
          console.log(`${chalk.red('Deleted files:')}`)
          paths.map(name => console.log(path.basename(name)))
          console.log(`============================`)
          console.log()
        }
      })
    })
  }
}

module.exports = DelWebpackPlugin
