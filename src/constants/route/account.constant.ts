import Account from '../../screens/account/Account';
import AppearanceSetting from '../../screens/account/AppearanceSetting';
import UserInfo from '../../screens/account/UserInfo';

export const ACCOUNT_ROUTE = [
  {
    name: 'account',
    component: Account,
    options: {headerShown: false},
  },
  {
    name: 'appearance',
    component: AppearanceSetting,
    options: {headerShown: false},
  },
  {
    name: 'userInfo',
    component: UserInfo,
    options: {headerShown: false},
  },
];
