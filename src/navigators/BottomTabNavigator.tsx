import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Animated, StyleSheet} from 'react-native';
import {COLORS} from '../constants/color';
import {BOTTOM_TAB_ROUTE} from '../constants/route/bottomTab.constant';
import {SPACING} from '../constants/spacing';
import {AppDispatch, RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {COURSE_ACTION} from '../store/actions';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const rootState: RootState = useSelector((state: RootState) => state);

  useEffect(() => {
    AppDispatch(COURSE_ACTION.GET_LIST, rootState.user.objectId);
  }, [rootState.user.objectId]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: rootState.managedRoute.bottomTabRouteName.includes(
            rootState.managedRoute.currentRouteName,
          )
            ? stytes.tabBarContainer
            : stytes.hideTabBar,
        }}>
        <Tab.Group>
          {BOTTOM_TAB_ROUTE.map((route, index) => (
            <Tab.Screen
              name={route.name}
              key={route.name}
              component={route.component}
              options={route.options}
              listeners={() => ({
                tabPress: () => {
                  Animated.spring(tabOffsetValue, {
                    toValue: getWithTabItem() * index,
                    useNativeDriver: true,
                  }).start();
                },
              })}
            />
          ))}
        </Tab.Group>
      </Tab.Navigator>
      {rootState.managedRoute.bottomTabRouteName.includes(
        rootState.managedRoute.currentRouteName,
      ) && (
        <Animated.View
          style={[
            stytes.indicator,
            {
              transform: [{translateX: tabOffsetValue}],
            },
          ]}
        />
      )}
    </>
  );
};

const getWithTabItem = () => {
  return (SPACING.screenWidth - 40) / 4;
};

const stytes = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 30,
    marginHorizontal: 20,
    backgroundColor: COLORS.bgGrey,
    borderRadius: 10,
    height: 70,
    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    borderTopWidth: 0,
  },
  hideTabBar: {display: 'none'},
  indicator: {
    width: getWithTabItem() - 40,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    bottom: 83,
    left: 40,
    borderRadius: 5,
  },
});
export default BottomTabNavigator;
