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
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
          {
              test: /\.jsx?$/,
              loader: 'eslint',
              include: [
                path.resolve(__dirname, "wwwroot/app")
              ]
          }
        ],
        loaders: [
          {
              loader: 'babel',
              include: [
                path.resolve(__dirname, "wwwroot/app")
              ],
              test: /\.jsx?$/,
              query: {
                  presets: ['es2015', 'react']
              }
          },
          {
              loader: 'style-loader!css-loader',
              test: /\.css$/
          }
        ]
    }
}