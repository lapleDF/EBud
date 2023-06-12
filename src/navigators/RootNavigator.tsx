import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import {ROOT_ROUTE} from '../constants/route/rootRoute.constant';
import {getDataAsyncStorage, getDataObjAsyncStorage} from '../utils';
import {ASYNC_STORAGE} from '../constants/asyncStorage';
import {AppDispatch} from '../store/store';
import {USER_ACTION} from '../store/actions';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../types/navigation/types';

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'Authentication'>['navigation']>();

  useLayoutEffect(() => {
    const trackingAuthenAndFirstLaunch = async () => {
      const user = await getDataObjAsyncStorage(ASYNC_STORAGE.userInfo);

      const firstLaunch = await getDataAsyncStorage(
        ASYNC_STORAGE.isFirstLaunch,
      );

      if (firstLaunch === null) {
        navigation.navigate('Onboarding');
        return;
      }
      if (user === null) {
        navigation.navigate('Authentication');
      } else {
        AppDispatch(USER_ACTION.GET_INFO, user.id);
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab'}],
        });
      }
    };
    trackingAuthenAndFirstLaunch();
  }, [navigation]);

  useEffect(() => {
    const calculating = setInterval(() => {
      SplashScreen.hide();
    }, 200);
    return () => clearInterval(calculating);
  }, []);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {ROOT_ROUTE.map(route => (
        <RootStack.Screen
          name={route.name}
          key={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
