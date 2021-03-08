/*
*
*          ┌─┐       ┌─┐
*       ┌──┘ ┴───────┘ ┴──┐
*       │                 │
*       │       ───       │
*       │  ─┬┘       └┬─  │
*       │                 │
*       │       ─┴─       │
*       │                 │
*       └───┐         ┌───┘
*           │         │
*           │         │
*           │         │
*           │         └──────────────┐
*           │                        │
*           │                        ├─┐
*           │                        ┌─┘
*           │                        │
*           └─┐  ┐  ┌───────┬──┐  ┌──┘
*             │ ─┤ ─┤       │ ─┤ ─┤
*             └──┴──┘       └──┴──┘
*                 神兽保佑
*                 代码无BUG!
*/
/**
 * 全局公共方法和过滤器
 */
// moment 插件  dayjs 插件  都是处理时间格式
import dayjs from 'dayjs'
// 使用dayjs插件（按需）
import relativeTime from 'dayjs/plugin/relativeTime'
// 国际化 => 默认是英文=》改成中文
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 添加插件
dayjs.extend(relativeTime)

// 睡眠函数
const $sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// 相对时间换算
/**
 *
 * @param {*} value 获取模版中值：val | filter
 */
const relTime = (value) => {
  // console.log(dayjs())
  return dayjs().from(value)
}

// 插件写法
const Plugins = {
  install (Vue) {
    // 全局方法
    Vue.prototype.$sleep = $sleep
    // 全局过滤器
    Vue.filter('relTime', relTime)
  }
}

export default Plugins
