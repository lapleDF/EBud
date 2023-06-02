import Game from '../../screens/game/Game';
import GamePlaying from '../../screens/game/GamePlaying';

export const GAME_ROUTE = [
  {
    name: 'game',
    component: Game,
    options: {headerShown: true},
  },
  {
    name: 'gamePlaying',
    component: GamePlaying,
    options: {headerShown: false},
  },
];
