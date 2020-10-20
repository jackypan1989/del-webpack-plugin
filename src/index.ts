import { Compiler } from 'webpack'
import chalk from 'chalk'
import del from 'del'
import path from 'path'

interface DelWebpackPluginOptions {
  info: boolean,
  keepGeneratedAssets: boolean,
  exclude: string[],
  include: string[],
  allowExternal: boolean,
}

class DelWebpackPlugin {
  options: DelWebpackPluginOptions

  constructor(options: DelWebpackPluginOptions) {
    const defaultOptions: DelWebpackPluginOptions = {
      info: true,
      keepGeneratedAssets: true,
      exclude: [],
      include: ['**'],
      allowExternal: false,
    }
    
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  apply(compiler: Compiler) {
    const outputPath = compiler.options.output.path

    const callback = stats => {
      // check all modules work
      if (stats.hasErrors()) {
        console.log()
        console.log(
          `${chalk.red('Del Webpack Plugin stopped according to module failed.')}`
        )
        return
      }

      // from clean-webpack-plugin :  allow the plugin to clean folders outside of the webpack root. 
      const allowExternal = this.options.allowExternal

      // gather info from compiled files
      const assetNames = stats.toJson().assets.map(asset => asset.name)

      // generated files by webpack, default is exclude all generated files
      const assetPatterns = this.options.keepGeneratedAssets
        ? assetNames.map(name => path.join(outputPath, name))
        : []

      // include files, default is all files (**) under working folder
      const includePatterns = this.options.include.map(
        name => path.join(outputPath, name),
      )

      // exclude files
      const excludePatterns = this.options.exclude.map(
        name => path.join(outputPath, name),
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
          console.log('===== Del Webpack Plugin ===')
          console.log(`${chalk.green('Added files:')}`)
          assetNames.map(name => console.log(name))
          console.log()
          console.log(`${chalk.red('Deleted files:')}`)
          paths.map(name => console.log(path.basename(name)))
          console.log('============================')
          console.log()
        }
      })
    }

    compiler.hooks.done.tap('del-webpack-plugin', callback)
  }
}

module.exports = DelWebpackPlugin
