# Del-webpack-plugin
This webpack plugin clean old files after build.  
Just as the well-known plugin [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin), and more than it.

## changelog
2018-04-25 (1.0.5): upgade to webpack v4

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
      info: true,
      exclude: ['test.js']
    })
  ]
}
```

## options

### options.info
console.log added files and deleted files
- type: Boolean
- default: true

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
