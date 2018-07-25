import { createStore,combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from "history/createBrowserHistory";
import {
  routerReducer,
  routerMiddleware
} from "react-router-redux";

import rootReducer from './reducer';
import rootSaga  from './sagas';

//saga,路由中间件
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const handleRouter = routerMiddleware(history);

const middleware = [sagaMiddleware,handleRouter];

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export {store,history};
