import { call,put, take,all} from 'redux-saga/effects';
import {PUBLISH_TOPIC} from '../actions/common';
import {User} from '../Api';

//发表主题
function* publishTopic(){
    while(true){
      let {info}= yield take(PUBLISH_TOPIC);
      try{
        const {data} = yield call(User.addTopic,info);
        yield put({type: "PUBLISH_TOPIC_SUCCESS",data})
      }catch(err){
        yield err;
      }
    }
}


export default function* common(){
  yield all([
    publishTopic()
  ])
}
