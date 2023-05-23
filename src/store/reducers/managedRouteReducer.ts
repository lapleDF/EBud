import {PayloadAction} from '../../types';
import {ManagedRoute} from '../../types/ManagedRoute';
import {MANAGED_ROUTE_ACTION} from '../actions/managedRoute.action';

const initialManagedRoute: ManagedRoute = {
  currentRouteName: '',
  bottomTabRouteName: ['course', 'library', 'game', 'account'],
};

export const managedReducer = (
  state: ManagedRoute = initialManagedRoute,
  action: PayloadAction,
) => {
  switch (action.type) {
    case MANAGED_ROUTE_ACTION.UPDATE_CURRENT_ROUTE:
      return {
        ...state,
        ['currentRouteName']: action.payload,
      };
    case MANAGED_ROUTE_ACTION.UPDATE_BOTTOM_TAB_ROUTE:
      return {
        ...state,
        ['bottomTabRouteName']: action.payload,
      };
    default:
      return state;
  }
};
