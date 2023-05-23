import React from 'react';
import {StyleSheet} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import {CSText} from './CSText';

interface CSLoadingProps {
  text?: string;
}

const CSLoading = ({text = ''}: CSLoadingProps) => {
  return (
    <AnimatedLoader
      visible={true}
      animationStyle={styles.animate}
      source={require('../../assets/images/hamsterLoader.json')}
      animationType="fade"
      speed={1}>
      <CSText>{text}</CSText>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  animate: {
    width: 150,
    height: 150,
  },
});

export {CSLoading};
