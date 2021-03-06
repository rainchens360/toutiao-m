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
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件
// js
import Vant, { Lazyload } from 'vant'

// 根据屏幕大小动态设置根html字体大小
import 'amfe-flexible'
// css
// import 'vant/lib/index.css'
// less
import 'vant/lib/index.less'
// 引入自己写的全局样式
import '@/styles/index.less'

// 导入自己的插件
import { MyPlugin } from '@/utils/request'

// 导入自己的插件2
import Plugins from '@/utils'

// console.log(123)
// console.warn(456)

// 注册图片懒加载插件
Vue.use(Lazyload)

// 注册自己的插件
Vue.use(MyPlugin)
Vue.use(Plugins)

// 注册组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store, // 所有组件可以通过this.$store
  render: h => h(App)
}).$mount('#app')
