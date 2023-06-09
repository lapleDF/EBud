import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, StyleSheet} from 'react-native';

import CSText from '../components/core/CSText';
import CSContainer from '../components/core/CSContainer';
import {ONBOARDING} from '../constants/onBoarding.constant';
import BottomTabNavigator from '../navigators/BottomTabNavigator';
import {getDataObjAsyncStorage} from '../utils';
import {AppDispatch} from '../store/store';
import {USER_ACTION} from '../store/actions';
import {ASYNC_STORAGE} from '../constants/asyncStorage';

const SplashScreen = () => {
  return (
    <CSContainer style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </CSContainer>
  );
};

const OnboardingScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const navigation = useNavigation<any>();

  const updateUser = async () => {
    const user = await getDataObjAsyncStorage(ASYNC_STORAGE.user);
    AppDispatch(USER_ACTION.UPDATE, user);
  };
  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE.accessToken).then(value => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
        updateUser();
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return <SplashScreen />;
  } else if (isFirstLaunch === true) {
    return (
      <Onboarding
        onDone={() => {
          navigation.navigate('authentication');
        }}
        onSkip={() => {
          navigation.navigate('authentication');
        }}
        nextLabel={<CSText color="primaryDark">Tiếp theo</CSText>}
        skipLabel={<CSText>Bỏ qua</CSText>}
        controlStatusBar={false}
        pages={ONBOARDING.map(page => {
          return {
            backgroundColor: page.backgroundColor,
            image: (
              <Image
                source={page.image}
                style={
                  page.title === 'Welcome to EBud' ? styles.logo : styles.image
                }
              />
            ),
            title: (
              <CSText
                size={'xxl'}
                style={styles.text}
                variant="NeutonBold"
                color="primaryLight">
                {page.title}
              </CSText>
            ),
            subtitle: (
              <CSText
                size={'xxl'}
                style={styles.text}
                variant="NeutonItalic"
                color="secondary">
                {page.subtitle}
              </CSText>
            ),
          };
        })}
      />
    );
  } else {
    return <BottomTabNavigator />;
  }
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: 350,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    height: 250,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default OnboardingScreen;
