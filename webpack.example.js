const path = require('path')
const webpack = require('webpack')
const DelWebpackPlugin = require('./src/index')

module.exports = {
  resolve: {
    modules: [path.join(__dirname, 'example'), 'node_modules']
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
    app: path.join(__dirname, 'example/App'),
    app2: path.join(__dirname, 'example/App2')
  },
  output: {
    path: path.join(__dirname, 'example/dist'),
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
      info: true,
      include: ['**'],
      exclude: ['test.js']
    })
  ]
}
