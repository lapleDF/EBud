import {put, select, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {GAME_ACTION, USER_ACTION} from '../actions';
import {Game, PayloadAction, User} from '../../types';
import {queryGetListGame} from '../../query/gameQuery';
import {RootState} from '../store';
import {PlayingGame} from '../../types/PlayingGame';

function* getList() {
  yield put({type: GAME_ACTION.UPDATE_FETCHING_STATUS, payload: 'loading'});
  const listGame: Game[] = yield queryGetListGame();
  yield put({type: GAME_ACTION.UPDATE_LIST, payload: listGame});
  yield put({type: GAME_ACTION.UPDATE_FETCHING_STATUS, payload: 'idle'});
}

function* updateGameInfo(action: PayloadAction) {
  const {gameId, level} = action.payload;
  const userQuery = new Parse.User();
  const user: User = yield select((state: RootState) => state.user);

  let isGameExist = false;
  const gameArr = user.game.map(playingGame => {
    if (playingGame?.gameId === gameId) {
      playingGame.currentLevel = level;
      isGameExist = true;
    }
    return playingGame;
  });

  userQuery.set('objectId', user.id);
  const resultUser: User = user;

  if (!isGameExist) {
    const game: PlayingGame = {
      currentLevel: level,
      gameId: gameId,
    };
    resultUser.game = gameArr.concat(game);
  } else {
    resultUser.game = gameArr;
  }

  try {
    userQuery.set('game', resultUser.game);
    yield userQuery.save();
    yield put({type: USER_ACTION.UPDATE, payload: resultUser});
  } catch (err) {
    console.log('error update game info: ', err);
  }
}

export default function* gameSaga() {
  yield takeLatest(GAME_ACTION.GET_LIST, getList);
  yield takeLatest(GAME_ACTION.UPDATE_GAME_INFO_USER, updateGameInfo);
}
