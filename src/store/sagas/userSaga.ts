import {takeLatest} from 'redux-saga/effects';

import {USER_ACTION} from '../actions';

function* register() {
  console.log('register');
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.REGISTER, register);
}
