module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    [
      // 装饰器解析
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ]
  ]
}
