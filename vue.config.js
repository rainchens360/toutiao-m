module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        // 修改vant组件库中的变量值=》定制主题
        modifyVars: {
          // 直接覆盖变量
          blue: '#3296fa'
        }
        // }
      }
    }
  }
}
