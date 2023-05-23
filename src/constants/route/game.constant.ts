import Game from '../../screens/game/Game';
import GameGuessTheWord from '../../screens/game/GameGuessTheWord';
import GameRollDice from '../../screens/game/GameRollDice';

export const GAME_ROUTE = [
  {
    name: 'game',
    component: Game,
    options: {headerShown: true},
  },
  {
    name: 'guessTheWord',
    component: GameGuessTheWord,
    options: {headerShown: false},
  },
  {
    name: 'rollDice',
    component: GameRollDice,
    options: {headerShown: false},
  },
];
