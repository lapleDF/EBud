import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import courseSaga from './courseSaga';
import lessonSaga from './lessonSaga';

export default function* rootSaga() {
  yield all([userSaga(), courseSaga(), lessonSaga()]);
}
