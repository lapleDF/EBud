import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../constants/color';
import {SPACING} from '../../../constants/spacing';
import type {CourseItem} from '../../../types';
import {CircleProgressStyles as styles} from './CircleProgress.styles';
import type {RootStackScreenProps} from '../../../types/navigation/types';

interface CircleProgressProps {
  courseItem: CourseItem;
  isThirdCircle?: boolean;
  filteredArray: CourseItem[];
}

const RADIUS = SPACING.screenWidth / 6;

const CircleProgress = ({
  isThirdCircle = false,
  ...props
}: CircleProgressProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'CourseNavigator'>['navigation']>();
  const indexItem = props.filteredArray.indexOf(props.courseItem);
  const isLock =
    (indexItem !== 0 &&
      props.courseItem.learnedLesson === 0 &&
      props.filteredArray[indexItem - 1].learnedLesson <
        props.filteredArray[indexItem - 1].totalLesson / 2) ||
    (props.courseItem.totalLesson === 0 && indexItem !== 0);

  const valueProgress =
    props.courseItem.totalLesson !== 0
      ? (props.courseItem.learnedLesson / props.courseItem.totalLesson) * 100
      : 0;

  const handlePress = () => {
    if (isLock) {
      return;
    }
    navigation.navigate('CourseNavigator', {
      screen: 'Lesson',
      params: {course: props.courseItem},
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.circleWrap, isThirdCircle && {right: 0}]}>
      {isLock && (
        <View style={styles.lockIcon}>
          <Icon name="lock-closed" size={50} color={COLORS.primaryLighter} />
        </View>
      )}
      <CircularProgress
        value={valueProgress}
        radius={RADIUS}
        showProgressValue={false}
        activeStrokeColor={COLORS.primaryLight}
        inActiveStrokeColor={COLORS.borderDeactive}
        delay={1000}
        duration={1000}
      />
    </TouchableOpacity>
  );
};

export {CircleProgress};
