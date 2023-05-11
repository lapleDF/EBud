import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';

import RootNavigator from './navigators/RootNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store, {AppDispatch} from './store/store';
import {MANAGED_ROUTE_ACTION} from './store/actions/managedRoute.action';

const App = () => {
  const navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList> =
    useNavigationContainerRef();
  const routeNameRef = useRef<any>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
