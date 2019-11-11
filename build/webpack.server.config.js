const nodeExternals = require('webpack-node-externals')
const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(baseConfig, {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(__dirname, '../src/server/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
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
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  externals: [nodeExternals()]
})
