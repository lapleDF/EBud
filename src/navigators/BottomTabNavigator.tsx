import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Animated, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';

import {BOTTOM_TAB_ROUTE} from '../constants/route/bottomTab.constant';
import {SPACING} from '../constants/spacing';
import {COURSE_ACTION} from '../store/actions';
import {AppDispatch, RootState} from '../store/store';
import type {
  BottomTabParamList,
  BottomTabScreenProps,
} from '../types/navigation/types';
import {BottomTabNavigatorStytes as styles} from './BottomTabNavigator.styles';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const WIDTH_TAB_ITEM = (SPACING.screenWidth - 40) / 4;

const BottomTabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const rootState: RootState = useSelector((state: RootState) => state);
  const navigation =
    useNavigation<BottomTabScreenProps<'Course'>['navigation']>();

  const handleFocus = () =>
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Course');
      handleAnimatedStart(0);
      return true;
    });

  const handleBlur = () =>
    BackHandler.removeEventListener('hardwareBackPress', () => {
      handleAnimatedStart(0);
      return true;
    });

  const handleAnimatedStart = (index: number) => {
    Animated.spring(tabOffsetValue, {
      toValue: WIDTH_TAB_ITEM * index,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    AppDispatch(COURSE_ACTION.GET_LIST, rootState.user.id);
  }, [rootState.user.id]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Course"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarContainer,
        }}>
        <Tab.Group>
          {BOTTOM_TAB_ROUTE.map((route, index) => (
            <Tab.Screen
              name={route.name}
              key={route.name}
              component={route.component}
              options={route.options}
              listeners={() => ({
                tabPress: () => handleAnimatedStart(index),
                focus: handleFocus,
                blur: handleBlur,
              })}
            />
          ))}
        </Tab.Group>
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{translateX: tabOffsetValue}],
          },
        ]}
      />
    </>
  );
};

export default BottomTabNavigator;
