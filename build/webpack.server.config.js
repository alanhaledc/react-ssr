const nodeExternals = require('webpack-node-externals')
const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, '../src/server/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          'isomorphic-style-loader',
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
  },
  externals: [nodeExternals()]
})
