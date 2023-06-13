import {GuessTheWordItem} from './GuessTheWord';

export interface GuessTheWordList {
  list: GuessTheWordItem[];
  maxLevel: number;
  fetchingStatus: 'loading' | 'idle' | 'error';
}
