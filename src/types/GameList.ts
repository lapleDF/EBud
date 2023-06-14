import {Game} from './Game';

export interface GameList {
  list: Game[];
  currentPage: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  fetchingStatus: 'loading' | 'idle' | 'error';
}
