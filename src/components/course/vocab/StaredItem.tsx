import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../../core';
import type {Lesson} from '../../../types';
import {COLORS} from '../../../constants/color';
import {handleSpeak} from '../../../utils';
import {SPACING} from '../../../constants/spacing';
import {AppDispatch} from '../../../store/store';
import {LESSON_ACTION} from '../../../store/actions';

interface StaredItemProps {
  lesson: Lesson;
}

const StaredItem = ({lesson}: StaredItemProps) => {
  const handleStar = () => {
    AppDispatch(LESSON_ACTION.ADD_FAVORITE_LIST, lesson.id);
  };
  return (
    <View style={styles.container}>
      <CSText style={styles.word}>{lesson.word}</CSText>
      <CSText style={styles.mean}>{lesson.wordMeaning}</CSText>
      <TouchableOpacity
        style={styles.volume}
        onPress={() => handleSpeak(lesson.word)}>
        <Icon
          name="volume-medium-outline"
          size={35}
          color={COLORS.primaryDark}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.star} onPress={handleStar}>
        <Icon
          name={lesson.stared ? 'star' : 'star-outline'}
          size={35}
          color={COLORS.primaryDark}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StaredItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    paddingHorizontal: SPACING.px,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.bgHeader,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  word: {
    width: '30%',
    textAlign: 'center',
  },
  mean: {
    width: '60%',
    textAlign: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.secondary,
    paddingLeft: '5%',
  },
  volume: {
    position: 'absolute',
    top: 0,
    left: SPACING.px,
  },
  star: {
    position: 'absolute',
    top: 0,
    right: SPACING.px,
  },
});
