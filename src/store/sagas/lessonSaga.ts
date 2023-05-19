import {put, takeLatest} from 'redux-saga/effects';

import {LESSON_ACTION} from '../actions';
import {Lesson, PayloadAction} from '../../types';
import {getLessonList} from '../../query';

function* getLesson(action: PayloadAction) {
  try {
    const lessonList: Lesson[] = yield getLessonList(action);
    yield put({
      type: LESSON_ACTION.GET_LESSON_LIST_SUCCESS,
      payload: lessonList,
    });
  } catch (error) {
    yield put({type: LESSON_ACTION.GET_LESSON_LIST_ERROR, payload: error});
  }
}

export default function* lessonSaga() {
  yield takeLatest(LESSON_ACTION.GET_LESSON_LIST, getLesson);
}
