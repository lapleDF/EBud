import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native';

import {ONBOARDING} from '../constants/onBoarding.constant';
import {storeDataAsyncStorage} from '../utils';
import {ASYNC_STORAGE} from '../constants/asyncStorage';
import {CSText} from '../components/core';
import {RootStackScreenProps} from '../types/navigation/types';
import {OnboardingScreenStyles as styles} from './Onboarding.styles';

const OnboardingScreen = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'Onboarding'>['navigation']>();

  const handleComplete = () => {
    navigation.navigate('Authentication', {screen: 'Login'});
    storeDataAsyncStorage(ASYNC_STORAGE.isFirstLaunch, 'false');
  };
  return (
    <Onboarding
      onDone={handleComplete}
      onSkip={handleComplete}
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

export default OnboardingScreen;
