export const GET_TOPICS = "GET_TOPICS"; //获取主题列表
export const LOAD_MORE = "LOAD_MORE"; //下滑加载更多
export const GET_TOPIC_DETAIL = "GET_TOPIC_DETAIL"; //获取主题详情
export const CLEAR_TOPIC = "CLEAR_TOPIC"; //清除主题详情
export const COLLECT_TOPIC = "COLLECT_TOPIC"; //收藏主题
export const CANCEL_COLLECT = "CANCEL_COLLECT"; //取消收藏主题
export const REPLY_TOPIC = "REPLY_TOPIC"; //回复该主题
export const UP_VOTE = "UP_VOTE"; //点赞

export const getTopics = searchTab => ({
  type: GET_TOPICS,
  searchTab,
})
export const loadMore = searchTab => ({
  type: LOAD_MORE,
  searchTab,
})
export const getTopicDetail = (topic_id) => ({
  type: GET_TOPIC_DETAIL,
  topic_id,
})
export const clearTopic = () => ({
  type: CLEAR_TOPIC,
})
// 收藏,取消主题(topic_id)
export const collectTopic = topic_id => ({
    type: COLLECT_TOPIC,
    topic_id
})
export const cancelCollect = topic_id => ({
    type: CANCEL_COLLECT,
    topic_id
})
// 回复主题(reply_id,content)
export const replyTopic = (topic_id,info) => ({
    type: REPLY_TOPIC,
    topic_id,
    info
})
// 评论点赞
export const upvote = (topic_id,reply_id) => ({
    type: UP_VOTE,
    topic_id,
    reply_id
})
