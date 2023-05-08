import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
