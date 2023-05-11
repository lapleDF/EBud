import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';

import CSText from '../core/CSText';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

interface MainElementProps {
  name: string;
  learnedLesson: number;
  totalLesson: number;
  cover: ImageSourcePropType;
}

interface CircleProgressProps {
  value: number;
  isThirdCircle?: boolean;
  idCourse: string;
  skill: string;
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
      <CSText style={styles.courseScore}>
        {`${props.learnedLesson}/${props.totalLesson}`}
      </CSText>
      <Image source={props.cover} style={styles.image} />
    </View>
  );
};

const CircleProgress = ({
  isThirdCircle = false,
  ...props
}: CircleProgressProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('lesson', {
          skill: props.skill,
          idCourse: props.idCourse,
        })
      }
      activeOpacity={0.8}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.circleWrap, isThirdCircle && {right: 0}]}>
      <CircularProgress
        value={props.value}
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

export {MainElement, CircleProgress, Line};

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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 70,
  },
  courseTitle: {
    position: 'absolute',
    top: -25,
  },
  courseScore: {
    position: 'absolute',
    bottom: -25,
  },
  circleWrap: {
    position: 'absolute',
    zIndex: 2,
  },
  line12: {
    height: RADIUS * 2 - 15,
    width: 10,
    backgroundColor: COLORS.borderDeactive,
    position: 'absolute',
    borderRadius: 20,
    top: 83 - RADIUS * 3,
    transform: [{rotateZ: '45deg'}, {translateX: 85}],
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
});
