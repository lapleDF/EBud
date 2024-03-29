import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {courseReducer} from './courseReducer';
import {lessonReducer} from './lessonReducer';
import {bookReducer} from './bookReducer';
import {gameReducer} from './gameReducer';
import {guessTheWordReducer} from './guessTheWordReducer';
import {rollDiceReducer} from './rollDiceReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  lesson: lessonReducer,
  book: bookReducer,
  game: gameReducer,
  guesTheWord: guessTheWordReducer,
  rollDice: rollDiceReducer,
});
