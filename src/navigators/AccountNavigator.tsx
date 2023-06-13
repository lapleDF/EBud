import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ACCOUNT_ROUTE} from '../constants/route/account.constant';
import type {AccountStackParamList} from '../types/navigation/types';

const AccountStack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
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
