import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {Game} from '../types';
import {convertGameData} from '../utils';

export const queryGetListGame = async () => {
  const gameQuery = new Parse.Query(PARSE_OBJ.game);

  const gameList = await gameQuery.find();
  const result: Game[] = convertGameData(gameList);
  return result;
};
