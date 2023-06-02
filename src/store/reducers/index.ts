import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {managedReducer} from './managedRouteReducer';
import {courseReducer} from './courseReducer';
import {lessonReducer} from './lessonReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  managedRoute: managedReducer,
  course: courseReducer,
  lesson: lessonReducer,
});
