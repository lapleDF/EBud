import type {GuessTheWordList, PayloadAction} from '../../types';
import {GUESS_THE_WORD_ACTION} from '../actions';

export const initialGuessTheWord: GuessTheWordList = {
  list: [],
  fetchingStatus: 'idle',
  maxLevel: 0,
};

export const guessTheWordReducer = (
  state: GuessTheWordList = initialGuessTheWord,
  action: PayloadAction,
) => {
  switch (action.type) {
    case GUESS_THE_WORD_ACTION.UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case GUESS_THE_WORD_ACTION.UPDATE_STATUS:
      return {
        ...state,
        fetchingStatus: action.payload,
      };
    case GUESS_THE_WORD_ACTION.UPDATE_MAX_LEVEL:
      return {
        ...state,
        maxLevel: action.payload,
      };
    default:
      return state;
  }
};
