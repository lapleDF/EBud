import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../color';
import HeaderScreen from '../../components/HeaderScreen';
import CourseNavigator from '../../navigators/CourseNavigator';
import LibraryNavigator from '../../navigators/LibraryNavigator';
import GameNavigator from '../../navigators/GameNavigator';
import AccountNavigator from '../../navigators/AccountNavigator';

interface IconRenderProps {
  focused: boolean;
  iconName: string;
  iconNameUnfocus: string;
}

interface tabBarIconProps {
  focused: boolean;
}

const IconRender = (props: IconRenderProps) => {
  return (
    <Icon
      name={props.focused ? props.iconNameUnfocus : props.iconName}
      size={40}
      color={props.focused ? COLORS.primaryDark : COLORS.primaryLighter}
      style={styles.icon}
    />
  );
};

export const BOTTOM_TAB_ROUTE = [
  {
    name: 'courseNavigator',
    component: CourseNavigator,
    options: {
      headerShown: false,
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
    name: 'libraryNavigator',
    component: LibraryNavigator,
    options: {
      headerShown: false,
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'book-outline'}
          iconNameUnfocus="book"
        />
      ),
    },
  },
  {
    name: 'gameNavigator',
    component: GameNavigator,
    options: {
      headerShown: false,
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
    name: 'accountNavigator',
    component: AccountNavigator,
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
