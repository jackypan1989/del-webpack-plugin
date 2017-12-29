const path = require('path')
const del = require('del')
const chalk = require('chalk')

class DelWebpackPlugin {
  constructor (options = { info: true, exclude: [], include: ['**'] }) {
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

      // include files, default is all files (**) under working folder
      const includePatterns = this.options.include.map(name => path.join(outputPath, name))

      // exclude files
      const excludePatterns = [
        outputPath,
        ...this.options.exclude.map(name => path.join(outputPath, name)),
        ...assetNames.map(name => path.join(outputPath, name))
      ]
  
      // run delete 
      del(includePatterns, {
        ignore: excludePatterns
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
