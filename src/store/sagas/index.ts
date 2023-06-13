import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import courseSaga from './courseSaga';
import lessonSaga from './lessonSaga';
import bookSaga from './bookSaga';
import gameSaga from './gameSaga';
import {guessTheWordSaga} from './guessTheWordSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    courseSaga(),
    lessonSaga(),
    bookSaga(),
    gameSaga(),
    guessTheWordSaga(),
  ]);
}
