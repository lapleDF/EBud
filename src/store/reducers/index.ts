import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {managedReducer} from './managedRouteReducer';
import {courseReducer} from './courseReducer';
import {lessonReducer} from './lessonReducer';
import {bookReducer} from './bookReducer';
import {gameReducer} from './gameReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  managedRoute: managedReducer,
  course: courseReducer,
  lesson: lessonReducer,
  book: bookReducer,
  game: gameReducer,
});
