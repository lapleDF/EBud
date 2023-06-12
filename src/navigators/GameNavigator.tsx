import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {GAME_ROUTE} from '../constants/route/game.constant';
import {AppDispatch} from '../store/store';
import {GAME_ACTION} from '../store/actions';
import {GameStackParamList} from '../types/navigation/types';

const GameStack = createStackNavigator<GameStackParamList>();

const GameNavigator = () => {
  useEffect(() => {
    AppDispatch(GAME_ACTION.GET_LIST);
  }, []);

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
