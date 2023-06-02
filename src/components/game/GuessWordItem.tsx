import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {CSText} from '../core';
import {SPACING} from '../../constants/spacing';

const GuessWordItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://parsefiles.back4app.com/m3BU02yXteFvr3TV0XEGWVRClKOlaQzDYoTvPCZ1/bdef44d336b613a01cb80f3df948b110_short-vowels.jpg',
        }}
        style={styles.image}
      />
      <CSText>______</CSText>
    </View>
  );
};

export default GuessWordItem;

const styles = StyleSheet.create({
  container: {
    width: (SPACING.screenWidth - SPACING.px * 2) * 0.47,
    height: SPACING.screenHeight * 0.18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '82%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
