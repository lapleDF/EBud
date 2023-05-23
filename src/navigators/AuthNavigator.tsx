import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, animationTypeForReplace: 'push'}}>
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{presentation: 'transparentModal'}}
      />
      <AuthStack.Screen
        name="register"
        component={Register}
        options={{presentation: 'transparentModal'}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
