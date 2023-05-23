import {put, select, takeLatest} from 'redux-saga/effects';

import {LESSON_ACTION} from '../actions';
import {Lesson, PayloadAction, User} from '../../types';
import {
  addLessonToFavoriteList,
  completeLessonQuery,
  getLessonList,
} from '../../query';
import {RootState} from '../store';
import {LessonList} from '../reducers/lessonReducer';

function* getLesson(action: PayloadAction) {
  yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'loading'});
  try {
    const lessonList: Lesson[] = yield getLessonList(action);
    yield put({
      type: LESSON_ACTION.UPDATE_LESSON_LIST,
      payload: lessonList,
    });
  } catch (error) {
    yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'error'});
  }
}

function* addFavoriteList(action: PayloadAction) {
  yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'loading'});
  const addToListAction: boolean = yield addLessonToFavoriteList(
    action.payload,
  );

  const lessonList: LessonList = yield select(
    (state: RootState) => state.lesson,
  );

  const lessonListSovled = lessonList.lessons.map(item => {
    if (item.id === action.payload) {
      item.stared = addToListAction;
    }
    return item;
  });

  yield put({
    type: LESSON_ACTION.UPDATE_LESSON_LIST,
    payload: lessonListSovled,
  });
}

function* completeLesson(action: PayloadAction) {
  yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'loading'});
  const lessonList: LessonList = yield select(
    (state: RootState) => state.lesson,
  );

  const user: User = yield select((state: RootState) => state.user);

  const sovledLessonList = lessonList.lessons.map((lesson: Lesson) => {
    if (lesson.id === action.payload) {
      lesson.isLearned = true;
    }
    return lesson;
  });

  yield completeLessonQuery(user.id, action.payload);

  yield put({
    type: LESSON_ACTION.UPDATE_LESSON_LIST,
    payload: sovledLessonList,
  });

  yield put({type: LESSON_ACTION.UPDATE_STATUS, payload: 'idle'});
}

export default function* lessonSaga() {
  yield takeLatest(LESSON_ACTION.GET_LESSON_LIST, getLesson);
  yield takeLatest(LESSON_ACTION.ADD_FAVORITE_LIST, addFavoriteList);
  yield takeLatest(LESSON_ACTION.COMPLETE_LESSON, completeLesson);
}
