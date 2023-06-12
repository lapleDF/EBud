import AuthNavigator from '../../navigators/AuthNavigator';
import BottomTabNavigator from '../../navigators/BottomTabNavigator';
import OnboardingScreen from '../../screens/Onboarding';
import {RootStackParamList} from '../../types/navigation/types';

interface RootRouteProps {
  name: keyof RootStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const ROOT_ROUTE: RootRouteProps[] = [
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
