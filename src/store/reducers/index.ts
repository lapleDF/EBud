import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {managedReducer} from './managedRouteReducer';
import {courseReducer} from './courseReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  managedRoute: managedReducer,
  course: courseReducer,
});
