import uuid from 'react-native-uuid';

import {PayloadAction, User} from '../../types';
import {USER_ACTION} from '../actions';

export const initialUser: User = {
  id: uuid.v4().toString(),
  username: 'dennis',
  email: 'lap@gmail.com',
  password: '123123',
  totalMedal: 0,
  createdAt: new Date(),
  totalStreak: 0,
};

export const userReducer = (
  state: User = initialUser,
  action: PayloadAction,
) => {
  switch (action.type) {
    case USER_ACTION.REGISTER:
      return action.payload;
    default:
      return state;
  }
};