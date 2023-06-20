import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

import {CSLayout} from '../../components/core';
import GameGuessTheWord from './GameGuessTheWord';
import GameRollDice from './GameRollDice';
import type {GameScreenProps} from '../../types/navigation/types';
import {AppDispatch} from '../../store/store';
import {ROLL_DICE_ACTION} from '../../store/actions';

const GamePlaying = () => {
  const route = useRoute<GameScreenProps<'GamePlaying'>['route']>();
  const {gameItem} = route.params;

  useEffect(() => {
    if (gameItem.type === 'rollDice') {
      AppDispatch(ROLL_DICE_ACTION.GET_LIST);
    }
  }, [gameItem.type]);

  return (
    <CSLayout>
      {gameItem.type === 'guessWord' ? (
        <GameGuessTheWord gameId={gameItem.id} />
      ) : (
        <GameRollDice />
      )}
    </CSLayout>
  );
};

export default GamePlaying;
