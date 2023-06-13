import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import type {AuthStackParamList} from '../types/navigation/types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, animationTypeForReplace: 'push'}}>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{presentation: 'transparentModal'}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{presentation: 'transparentModal'}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
