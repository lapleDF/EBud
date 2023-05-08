import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {ROOT_ROUTE} from '../constants/route';

const RootNavigator = () => {
  const RootStack = createStackNavigator();

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
