import {put, takeLatest} from 'redux-saga/effects';

import {GUESS_THE_WORD_ACTION} from '../actions';
import type {GuessTheWordItem, PayloadAction} from '../../types';
import {queryGetGuessTheWordGame} from '../../query/guessTheWordQuery';

function* getList({payload}: PayloadAction) {
  yield put({type: GUESS_THE_WORD_ACTION.UPDATE_STATUS, payload: 'loading'});
  try {
    interface guessTheWordArrProps {
      guessTheWordArr: GuessTheWordItem[];
      maxLevel: number;
    }
    const {guessTheWordArr, maxLevel}: guessTheWordArrProps =
      yield queryGetGuessTheWordGame(payload);
    yield put({
      type: GUESS_THE_WORD_ACTION.UPDATE_LIST,
      payload: guessTheWordArr,
    });
    yield put({
      type: GUESS_THE_WORD_ACTION.UPDATE_MAX_LEVEL,
      payload: maxLevel,
    });
  } catch (error) {
    console.log('error guess the word game: ', error);
  }
  yield put({type: GUESS_THE_WORD_ACTION.UPDATE_STATUS, payload: 'idle'});
}

export function* guessTheWordSaga() {
  yield takeLatest(GUESS_THE_WORD_ACTION.GET_LIST, getList);
}
