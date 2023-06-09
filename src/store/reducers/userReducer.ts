import {PayloadAction, User} from '../../types';
import {USER_ACTION} from '../actions';

export const initialUser: User = {
  id: '',
  username: '',
  email: '',
  avatar:
    'https://parsefiles.back4app.com/m3BU02yXteFvr3TV0XEGWVRClKOlaQzDYoTvPCZ1/4c29fc10ed03063f1ea4718adb47b658_winged.png',
  totalMedal: 0,
  createdAt: new Date(),
  totalStreak: 0,
  desc: '',
  learntLesson: 0,
  game: [],
};

export const userReducer = (
  state: User = initialUser,
  action: PayloadAction,
) => {
  switch (action.type) {
    case USER_ACTION.UPDATE:
      return action.payload;
    case USER_ACTION.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};
