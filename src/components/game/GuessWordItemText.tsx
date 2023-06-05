import {PanResponder, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {CSText} from '../core';
import {COLORS} from '../../constants/color';
import {Animated} from 'react-native';

interface GuessWordItemTextProps {
  word: string;
}

const GuessWordItemText = ({word}: GuessWordItemTextProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const transformAnimated = {
    transform: [{translateX: pan.x}, {translateY: pan.y}],
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.resultItem, transformAnimated]}
      {...panResponder.panHandlers}>
      <CSText style={styles.text}>{word}</CSText>
    </Animated.View>
  );
};

export default GuessWordItemText;

const styles = StyleSheet.create({
  resultItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryDark,
    width: '45%',
    borderRadius: 6,
  },
  text: {
    textAlign: 'center',
  },
});
