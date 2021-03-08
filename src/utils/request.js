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
 * 基于axios封装全局请求方法
 * 步骤：
 * 1. 导入axios，创建一个新的axios实例=》配置请求基础地址
 * 2. 加入拦截器=》header部分统一添加token
 */

import axios from 'axios'
import JBIG from 'json-bigint'
// 导入vuex实例
import store from '@/store'
// 导入路由实例
import router from '../router'

// axios实例 =》可以创建多个
const MyAxios = axios.create({
  // 请求基础地址
  baseURL: 'http://toutiao-app.itheima.net/v1_0/',
  // 自定义格式化后台返回的数据
  transformResponse: [function (data) {
    try {
      // JBIG.parse=> 功能和JSON.parse方法类似，但是存在大数不会失真
      return JBIG.parse(data)
    } catch (error) {
      console.warn(error)
      return data
    }
  }]
})

// 添加拦截器
// Add a request interceptor
// 请求拦截器=》执行=》发出请求之前
MyAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 统一添加token
  // 排除登录注册等接口
  if (store.state.user.token && config.url !== 'authorizations') {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  // 处理接口版本问题
  if (config.url === 'articles') {
    // 临时改变基础地址中的版本号
    config.baseURL = config.baseURL.replace('v1_0', 'v1_1')
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 响应拦截器=》1. 后台返回数据先走到这里=》然后才到页面组件
MyAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('后台返回数据：', response)
  // 简化返回给页面的数据
  const _res = {
    status: response.status,
    data: response.data?.data
  }
  return _res
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log('拦截器捕获401错误', JSON.stringify(error), error.response, error.response.status)
  /**
   * 1. 没有登陆过 =》跳回登录页登录
   * 2. 登陆过=》
   *    1. token失效了，但是refresh_token没有失效=》根据refresh_token获取新token
   *    2. token和refresh_token都失效了=》跳回登录页登录
   */
  // 登录页跳转参数 => 携带出现401的页面path => router.currentRoute.path
  const loginConf = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
  try {
    if (error.response && error.response.status === 401) {
      // vuex获取token
      const { user } = store.state
      // 1. 没有登陆过 =》跳回登录页登录
      if (!user.token || !user.refresh_token) {
        router.push(loginConf)
        return Promise.reject(error)
      }
      // 2. 登陆过=》 1. token失效了，但是refresh_token没有失效=》根据refresh_token获取新token
      // 调用后台接口刷新token
      const { data } = await MyAxios.put('authorizations', null, {
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 更新本地失效token
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      // 继续上次请求=》续上
      return MyAxios(error.config)
    }
  } catch (error) {
    // 2. 登陆过=》token和refresh_token都失效了=》跳回登录页登录
    router.push(loginConf)
    return Promise.reject(error)
  }

  return Promise.reject(error)
})

// vue插件
const MyPlugin = (Vue) => {
  Vue.prototype.request = MyAxios
}

// 导出插件
export { MyPlugin }

export default MyAxios
