import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LIBRARY_ROUTE} from '../constants/route/library.constant';
import type {LibraryStackParamList} from '../types/navigation/types';

const LibraryStack = createStackNavigator<LibraryStackParamList>();

const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={{headerShown: false}}>
      {LIBRARY_ROUTE.map(route => (
        <LibraryStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </LibraryStack.Navigator>
  );
};

export default LibraryNavigator;
