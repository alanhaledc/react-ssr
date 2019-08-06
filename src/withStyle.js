// 使用 react hook 后，复用组件代码使用函数，不使用高阶组件了

const withStyle = (staticContext, styles) => {
  if (staticContext) {
    staticContext.css.push(styles._getCss())
  }
}

export default withStyle
