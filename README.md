[![](https://img.shields.io/npm/v/del-webpack-plugin.svg)](https://www.npmjs.com/package/del-webpack-plugin)
[![](https://img.shields.io/npm/dt/del-webpack-plugin.svg)](https://www.npmjs.com/package/del-webpack-plugin)
![](https://img.shields.io/github/license/jackypan1989/del-webpack-plugin.svg)
# Del-webpack-plugin 

**v2 was released, support webpack v5 !** 

A clean webpack plugin which can remove old files after bundling just as the well-known plugin [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin), and more than it.

## changelog
2021-04-01 (2.1.0): bump version, only use esbuild
2020-10-20 (2.0.0): rewrite to ts, rollup, and support webpack v5  
2018-04-25 (1.0.5): upgrade to webpack v4  
2018-05-28 (1.0.6): fix and update lib  
2018-08-30 (1.1.0): add keepGeneratedAssets option  
2018-10-18 (1.2.0): add allowExternal option  

## feature
- [x] webpack v5
- [x] typed source code
- [x] only delete after webpack compile
- [x] skip plugin if compile error
- [x] multiple entry / path support
- [x] include / exclude files support
- [x] verbose / mute info support
- [x] colorful log with chalk
- [x] example with webpack
- [x] support cross platform

![](https://i.imgur.com/B1UWz2n.png)

## install
```shell
# use yarn
yarn add -D del-webpack-plugin

# use npm
npm i -D del-webpack-plugin
```

## usage (in your webpack config)
```js
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

| field | desc | type | default |
|---|---|---|---|
| info  | console.log added files and deleted files | ```boolean```  | ```true``` |
| keepGeneratedAssets  | keep webpack generated files | ```boolean```  | ```true``` |
| allowExternal | allows del-webpack-plugin to delete files outside of webpack root folder | ```boolean``` | ```false``` |
| include | a file list you wanna delete it will delete all files and folders by default, example: ```['trash.js', 'trash/*.js']``` | ```string[]``` | ```['**']``` |
| exclude | a file list you dont wanna delete, example: ```['test.js', 'test/*.js']``` | ```string[]``` | ```[]``` |

---

**Welcome any issues and PRs submit :D**
