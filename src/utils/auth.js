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
 * 存储登录成功后，从后台获取的token=》存储2个
 * 注意：存储的数据结构=> {token:'dfdf', refresh_token:'dfdfdf'}
 * 步骤：
 * 1. 定义存储的key
 * 2. 定义存储的方法 => 存储、获取和删除方法
 */

const TT_TOKEN = 'TT_TOKEN'

/**
 *
 * @param {*} token 存储的数据结构=> {token:'dfdf', refresh_token:'dfdfdf'}=> 需要序列化
 */
export function setToken (token) {
  localStorage.setItem(TT_TOKEN, JSON.stringify(token))
}

/**
 * 获取存在本地的token
 */
export function getToken () {
  try {
    return JSON.parse(localStorage.getItem(TT_TOKEN))
  } catch (error) {
    console.warn(error)
    return localStorage.getItem(TT_TOKEN)
  }
}

/**
 * 删除本地存储token
 */
export function delToken () {
  localStorage.removeItem(TT_TOKEN)
}
