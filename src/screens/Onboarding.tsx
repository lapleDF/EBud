import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import BottomTabNavigator from '../navigators/BottomTabNavigator';
import CSText from '../components/core/CSText';
import CSContainer from '../components/core/CSContainer';
import {ONBOARDING} from '../constants/onBoarding.constant';

const SplashScreen = () => {
  return (
    <CSContainer style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
    </CSContainer>
  );
};

const OnboardingScreen = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return <SplashScreen />;
  } else if (isFirstLaunch === true) {
    return (
      <Onboarding
        onDone={() => {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          navigation.navigate('bottomTab');
        }}
        onSkip={() => {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          navigation.navigate('bottomTab');
        }}
        nextLabel={<CSText color="primaryDark">Tiếp theo</CSText>}
        skipLabel={<CSText>Bỏ qua</CSText>}
        controlStatusBar={false}
        pages={ONBOARDING.map(page => {
          return {
            backgroundColor: page.backgroundColor,
            image: <Image source={page.image} style={styles.image} />,
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
                color="terarity">
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
    resizeMode: 'cover',
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
