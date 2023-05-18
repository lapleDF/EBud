import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

import CSText from '../core/CSText';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {CourseItem} from '../../types';

interface MainElementProps {
  name: string;
  learnedLesson: number;
  totalLesson: number;
  cover: string;
}

interface CircleProgressProps {
  courseItem: CourseItem;
  isThirdCircle?: boolean;
  filteredArray: CourseItem[];
}

interface LineProps {
  variant: 'line12' | 'line3';
  isActive?: boolean;
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

const CircleProgress = ({
  isThirdCircle = false,
  ...props
}: CircleProgressProps) => {
  const navigation = useNavigation<any>();
  const indexPrevItem = props.filteredArray.indexOf(props.courseItem);
  const isLock =
    (indexPrevItem !== 0 &&
      props.courseItem.learnedLesson === 0 &&
      props.filteredArray[indexPrevItem - 1].learnedLesson <
        props.filteredArray[indexPrevItem - 1].totalLesson / 2) ||
    props.courseItem.totalLesson === 0;

  const valueProgress =
    props.courseItem.totalLesson !== 0
      ? (props.courseItem.learnedLesson / props.courseItem.totalLesson) * 100
      : 0;

  const handlePress = () => {
    if (isLock) {
      return;
    }
    navigation.navigate('lesson', {
      course: props.courseItem,
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
      />
    </TouchableOpacity>
  );
};

const Line = ({variant, isActive = false}: LineProps) => {
  return <View style={[styles[variant], isActive && styles.lineActive]} />;
};

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
  circleWrap: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  line12: {
    height: RADIUS * 2 - 15,
    width: 10,
    backgroundColor: COLORS.borderDeactive,
    position: 'absolute',
    borderRadius: 20,
    top: 83 - RADIUS * 3,
    transform: [{rotateZ: '45deg'}, {translateX: 85}],
    zIndex: 0,
  },
  line3: {
    width: RADIUS * 2 - 10,
    height: 10,
    backgroundColor: COLORS.borderDeactive,
    position: 'absolute',
    borderRadius: 20,
    right: RADIUS * 2 - 5,
  },
  lineActive: {
    backgroundColor: COLORS.primaryLight,
  },
  lockIcon: {
    position: 'absolute',
    borderRadius: 70,
    backgroundColor: COLORS.overlay,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MainElement, CircleProgress, Line};
