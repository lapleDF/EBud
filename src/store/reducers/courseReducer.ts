import type {CourseList, PayloadAction} from '../../types';
import {COURSE_ACTION} from '../actions';

export const initialCourseList: CourseList = {
  list: [],
  currentPage: 1,
  nextPage: 1,
  prevPage: 1,
  totalPage: 1,
  fetchingStatus: 'idle',
};

export const courseReducer = (
  state: CourseList = initialCourseList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case COURSE_ACTION.UPDATE_LIST:
      return {...state, list: action.payload};
    case COURSE_ACTION.UPDATE_STATE:
      return {...state, fetchingStatus: action.payload};
    default:
      return state;
  }
};
