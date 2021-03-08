import request from '../utils/request'
/**
 * 文章相关
 */
// 频道新闻推荐_V1.1
/**
 *
 * @param {*} channelId 频道ID
 * @param {*} timestamp 新闻请求分页参数
 * @param {*} with_top 是否包含置顶数据 =》 1 | 0
 * @returns
 */
export function getArticlesById (channelId, timestamp, with_top = 1) {
  return request.get('articles', {
    params: {
      channel_id: channelId, timestamp, with_top
    }
  })
}
