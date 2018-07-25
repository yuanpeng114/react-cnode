import { combineReducers} from 'redux';
import common from './common';
import topic from './topics';
import auth from './auth';

export default combineReducers({
  common,
  topic,
  auth
})
