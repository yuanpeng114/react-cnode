import { call,fork,put, take,all} from 'redux-saga/effects';
import {LOGIN,LOGOUT,GET_USER} from '../actions/auth';
import {Auth,setToken} from '../Api';

function* login(accesstoken) {
  try {
    const {data:data}= yield call(Auth.login, {accesstoken: accesstoken.trim()});
    window.localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
    yield setToken(accesstoken);
    yield put({type: 'LOGIN_SUCCESS', data});
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error});
  }
}

//登陆退出
function* loginFlow(){
  while(true){
    const {accesstoken} =  yield take(LOGIN);
    yield put({type: "LOGIN_START"})
    yield fork(login,accesstoken);
    yield take([LOGOUT,"LOGIN_ERROR"]);
    yield setToken(null);
    yield window.localStorage.removeItem('accesstoken');
  }
}
//获取用户
function* getUser(){
  while(true){
    const {username} = yield take(GET_USER);
    try{
      const {data: {data}} = yield call(Auth.getUser,username);
      yield put({type: "GET_USER_SUCCESS",data})
    }catch(err){
      yield put({type: "GET_USER_ERROR"})
    }

  }
}

export default function* auth(){
  yield all([
    loginFlow(),
    getUser()
  ])
}
