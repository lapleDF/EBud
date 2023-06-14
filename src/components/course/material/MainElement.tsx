import React from 'react';
import {Image, View} from 'react-native';

import {CSText} from '../../core';
import {MainElementStyles as styles} from './MainElement.styles';

interface MainElementProps {
  name: string;
  learnedLesson: number;
  totalLesson: number;
  cover: string;
}

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
