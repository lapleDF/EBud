import AuthNavigator from '../../navigators/AuthNavigator';
import BottomTabNavigator from '../../navigators/BottomTabNavigator';
import OnboardingScreen from '../../screens/Onboarding';

export const ROOT_ROUTE = [
  {
    name: 'onboarding',
    component: OnboardingScreen,
    options: {headerShown: false},
  },
  {
    name: 'authentication',
    component: AuthNavigator,
  },
  {
    name: 'bottomTab',
    component: BottomTabNavigator,
    options: {headerShown: false},
  },
];
