import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import BottomTabNavigator from '../navigators/BottomTabNavigator';

const OnboardingScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Onboarding
        onDone={() => {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          navigation.navigate('bottomTab');
        }}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/developer.png')} />,
            title: 'Welcome to the App',
            subtitle: 'This is a brief introduction to the app',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/developer.png')} />,
            title: 'Feature 1',
            subtitle: 'This is a description of feature 1',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/developer.png')} />,
            title: 'Feature 2',
            subtitle: 'This is a description of feature 2',
          },
        ]}
      />
    );
  } else {
    return <BottomTabNavigator />;
  }
};

export default OnboardingScreen;
