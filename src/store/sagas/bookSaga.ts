import {put, select, takeLatest} from 'redux-saga/effects';
import {BOOK_ACTION} from '../actions';
import {queryAddBookFavoriteList, queryGetListBook} from '../../query';
import type {Book, BookList, PayloadAction, User} from '../../types';
import {RootState} from '../store';

function* getList() {
  yield put({type: BOOK_ACTION.UPDATE_STATUS, payload: 'loading'});
  const user: User = yield select((state: RootState) => state.user);
  const listBook: Book[] = yield queryGetListBook(user.id);
  yield put({type: BOOK_ACTION.UPDATE_LIST, payload: listBook});
  yield put({type: BOOK_ACTION.UPDATE_STATUS, payload: 'idle'});
}

function* addFavoriteList(action: PayloadAction) {
  const user: User = yield select((state: RootState) => state.user);
  const bookList: BookList = yield select((state: RootState) => state.book);

  const resultBookList = bookList.list.map(item => {
    if (item.id === action.payload) {
      item.isSaved = !item.isSaved;
    }
    return item;
  });

  yield put({
    type: BOOK_ACTION.UPDATE_LIST,
    payload: resultBookList,
  });

  yield queryAddBookFavoriteList(action.payload, user.id);
}

export default function* bookSaga() {
  yield takeLatest(BOOK_ACTION.GET_LIST, getList);
  yield takeLatest(BOOK_ACTION.ADD_FAVORITE, addFavoriteList);
}
