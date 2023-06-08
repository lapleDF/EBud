import React from 'react';

import {CSLayout} from '../../components/core';
import {useRoute} from '@react-navigation/native';
import GameGuessTheWord from './GameGuessTheWord';
import GameRollDice from './GameRollDice';

const GamePlaying = () => {
  const route = useRoute<any>();
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
