import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import courseSaga from './courseSaga';

export default function* rootSaga() {
  yield all([userSaga(), courseSaga()]);
}
