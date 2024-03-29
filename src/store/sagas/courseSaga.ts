import {put, takeLatest} from 'redux-saga/effects';

import {COURSE_ACTION} from '../actions';
import {getCourseList} from '../../queries/courseQuery';
import type {PayloadAction} from '../../types';
import type {CourseItem} from './../../types/CourseItem';

function* getList(action: PayloadAction) {
  try {
    yield put({type: COURSE_ACTION.UPDATE_STATE, payload: 'loading'});
    const resultArr: CourseItem[] = yield getCourseList(action.payload);
    yield put({type: COURSE_ACTION.UPDATE_LIST, payload: resultArr});
    yield put({type: COURSE_ACTION.UPDATE_STATE, payload: 'idle'});
  } catch (error) {
    yield put({type: COURSE_ACTION.UPDATE_STATE, payload: 'error'});
    console.log('get list error: ', error);
  }
}

export default function* courseSaga() {
  yield takeLatest(COURSE_ACTION.GET_LIST, getList);
}
