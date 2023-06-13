import {GameList, PayloadAction} from '../../types';
import {GAME_ACTION} from '../actions';

export const initialGame: GameList = {
  list: [],
  currentPage: 1,
  nextPage: 1,
  prevPage: 1,
  totalPage: 1,
  fetchingStatus: 'idle',
};

export const gameReducer = (
  state: GameList = initialGame,
  action: PayloadAction,
) => {
  switch (action.type) {
    case GAME_ACTION.UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case GAME_ACTION.UPDATE_FETCHING_STATUS:
      return {
        ...state,
        fetchingStatus: action.payload,
      };
    default:
      return state;
  }
};
