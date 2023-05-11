import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {ROOT_ROUTE} from '../constants/route/rootRoute.constant';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {ROOT_ROUTE.map(route => (
        <RootStack.Screen
          name={route.name}
          key={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
