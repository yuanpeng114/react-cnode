import axios from 'axios';

const ROOT = "https://cnodejs.org/api/v1";
let token = null;
const setToken = _token => token = _token;

const setTokenPlugin = function(reqType){
    this.defaults.params = {};
    this.defaults.params["accesstoken"] = token;
    return this;
}
const request = {
  get: (url,params) => setTokenPlugin.call(axios,"get").get(`${ROOT}${url}`,params),
  post: (url,body) => setTokenPlugin.call(axios,"post").post(`${ROOT}${url}`,body)
}

const Auth = {
  // 登陆
  login: accesstoken =>  request.post("/accesstoken",accesstoken),
  // 获取用户
  getUser: username =>
    request.get(`/user/${username}`),
}
// 主题列表
const Topic = {
  getMore: (search,curNumOfPage) =>
      request.get(`/topics${search}&page=${curNumOfPage}`),
  getNew: search =>
      request.get(`/topics${search}`),
  getDetail:  (topic_id) =>
      request.get(`/topic/${topic_id}`)
}
const User = {
  // 新建主题 编辑主题(title,tab)
  addTopic: info =>
      request.post("/topics",info),
  updateTopic: info =>
      request.post("/topics/update",info),
  // 收藏,取消主题(topic_id)
  collectTopic: topic_id =>
      request.post("/topic_collect/collect",topic_id),
  cancelCollect: topic_id =>
      request.post("/topic_collect/de_collect",topic_id),
  // 回复(reply_id,content)
  replyTopic: (topic_id,info) =>
      request.post(`/topic/${topic_id}/replies`,info),
  // 评论点赞
  upvote: reply_id =>
      request.post(`/reply/${reply_id}/ups`),

}
export {
  Auth,
  Topic,
  User,
  setToken
};
