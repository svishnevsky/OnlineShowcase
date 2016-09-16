var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    './wwwroot/app/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'wwwroot/dist'),
    filename: 'bundle.js',
    publicPath: '/wwwroot/dist/'
  },
 plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "wwwroot/app"),
        ],
      }
    ],
    loaders: [ 
      {
        loaders: ['react-hot', 'babel'],
        include: [
          path.resolve(__dirname, "wwwroot/app"),
        ],
        test: /\.jsx$/,
        plugins: ['transform-runtime'],
      }
    ]
  }
}