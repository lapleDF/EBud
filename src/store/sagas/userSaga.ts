import {put, select, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {USER_ACTION} from '../actions';
import type {PayloadAction, User} from '../../types';
import {storeDataObjAsyncStorage} from '../../utils';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {ToastAndroid} from 'react-native';
import {initialUser} from '../reducers/userReducer';
import {RootState} from '../store';
import {PARSE_OBJ} from '../../constants/parseObject';
import {UserInfoProps} from '../../screens/account/UserInfo';

function* login(action: PayloadAction) {
  const loggedInUser: Parse.User = action.payload;
  const newUser: User = {
    id: loggedInUser.id,
    username: loggedInUser.attributes.username,
    fullName: loggedInUser.attributes.fullName,
    email: loggedInUser.attributes.email,
    avatar: loggedInUser.attributes.avatar,
    totalStreak: loggedInUser.attributes.totalStreak,
    totalMedal: loggedInUser.attributes.totalMedal,
    createdAt: loggedInUser.attributes.createdAt,
    desc: loggedInUser.attributes.desc,
    learntLesson: 0,
    game: loggedInUser.attributes.game,
  };
  storeDataObjAsyncStorage(ASYNC_STORAGE.userInfo, newUser);

  yield put({type: USER_ACTION.UPDATE, payload: newUser});
  yield put({type: USER_ACTION.UPDATE_LEARNT_LESSON});
}

function* getInfo(action: PayloadAction) {
  const userQUery = new Parse.Query(Parse.User);

  const user: Parse.Object[] = yield userQUery
    .equalTo('objectId', action.payload)
    .find();

  const newUser: User = {
    id: user[0].id,
    username: user[0].attributes.username,
    fullName: user[0].attributes.fullName,
    email: user[0].attributes.email,
    avatar: user[0].attributes.avatar,
    totalStreak: user[0].attributes.totalStreak,
    totalMedal: user[0].attributes.totalMedal,
    createdAt: user[0].attributes.createdAt,
    desc: user[0].attributes.desc,
    learntLesson: 0,
    game: user[0].attributes.game,
  };
  storeDataObjAsyncStorage(ASYNC_STORAGE.userInfo, newUser);

  yield put({type: USER_ACTION.UPDATE, payload: newUser});
  yield put({type: USER_ACTION.UPDATE_LEARNT_LESSON});
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

function* updateLearntLesson() {
  const user: User = yield select((rootState: RootState) => rootState.user);
  const query = new Parse.Query(PARSE_OBJ.learningLesson);
  const learntLessonArr: Parse.Object[] = yield query
    .contains('idUser', user.id)
    .find();

  const resultUser: User = {...user, learntLesson: learntLessonArr.length};
  yield put({type: USER_ACTION.UPDATE, payload: resultUser});
}

function* increaseMedal() {
  const userQuery = new Parse.User();
  const user: User = yield select((state: RootState) => state.user);
  userQuery.set('objectId', user.id);

  try {
    userQuery.set('totalMedal', user.totalMedal + 1);
    yield userQuery.save();
  } catch (err) {
    console.log('error update total medal: ', err);
  }

  const resultUser: User = {...user, totalMedal: user.totalMedal + 1};
  yield put({type: USER_ACTION.UPDATE, payload: resultUser});
}

function* increaseStreak() {
  const userQuery = new Parse.User();
  const user: User = yield select((state: RootState) => state.user);
  userQuery.set('objectId', user.id);

  try {
    userQuery.set('totalStreak', user.totalStreak + 1);
    yield userQuery.save();
  } catch (err) {
    console.log('error update total streak: ', err);
  }

  const resultUser: User = {...user, totalStreak: user.totalStreak + 1};
  yield put({type: USER_ACTION.UPDATE, payload: resultUser});
}

function* changeAvatar() {
  const userQuery = new Parse.User();
  const user: User = yield select((state: RootState) => state.user);
  userQuery.set('objectId', user.id);

  try {
    userQuery.set('avatar', user.avatar);
    yield userQuery.save();
  } catch (err) {
    console.log('error update avatar: ', err);
  }
}

function* changeUserInfo(action: PayloadAction) {
  const userQuery = new Parse.User();
  const user: User = yield select((state: RootState) => state.user);
  userQuery.set('objectId', user.id);

  const userInfoProperty: UserInfoProps = action.payload;

  try {
    userQuery.set('userName', userInfoProperty.username);
    userQuery.set('fullName', userInfoProperty.fullName);
    userQuery.set('email', userInfoProperty.email);
    yield userQuery.save();

    const newUser = {...user};
    newUser.fullName = userInfoProperty.fullName;
    newUser.username = userInfoProperty.username;
    newUser.email = userInfoProperty.email;

    yield put({type: USER_ACTION.UPDATE, payload: newUser});
  } catch (err) {
    console.log('error update user info: ', err);
  }
}

function* resetPassword({payload}: PayloadAction) {
  yield put({type: USER_ACTION.CHANGE_FETCHING_STATUS, payload: 'loading'});
  try {
    yield Parse.User.requestPasswordReset(payload);
    yield put({type: USER_ACTION.CHANGE_FETCHING_STATUS, payload: 'idle'});
    ToastAndroid.show('Email đã được gửi đi', ToastAndroid.SHORT);
  } catch (error) {
    yield put({type: USER_ACTION.CHANGE_FETCHING_STATUS, payload: 'error'});
    console.log('error resetPassowrd', error);
  }
}

export default function* userSaga() {
  yield takeLatest(USER_ACTION.LOGIN, login);
  yield takeLatest(USER_ACTION.LOGOUT, logout);
  yield takeLatest(USER_ACTION.GET_INFO, getInfo);
  yield takeLatest(USER_ACTION.UPDATE_LEARNT_LESSON, updateLearntLesson);
  yield takeLatest(USER_ACTION.INCREASE_MEDAL, increaseMedal);
  yield takeLatest(USER_ACTION.INCREASE_STREAK, increaseStreak);
  yield takeLatest(USER_ACTION.CHANGE_AVATAR, changeAvatar);
  yield takeLatest(USER_ACTION.CHANGE_USER_INFO, changeUserInfo);
  yield takeLatest(USER_ACTION.RESET_PASSWORD, resetPassword);
}
