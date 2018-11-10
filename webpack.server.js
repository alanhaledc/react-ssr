const nodeExternals = require('webpack-node-externals')
const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
    target: 'node',
    mode: 'development',
    entry: './src/server/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    externals: [nodeExternals()]
  }
)