const path = require('path')
const del = require('del')
const chalk = require('chalk')

class DelWebpackPlugin {
  constructor (options = { info: true }) {
    this.options = options
  }

  apply (compiler) {
    const outputPath = compiler.options.output.path

    compiler.plugin('done', stats => {
      // gather info from compiled files
      const assetNames = stats.toJson().assets.map(asset => asset.name)

      // delete files
      const ignorePatterns = [
        outputPath,
        ...assetNames.map(name => path.join(outputPath, name))
      ]
      del(path.join(outputPath, '**'), {
        ignore: ignorePatterns
      }).then(paths => {
        if (this.options.info) {
          console.log()
          console.log(`===== Del Webpack Plugin ===`)
          console.log(`${chalk.green('Compiled files:')}`)
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
