import HeaderScreen from '../../components/HeaderScreen';
import Account from '../../screens/account/Account';
import AppearanceSetting from '../../screens/account/AppearanceSetting';
import FAQ from '../../screens/account/FAQ';
import NotificationSettings from '../../screens/account/NotificationSettings';
import ReportIssue from '../../screens/account/ReportIssue';
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
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Appearance',
    component: AppearanceSetting,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Cài đặt hiển thị'}),
    },
  },
  {
    name: 'UserInfo',
    component: UserInfo,
    options: {
      headerShown: true,
      header: () =>
        HeaderScreen({backBtn: true, textLeft: 'Thông tin tài khoản'}),
    },
  },
  {
    name: 'ReportIssue',
    component: ReportIssue,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'Báo cáo sự cố'}),
    },
  },
  {
    name: 'FAQ',
    component: FAQ,
    options: {
      headerShown: true,
      header: () => HeaderScreen({backBtn: true, textLeft: 'FAQ'}),
    },
  },
  {
    name: 'Notification',
    component: NotificationSettings,
    options: {
      headerShown: true,
      header: () =>
        HeaderScreen({backBtn: true, textLeft: 'Cài đặt thông báo'}),
    },
  },
];
