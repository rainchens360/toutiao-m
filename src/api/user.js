// import request from '@/utils/request'
import request from '../utils/request'

/**
 * 登录
 * @param {*} data {mobile, code}
 */
export function login (data) {
  // 返回请求的Promise对象
  return request.post('authorizations', data)
}
