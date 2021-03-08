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
import VueRouter from 'vue-router'
// 导入路由配置规则
import routes from './routes'
// 导入vuex实例
import store from '@/store'
// console.log(store)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 路由实例
const router = new VueRouter({
  routes
})

/**
 * 路由访问拦截
 * 需求：访问某些页面，拦截判断是否登录
 */
/**
 * to: 去哪了
 * from:从哪里来
 * next: 走不走
 */
router.beforeEach((to, from, next) => {
  /**
   * 1. 从store获取token
   * 2. 拦截判断是否存的有token
   */
  const { token } = store.state.user
  if (!token && to.path.startsWith('/user')) {
    // 说明：跳回登录的时候=》通过query参数带上当前跳转页面的地址
    // 目的：登陆成功后获取redirectUrl=》跳转到上次访问页面
    // { path: '/login', query: { redirectUrl: to.path } } =>等价于 push(`/login?redirectUrl=${to.path}`)
    next({ path: '/login', query: { redirectUrl: to.path } })
  } else {
    next()
  }
})

export default router
