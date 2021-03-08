module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 屏宽/10 = 1rem
      // 通过!css样式属性，排除当前样式不转换=》!width
      propList: ['*'] // 要转换的样式属性=》*代表所有
    }
  }
}
