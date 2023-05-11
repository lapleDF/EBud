import {combineReducers} from 'redux';

import {userReducer} from './userReducer';
import {managedReducer} from './managedRouteReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  managedRoute: managedReducer,
});
