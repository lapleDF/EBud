import {put, select, takeLatest} from 'redux-saga/effects';

import {COURSE_ACTION, LESSON_ACTION, USER_ACTION} from '../actions';
import type {CourseItem, Lesson, PayloadAction, User} from '../../types';
import {
  addLessonToFavoriteList,
  completeLessonQuery,
  getLessonList,
} from '../../query';
import {RootState} from '../store';
import {LessonList} from '../reducers/lessonReducer';

function* getLesson(action: PayloadAction) {
  yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'loading'});
  const user: User = yield select((rootState: RootState) => rootState.user);
  try {
    const lessonList: Lesson[] = yield getLessonList(action, user.id);
    yield put({
      type: LESSON_ACTION.UPDATE_LESSON_LIST,
      payload: lessonList,
    });
  } catch (error) {
    yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'error'});
  }
}

function* addFavoriteList(action: PayloadAction) {
  const user: User = yield select((state: RootState) => state.user);
  const lessonList: LessonList = yield select(
    (state: RootState) => state.lesson,
  );

  const lessonListSovled = lessonList.lessons.map(item => {
    if (item.id === action.payload) {
      item.stared = !item.stared;
    }
    return item;
  });

  yield put({
    type: LESSON_ACTION.UPDATE_LESSON_LIST,
    payload: lessonListSovled,
  });

  yield addLessonToFavoriteList(action.payload, user.id);
}

function* completeLesson(action: PayloadAction) {
  const lessonList: LessonList = yield select(
    (state: RootState) => state.lesson,
  );

  const state: RootState = yield select((rootState: RootState) => rootState);
  const user: User = state.user;
  const course: CourseItem[] = state.course.list;

  const updatedCourses = course.map(item => {
    if (item.id === action.payload.courseId) {
      item.learnedLesson += 1;
    }
    return item;
  });

  yield put({
    type: COURSE_ACTION.UPDATE_LIST,
    payload: updatedCourses,
  });

  const sovledLessonList = lessonList.lessons.map((lesson: Lesson) => {
    if (lesson.id === action.payload.id) {
      lesson.isLearned = true;
    }
    return lesson;
  });

  yield completeLessonQuery(user.id, action.payload.id);

  yield put({
    type: LESSON_ACTION.UPDATE_LESSON_LIST,
    payload: sovledLessonList,
  });

  yield put({type: USER_ACTION.UPDATE_LEARNT_LESSON});
}

export default function* lessonSaga() {
  yield takeLatest(LESSON_ACTION.GET_LESSON_LIST, getLesson);
  yield takeLatest(LESSON_ACTION.ADD_FAVORITE_LIST, addFavoriteList);
  yield takeLatest(LESSON_ACTION.COMPLETE_LESSON, completeLesson);
}
