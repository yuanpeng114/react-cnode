import { call,put, take,all,race} from 'redux-saga/effects';
import {
  COLLECT_TOPIC,
  CANCEL_COLLECT,
  REPLY_TOPIC,
  UP_VOTE
} from '../actions/topics';
import {User} from '../Api';

// 收藏取消主题
function* collectTopic(){
    let is_collect;
    while(true){
      const action = yield take([COLLECT_TOPIC,CANCEL_COLLECT]);
      try{
        if(action.type == COLLECT_TOPIC){
          yield call(User.collectTopic,{topic_id: action.topic_id});
          is_collect = true;
        }else{
          yield call(User.cancelCollect,{topic_id: action.topic_id});
          is_collect = false;
        }
          yield put({type: 'COLLECT_OR_CANCEL_DONE', is_collect});
      }catch(err){
        yield err;
      }
    }
}
//评论
function* replyTopic(){
    while(true){
      const {topic_id,info} = yield take(REPLY_TOPIC);
      try{
         const data = yield call(User.replyTopic,topic_id,info);
         yield put({type: 'GET_TOPIC_DETAIL',topic_id})
      }catch(err){
         yield err;
      }
    }
}
// 点赞
function* upvote(){
  while(true){
    const {topic_id,reply_id} = yield take(UP_VOTE);
    try{
      const data = yield call(User.upvote,reply_id);
      yield put({type: 'GET_TOPIC_DETAIL',topic_id})
    }catch(err){
      yield err;
    }
  }
}

export default function* topicInteraction(){
  yield all([
    collectTopic(),
    replyTopic(),
    upvote()
  ])
}
