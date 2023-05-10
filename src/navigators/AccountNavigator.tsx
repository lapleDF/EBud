import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ACCOUNT_ROUTE} from '../constants/route/account.constant';

const AccountNavigator = () => {
  const AccountStack = createStackNavigator();

  return (
    <AccountStack.Navigator screenOptions={{headerShown: false}}>
      {ACCOUNT_ROUTE.map(route => (
        <AccountStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </AccountStack.Navigator>
  );
};

export default AccountNavigator;
