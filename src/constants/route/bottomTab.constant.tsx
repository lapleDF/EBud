import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Account from '../../screens/Account';
import Courses from '../../screens/Courses';
import Game from '../../screens/Game';
import Library from '../../screens/Library';
import {COLORS} from '../color';
import {StyleSheet, View} from 'react-native';
import CSText from '../../components/core/CSText';

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
    name: 'courses',
    component: Courses,
    options: {
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'school-outline'}
          iconNameUnfocus="school"
        />
      ),
      headerShown: true,
      header: () => (
        <View style={styles.header}>
          <CSText>Courses header</CSText>
        </View>
      ),
    },
  },
  {
    name: 'library',
    component: Library,
    options: {
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'book-outline'}
          iconNameUnfocus="book"
        />
      ),
      headerShown: true,
    },
  },
  {
    name: 'game',
    component: Game,
    options: {
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'game-controller-outline'}
          iconNameUnfocus="game-controller"
        />
      ),
      headerShown: true,
    },
  },
  {
    name: 'account',
    component: Account,
    options: {
      tabBarIcon: (props: tabBarIconProps) => (
        <IconRender
          focused={props.focused}
          iconName={'person-outline'}
          iconNameUnfocus="person"
        />
      ),
      headerShown: true,
    },
  },
];

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: COLORS.bgDark,
    width: '100%',
    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 15,
  },
  icon: {
    position: 'absolute',
    bottom: 5,
  },
});
