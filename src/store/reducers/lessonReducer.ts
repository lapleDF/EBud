import {Lesson, PayloadAction} from '../../types';
import {LESSON_ACTION} from '../actions';

export interface LessonList {
  lessons: Lesson[];
  fetchingStatus: 'loading' | 'idle' | 'error';
}

const initialLessonList: LessonList = {
  lessons: [],
  fetchingStatus: 'idle',
};

export const lessonReducer = (
  state: LessonList = initialLessonList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case LESSON_ACTION.UPDATE_STATUS:
      return {...state, fetchingStatus: action.payload};
    case LESSON_ACTION.UPDATE_LESSON_LIST:
      return {...state, lessons: action.payload, fetchingStatus: 'idle'};
    default:
      return state;
  }
};
