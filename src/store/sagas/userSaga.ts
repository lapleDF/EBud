import {USER_ACTION} from '../actions';
import {takeLatest} from 'redux-saga/effects';

function* log() {
  console.log('log register');
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.REGISTER, log);
}
