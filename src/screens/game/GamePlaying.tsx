import React from 'react';
import {useRoute} from '@react-navigation/native';

import {CSLayout} from '../../components/core';
import GameGuessTheWord from './GameGuessTheWord';
import GameRollDice from './GameRollDice';
import type {GameScreenProps} from '../../types/navigation/types';

const GamePlaying = () => {
  const route = useRoute<GameScreenProps<'GamePlaying'>['route']>();
  const {gameItem} = route.params;

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
