import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../color';
import HeaderScreen from '../../components/HeaderScreen';
import {BottomTabParamList} from '../../types/navigation/types';
import Courses from '../../screens/course/Courses';
import Library from '../../screens/library/Library';
import Game from '../../screens/game/Game';
import Account from '../../screens/account/Account';

interface IconRenderProps {
  focused: boolean;
  iconName: string;
  iconNameUnfocus: string;
}

interface tabBarIconProps {
  focused: boolean;
}

interface BottomTabRouteProps {
  name: keyof BottomTabParamList;
  component: () => JSX.Element;
  options?: {};
}

const IconRender = (props: IconRenderProps) => {
  return (
    <Icon
      name={props.focused ? props.iconNameUnfocus : props.iconName}
      size={40}
      color={props.focused ? COLORS.primaryLight : COLORS.primaryLighter}
      style={styles.icon}
    />
  );
};

export const BOTTOM_TAB_ROUTE: BottomTabRouteProps[] = [
  {
    name: 'Course',
    component: Courses,
    options: {
      headerShown: true,
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'school-outline'}
          iconNameUnfocus="school"
        />
      ),
    },
  },
  {
    name: 'Library',
    component: Library,
    options: {
      headerShown: true,
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'book-outline'}
          iconNameUnfocus="book"
        />
      ),
      tabBarVisible: false,
    },
  },
  {
    name: 'Game',
    component: Game,
    options: {
      headerShown: true,
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'game-controller-outline'}
          iconNameUnfocus="game-controller"
        />
      ),
    },
  },
  {
    name: 'Account',
    component: Account,
    options: {
      headerShown: true,
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'person-outline'}
          iconNameUnfocus="person"
        />
      ),
      header: () => HeaderScreen({textLeft: 'Tài khoản của tôi'}),
    },
  },
];

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: 5,
  },
});
