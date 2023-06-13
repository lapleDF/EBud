import AccountNavigator from '../../navigators/AccountNavigator';
import AuthNavigator from '../../navigators/AuthNavigator';
import BottomTabNavigator from '../../navigators/BottomTabNavigator';
import CourseNavigator from '../../navigators/CourseNavigator';
import GameNavigator from '../../navigators/GameNavigator';
import LibraryNavigator from '../../navigators/LibraryNavigator';
import OnboardingScreen from '../../screens/Onboarding';
import type {RootStackParamList} from '../../types/navigation/types';

interface RootRouteProps {
  name: keyof RootStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const ROOT_ROUTE: RootRouteProps[] = [
  {
    name: 'Onboarding',
    component: OnboardingScreen,
    options: {headerShown: false},
  },
  {
    name: 'Authentication',
    component: AuthNavigator,
  },
  {
    name: 'BottomTab',
    component: BottomTabNavigator,
    options: {headerShown: false},
  },
  {
    name: 'CourseNavigator',
    component: CourseNavigator,
    options: {headerShown: false},
  },
  {
    name: 'LibraryNavigator',
    component: LibraryNavigator,
    options: {headerShown: false},
  },
  {
    name: 'GameNavigator',
    component: GameNavigator,
    options: {headerShown: false},
  },
  {
    name: 'AccountNavigator',
    component: AccountNavigator,
    options: {headerShown: false},
  },
];
