import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APP_ID, JS_KEY, SERVER_URL} from '@env';
import RootNavigator from './navigators/RootNavigator';
import store, {AppDispatch} from './store/store';
import {MANAGED_ROUTE_ACTION} from './store/actions';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

const App = () => {
  const navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList> =
    useNavigationContainerRef();
  const routeNameRef = useRef<any>();

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute()?.name;
          const trackScreenView = (routeName: string | undefined) => {
            AppDispatch(MANAGED_ROUTE_ACTION.UPDATE_CURRENT_ROUTE, routeName);
          };

          if (previousRouteName !== currentRouteName) {
            routeNameRef.current = currentRouteName;
            trackScreenView(currentRouteName);
          }
        }}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
