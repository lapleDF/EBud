import {put, takeLatest} from 'redux-saga/effects';
import Parse from 'parse/react-native';

import {ROLL_DICE_ACTION} from '../actions';
import {PARSE_OBJ} from '../../constants/parseObject';
import type {RollDiceQuestion} from '../../types';
import {convertRollDiceQuestionData} from '../../utils';

function* getList() {
  yield put({
    type: ROLL_DICE_ACTION.UPDATE_FETCHING_STATUS,
    payload: 'loading',
  });

  try {
    const rollDiceQuery = new Parse.Query(PARSE_OBJ.rollDiceQuestion);
    const rollDiceQuestionListResponse: Parse.Object[] =
      yield rollDiceQuery.find();

    const rollDiceQuestionList: RollDiceQuestion[] =
      convertRollDiceQuestionData(rollDiceQuestionListResponse);

    yield put({
      type: ROLL_DICE_ACTION.UPDATE_LIST,
      payload: rollDiceQuestionList,
    });
    yield put({type: ROLL_DICE_ACTION.UPDATE_FETCHING_STATUS, payload: 'idle'});
  } catch (error) {
    yield put({
      type: ROLL_DICE_ACTION.UPDATE_FETCHING_STATUS,
      payload: 'error',
    });
  }
}

export default function* rollDiceSaga() {
  yield takeLatest(ROLL_DICE_ACTION.GET_LIST, getList);
}
