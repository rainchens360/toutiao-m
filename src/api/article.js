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
import request from '../utils/request'
// 文章相关 频道新闻推荐
/**
 * @param {*} channelId 频道ID
 * @param {*} timestamp 新闻请求分页参数
 * @param {*} with_top 是否包含置顶数据 1 | 0
 */
export function getArticlesById (channelId, timestamp, with_top = 1) {
  return request.get('articles', {
    params: {
      channel_id: channelId, timestamp, with_top
    }
  })
}

// 根据文章ID添加不感兴趣
/**
 *
 * @param {*} target 文章ID
 */
export function disLikeById (target) {
  return request.post('article/dislikes', {
    target
  })
}
