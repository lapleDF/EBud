import {put, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {USER_ACTION} from '../actions';
import {PayloadAction, User} from '../../types';

function* register() {
  console.log('register');
}

function* login(action: PayloadAction) {
  const loggedInUser: Parse.User = action.payload;
  const newUser: User = JSON.parse(JSON.stringify(loggedInUser));

  yield put({type: USER_ACTION.UPDATE, payload: newUser});
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.REGISTER, register);
  yield takeLatest(USER_ACTION.LOGIN, login);
}
