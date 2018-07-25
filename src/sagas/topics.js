import { delay } from 'redux-saga';
import { call,put,take, all } from 'redux-saga/effects';
import {LOAD_MORE,GET_TOPICS,GET_TOPIC_DETAIL} from '../actions/topics';
import {Topic,User} from '../Api';

const Root = "https://cnodejs.org/api/v1";
let curNumOfPage = 1,isLoadMore;

//获取当前类别主题
export function* getTopics(){
    while(true){
      const {searchTab} = yield take(GET_TOPICS);
      try{
        yield put({type: 'REQUEST_START'});
        const {data:{data:topicList}} = yield call(Topic.getNew,searchTab);
        curNumOfPage = 1;
        isLoadMore = false;
        yield put({type: 'GET_TOPICLIST_SUCCESS', topicList,isLoadMore})
      }catch(err){
        yield err;
      }
    }
}
//下拉加载更多
function* loadMore(){
    while(true){
      const {searchTab} = yield take(LOAD_MORE);
      try{
        const {data:{data:topicList}} = yield call(Topic.getMore,searchTab,++curNumOfPage);
        isLoadMore = true;
        yield put({type: 'GET_TOPICLIST_SUCCESS', topicList,isLoadMore})
      }catch(err){
        yield err;
      }
    }
}
//获取主题详情
function* getTopicDetail(){
    while(true){
      const {topic_id} = yield take('GET_TOPIC_DETAIL');
      try{
        const {data:{data:topicDetail}} = yield call(Topic.getDetail,topic_id);
        yield put({type: 'GET_TOPIC_DETAIL_SUCCESS', topicDetail})
      }catch(err){
        yield err;
      }
    }
}

export default function* topics(){
  yield all([
    getTopicDetail(),
    getTopics(),
    loadMore(),
  ])
}
