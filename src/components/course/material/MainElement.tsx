import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {SPACING} from '../../../constants/spacing';
import {CSText} from '../../core';

interface MainElementProps {
  name: string;
  learnedLesson: number;
  totalLesson: number;
  cover: string;
}

const RADIUS = SPACING.screenWidth / 6;

const MainElement = (props: MainElementProps) => {
  return (
    <View style={styles.mainEle}>
      <CSText style={styles.courseTitle}>{props.name}</CSText>
      <CSText size={'sm'} style={styles.courseScore}>
        {`${props.learnedLesson}/${props.totalLesson}`}
      </CSText>
      <Image source={{uri: props.cover}} style={styles.image} />
    </View>
  );
};

export {MainElement};

const styles = StyleSheet.create({
  mainEle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 70,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 70,
  },
  courseTitle: {
    position: 'absolute',
    top: -25,
    width: 160,
    textAlign: 'center',
  },
  courseScore: {
    position: 'absolute',
    bottom: -30,
  },
});
