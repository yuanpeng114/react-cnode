import { all  } from 'redux-saga/effects';
import topics from './topics';
import auth from './auth';
import common from './common';
import topicInteraction from './topic_interaction';

export default function* rootSaga() {
  yield all([
    auth(),
    topics(),
    common(),
    topicInteraction()
  ])
}
