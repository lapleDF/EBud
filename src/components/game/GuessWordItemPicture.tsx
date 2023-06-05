import {Image, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {CSText} from '../core';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

interface GuessWordItemProps {
  image: string;
  word: string;
}

const GuessWordItem = ({image, word}: GuessWordItemProps) => {
  const refItem = useRef<View>(null);
  refItem.current?.measure((x: number, y: number, w, h, px, py) =>
    console.log('X', px, py),
  );
  return (
    <View style={styles.container} ref={refItem}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.space}>
        {word.split('').map((item, index) => (
          <View
            style={[styles.spaceGuess, item !== ' ' && styles.spaceGuessBorder]}
            key={index}
          />
        ))}
      </View>
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
  space: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  spaceGuess: {
    width: 15,
    height: 10,
  },
  spaceGuessBorder: {
    borderBottomColor: COLORS.primaryDark,
    borderBottomWidth: 1,
  },
});
