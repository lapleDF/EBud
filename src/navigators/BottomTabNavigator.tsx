import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Animated, StyleSheet} from 'react-native';
import {COLORS} from '../constants/color';
import {BOTTOM_TAB_ROUTE} from '../constants/route/bottomTab.constant';
import {SPACING} from '../constants/spacing';
import {RootState} from '../store/store';
import {ManagedRoute} from '../types/ManagedRoute';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const managedRoute: ManagedRoute = useSelector(
    (state: RootState) => state.managedRoute,
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: managedRoute.bottomTabRouteName.includes(
            managedRoute.currentRouteName,
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
      {managedRoute.bottomTabRouteName.includes(
        managedRoute.currentRouteName,
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
