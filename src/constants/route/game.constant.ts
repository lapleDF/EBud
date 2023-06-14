import Game from '../../screens/game/Game';
import GamePlaying from '../../screens/game/GamePlaying';
import type {GameStackParamList} from '../../types/navigation/types';

interface GameRouteProps {
  name: keyof GameStackParamList;
  component: () => JSX.Element;
  options?: {};
}

export const GAME_ROUTE: GameRouteProps[] = [
  {
    name: 'Game',
    component: Game,
    options: {headerShown: true},
  },
  {
    name: 'GamePlaying',
    component: GamePlaying,
    options: {headerShown: false},
  },
];
