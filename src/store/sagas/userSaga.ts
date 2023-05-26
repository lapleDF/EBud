import {put, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {USER_ACTION} from '../actions';
import {PayloadAction, User} from '../../types';
import {storeDataObjAsyncStorage} from '../../utils';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {ToastAndroid} from 'react-native';
import {initialUser} from '../reducers/userReducer';

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
}

function* logout() {
  try {
    yield Parse.User.logOut().then(() => {
      ToastAndroid.show('Logged out', ToastAndroid.LONG);
    });
    yield put({type: USER_ACTION.UPDATE, payload: initialUser});
  } catch (error) {
    console.log('Error logout action: ', error);
  }
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.LOGIN, login);
  yield takeLatest(USER_ACTION.LOGOUT, logout);
}
