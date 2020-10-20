/* eslint-disable @typescript-eslint/no-var-requires */
const DelWebpackPlugin = require('del-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: false,
  entry: {
    app: path.join(__dirname, 'src/App'),
    app2: path.join(__dirname, 'src/App2')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new DelWebpackPlugin({
      include: ['**'],
      exclude: ['test.js'],
      info: true,
      keepGeneratedAssets: true
    })
  ]
}
