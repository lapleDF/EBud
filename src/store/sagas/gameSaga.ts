import {put, takeLatest} from 'redux-saga/effects';
import {GAME_ACTION} from '../actions';
import {Game} from '../../types';
import {queryGetListGame} from '../../query/gameQuery';

function* getList() {
  yield put({type: GAME_ACTION.UPDATE_FETCHING_STATUS, payload: 'loading'});
  const listGame: Game[] = yield queryGetListGame();
  yield put({type: GAME_ACTION.UPDATE_LIST, payload: listGame});
  yield put({type: GAME_ACTION.UPDATE_FETCHING_STATUS, payload: 'idle'});
}

export default function* gameSaga() {
  yield takeLatest(GAME_ACTION.GET_LIST, getList);
}
