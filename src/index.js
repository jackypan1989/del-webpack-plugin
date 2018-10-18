const path = require('path')
const del = require('del')
const chalk = require('chalk')
const { map } = require('ramda')

class DelWebpackPlugin {
  constructor (options) {
    this.options = {
      info: true, 
      keepGeneratedAssets: true,
      exclude: [], 
      include: ['**'],
      allowExternal: false,
      ...options
    }
  }

  apply (compiler) {
    const outputPath = compiler.options.output.path

    const callback = stats => {
      // check all modules work
      if (stats.hasErrors()) {
        console.log()
        console.log(
          `${chalk.red(`Del Webpack Plugin stopped according to module failed.`)}`
        )
        return
      }
  
      // from clean-webpack-plugin :  allow the plugin to clean folders outside of the webpack root. 
      const allowExternal = this.options.allowExternal;

      // gather info from compiled files
      const assetNames = map(
        asset => asset.name, 
        stats.toJson().assets
      )

      // generated files by webpack, default is exclude all generated files
      const assetPatterns = this.options.keepGeneratedAssets
        ? map(name => path.join(outputPath, name), assetNames)
        : []

      // include files, default is all files (**) under working folder
      const includePatterns = map(
        name => path.join(outputPath, name),
        this.options.include
      )

      // exclude files
      const excludePatterns = map(
        name => path.join(outputPath, name),
        this.options.exclude
      )

      // all ignore files
      const allExcludePatterns = [
        outputPath,
        ...excludePatterns,
        ...assetPatterns
      ]
  
      // run delete 
      del(includePatterns, {
        force: allowExternal,
        ignore: allExcludePatterns
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
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('del-webpack-plugin', callback)
    } else {
      compiler.plugin('done', callback)
    }
  }
}

module.exports = DelWebpackPlugin
