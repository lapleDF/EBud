import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './navigators/RootNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './store/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
