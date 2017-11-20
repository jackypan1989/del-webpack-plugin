# del-webpack-plugin
remove/clean old files after webpack building

## feature
- [x] only delete after webpack compile
- [x] skip plugin if compile error
- [x] multiple entry / path support
- [x] exclude files support
- [x] verbose / mute info support
- [x] colorful log with chalk
- [x] example with webpack
- [x] support cross platform

## install
```
// use npm
npm install -D del-webpack-plugin

// use yarn
yarn add -D del-webpack-plugin
```

## usage (or see webpack.example.js)
```
const DelWebpackPlugin = require('clean-webpack-plugin')

{
  plugins: [
    new DelWebpackPlugin({
      info: true
    })
  ]
}
```
