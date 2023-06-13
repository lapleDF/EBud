import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {rootReducer} from './reducers';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare)),
);

sagaMiddleWare.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = (type: string, payload: any = undefined) => {
  store.dispatch({type, payload});
};
export default store;
