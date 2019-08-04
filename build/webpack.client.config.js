const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
})
