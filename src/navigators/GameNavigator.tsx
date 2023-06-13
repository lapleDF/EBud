import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {GAME_ROUTE} from '../constants/route/game.constant';
import {GameStackParamList} from '../types/navigation/types';

const GameStack = createStackNavigator<GameStackParamList>();

const GameNavigator = () => {
  return (
    <GameStack.Navigator screenOptions={{headerShown: false}}>
      {GAME_ROUTE.map(route => (
        <GameStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </GameStack.Navigator>
  );
};

export default GameNavigator;
