import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image, StyleSheet} from 'react-native';

import CSText from '../components/core/CSText';
import {ONBOARDING} from '../constants/onBoarding.constant';
import {storeDataAsyncStorage} from '../utils';
import {ASYNC_STORAGE} from '../constants/asyncStorage';

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    storeDataAsyncStorage(ASYNC_STORAGE.isFirstLaunch, 'false');
  }, []);
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
              variant="Bungee"
              color="primaryLight">
              {page.title}
            </CSText>
          ),
          subtitle: (
            <CSText
              size={'lg'}
              style={styles.text}
              variant="Sriracha"
              color="secondary">
              {page.subtitle}
            </CSText>
          ),
        };
      })}
    />
  );
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
    marginHorizontal: 10,
    lineHeight: 60,
  },
});

export default OnboardingScreen;
