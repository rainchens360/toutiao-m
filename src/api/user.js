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
// import request from '@/utils/request'
import request from '../utils/request'

// 登录
export function login (data) {
  // 返回请求的Promise对象
  return request.post('authorizations', data)
}
