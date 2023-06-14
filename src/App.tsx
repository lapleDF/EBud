import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APP_ID, JS_KEY, SERVER_URL} from '@env';
import RootNavigator from './navigators/RootNavigator';
import store from './store/store';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
