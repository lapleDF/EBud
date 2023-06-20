import Parse from 'parse/react-native';
import {PARSE_OBJ} from '../constants/parseObject';
import type {GuessTheWordItem} from '../types';
import {convertGuessTheWordGameData} from '../utils';

export const queryGetGuessTheWordGame = async (level: number) => {
  const guessTheWordQuery = new Parse.Query(PARSE_OBJ.guessTheWord);

  const guessTheWordListAll = await guessTheWordQuery
    .descending('level')
    .find();

  const guessTheWordList = await guessTheWordQuery
    .equalTo('level', level)
    .find();

  const maxLevel = guessTheWordListAll[0].attributes?.level;
  const guessTheWordArr: GuessTheWordItem[] =
    convertGuessTheWordGameData(guessTheWordList);
  return {maxLevel, guessTheWordArr};
};
