import Account from '../../screens/account/Account';
import AppearanceSetting from '../../screens/account/AppearanceSetting';
import FAQ from '../../screens/account/FAQ';
import NotificationSettings from '../../screens/account/NotificationSettings';
import ReportIssue from '../../screens/account/ReportIssue';
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
  {
    name: 'reportIssue',
    component: ReportIssue,
    options: {headerShown: false},
  },
  {
    name: 'FAQ',
    component: FAQ,
    options: {headerShown: false},
  },
  {
    name: 'notification',
    component: NotificationSettings,
    options: {headerShown: false},
  },
];
