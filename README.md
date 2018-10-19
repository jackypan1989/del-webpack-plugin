[![](https://img.shields.io/npm/v/del-webpack-plugin.svg)](https://www.npmjs.com/package/del-webpack-plugin)
[![](https://img.shields.io/npm/dt/del-webpack-plugin.svg)](https://www.npmjs.com/package/del-webpack-plugin)
![](https://img.shields.io/github/license/jackypan1989/del-webpack-plugin.svg)
# Del-webpack-plugin 
This webpack plugin clean old files after build
Just as the well-known plugin [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin), and more than it.

## changelog
2018-04-25 (1.0.5): upgrade to webpack v4  
2018-05-28 (1.0.6): fix and update lib  
2018-08-30 (1.1.0): add keepGeneratedAssets option  
2018-10-18 (1.2.0): add allowExternal option

## feature
- [x] only delete after webpack compile
- [x] skip plugin if compile error
- [x] multiple entry / path support
- [x] include / exclude files support
- [x] verbose / mute info support
- [x] colorful log with chalk
- [x] example with webpack
- [x] support cross platform

![](https://i.imgur.com/t65OjUv.png)

## install
```
// use npm
npm install -D del-webpack-plugin

// use yarn
yarn add -D del-webpack-plugin
```

## usage (in your webpack config)
```
const DelWebpackPlugin = require('del-webpack-plugin')

{
  plugins: [
    new DelWebpackPlugin({
      include: ['**'],
      exclude: ['test.js'],
      info: true,
      keepGeneratedAssets: true,
      allowExternal: false
    })
  ]
}
```

## options

### options.info
console.log added files and deleted files
- type: Boolean
- default: true

### options.keepGeneratedAssets
keep webpack generated files
- type: Boolean
- default: true

### options.allowExternal
allows del-webpack-plugin to delete files outside of webpack root folder
- type: Boolean
- default: false

### options.include
a file list you wanna delete
it will delete all files and folders by default
- type: [String]
- default: ['**']
- example: ['trash.js', 'trash/*.js']

// only files not folders use ['**.*']

### options.exclude
a file list you dont wanna delete
- type: [String]
- default: []
- example: ['test.js', 'test/*.js']

Welcome any issues and PRs submit :D
