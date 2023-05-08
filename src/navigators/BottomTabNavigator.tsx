import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BOTTOM_TAB_ROUTE} from '../constants/route';
import {COLORS} from '../constants/color';
import {Animated, StyleSheet} from 'react-native';
import {SPACING} from '../constants/spacing';

const BottomTabNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
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

const getWithTabItem = () => {
  return (SPACING.screenWidth - 40) / 4;
};

const styles = StyleSheet.create({
  indicator: {
    width: getWithTabItem() - 40,
    height: 5,
    backgroundColor: COLORS.primaryDark,
    position: 'absolute',
    bottom: 83,
    left: 40,
    borderRadius: 5,
  },
});
export default BottomTabNavigator;
