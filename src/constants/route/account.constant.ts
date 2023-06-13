import Account from '../../screens/account/Account';
import AppearanceSetting from '../../screens/account/AppearanceSetting';
import UserInfo from '../../screens/account/UserInfo';
import type {AccountStackParamList} from '../../types/navigation/types';

interface AccountRouteProps {
  name: keyof AccountStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const ACCOUNT_ROUTE: AccountRouteProps[] = [
  {
    name: 'Account',
    component: Account,
    options: {headerShown: false},
  },
  {
    name: 'Appearance',
    component: AppearanceSetting,
    options: {headerShown: false},
  },
  {
    name: 'UserInfo',
    component: UserInfo,
    options: {headerShown: false},
  },
];
