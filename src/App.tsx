import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './navigators/RootNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
