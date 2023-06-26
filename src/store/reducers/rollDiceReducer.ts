import type {PayloadAction, RollDiceQuestion} from '../../types';
import {ROLL_DICE_ACTION} from '../actions';

export interface RollDiceQuestionList {
  list: RollDiceQuestion[];
  fetchingStatus: 'loading' | 'idle' | 'error';
}

export const initialRollDiceQuestionList: RollDiceQuestionList = {
  list: [],
  fetchingStatus: 'idle',
};

export const rollDiceReducer = (
  state: RollDiceQuestionList = initialRollDiceQuestionList,
  action: PayloadAction,
) => {
  switch (action.type) {
    case ROLL_DICE_ACTION.UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case ROLL_DICE_ACTION.UPDATE_FETCHING_STATUS:
      return {
        ...state,
        fetchingStatus: action.payload,
      };
    default:
      return state;
  }
};
