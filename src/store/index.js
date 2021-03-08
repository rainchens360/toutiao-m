import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地存储方法=> 导入所有方法，放到一个对象上
import * as auth from '@/utils/auth'
// console.log(auth)

Vue.use(Vuex)

// 初始化vuex实例并导出=> 集中管理
export default new Vuex.Store({
  // 定义vuex中存储的数据=》类似组件data
  state: {
    // token字段
    user: auth.getToken() || {}
  },
  // 定义方法修改state中的数据
  mutations: {
    // 存储token
    /**
     *
     * @param {*} state state数据
     * @param {*} token 组件传递的数据
     */
    setUser (state, token) {
      /**
       * 解决刷新问题：
       * 1. 本地存储
       */
      // 存到内存
      state.user = token
      // 本地存一份
      auth.setToken(token)
    },
    // 删除token
    delUser (state) {
      state.user = {}
      auth.delToken()
    }

  },
  // 获取后台API数据
  actions: {
  },
  // vuex模块化=》拆分vuex数据进行管理
  modules: {
  }
})
