import {put, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {USER_ACTION} from '../actions';
import {PayloadAction, User} from '../../types';
import {storeDataObjAsyncStorage} from '../../utils';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';

function* register() {
  console.log('register');
}

function* login(action: PayloadAction) {
  const loggedInUser: Parse.User = action.payload;
  const newUser: User = {
    id: loggedInUser.id,
    username: loggedInUser.attributes.username,
    email: loggedInUser.attributes.email,
    avatar: loggedInUser.attributes.avatar,
    totalStreak: loggedInUser.attributes.totalStreak,
    totalMedal: loggedInUser.attributes.totalMedal,
    createdAt: loggedInUser.attributes.createdAt,
    desc: loggedInUser.attributes.desc,
  };
  storeDataObjAsyncStorage(ASYNC_STORAGE.userInfo, newUser);

  yield put({type: USER_ACTION.UPDATE, payload: newUser});
  // yield put({type: COURSE_ACTION.GET_LIST, payload: newUser.id});
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.REGISTER, register);
  yield takeLatest(USER_ACTION.LOGIN, login);
}
