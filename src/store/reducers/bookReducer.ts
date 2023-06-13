import type {BookList, PayloadAction} from '../../types';
import {BOOK_ACTION} from '../actions';

const initialBookList: BookList = {
  list: [],
  currentPage: 1,
  nextPage: 1,
  prevPage: 1,
  totalPage: 1,
  fetchingStatus: 'idle',
};

export const bookReducer = (
  state: BookList = initialBookList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case BOOK_ACTION.UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case BOOK_ACTION.UPDATE_STATUS:
      return {
        ...state,
        fetchingStatus: action.payload,
      };
    default:
      return state;
  }
};
