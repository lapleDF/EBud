import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import CSText from '../core/CSText';

const WIDTH = SPACING.screenWidth / 6;

const GroupCourseRender = () => {
  return (
    <View>
      <View style={styles.first}>
        <View style={styles.mainEle}>
          <CSText style={styles.courseTitle}>Chào hỏi</CSText>
          <CSText style={styles.courseScore}>6/10</CSText>
          <Image
            source={require('../../assets/images/course/course1.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.firstLine} />
        <View style={styles.circleWrap}>
          <CircularProgress
            value={50}
            radius={WIDTH}
            showProgressValue={false}
            activeStrokeColor={COLORS.primaryLight}
            inActiveStrokeColor={COLORS.borderDeactive}
          />
        </View>
      </View>
      <View style={styles.secondAndThird}>
        <View style={styles.mainEle}>
          <CSText style={styles.courseTitle}>Chào hỏi</CSText>
          <CSText style={styles.courseScore}>6/10</CSText>
          <Image
            source={require('../../assets/images/course/course2.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.mainEle}>
          <CSText style={styles.courseTitle}>Chào hỏi</CSText>
          <CSText style={styles.courseScore}>6/10</CSText>
          <Image
            source={require('../../assets/images/course/course3.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.secondLine} />
        <View style={styles.thirdLine} />

        <View style={styles.circleWrap}>
          <CircularProgress
            showProgressValue={false}
            value={30}
            radius={WIDTH}
            activeStrokeColor={COLORS.primaryLight}
            inActiveStrokeColor={COLORS.borderDeactive}
          />
        </View>
        <View style={styles.circleWrap3}>
          <CircularProgress
            value={0}
            showProgressValue={false}
            radius={WIDTH}
            activeStrokeColor={COLORS.primaryLight}
            inActiveStrokeColor={COLORS.borderDeactive}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  first: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  secondAndThird: {
    height: 200,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleWrap: {
    position: 'absolute',
  },
  circleWrap3: {
    position: 'absolute',
    right: 0,
  },
  firstLine: {
    height: WIDTH * 2 - 15,
    width: 10,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    borderRadius: 20,
    bottom: 83 - WIDTH * 3,
    transform: [{rotateZ: '45deg'}, {translateX: -85}],
  },
  secondLine: {
    width: WIDTH * 2 - 10,
    height: 10,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    borderRadius: 20,
    left: WIDTH * 2 - 5,
  },
  thirdLine: {
    height: WIDTH * 2 - 15,
    width: 10,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    borderRadius: 20,
    bottom: 83 - WIDTH * 3,
    right: WIDTH - 5,
    transform: [{rotateZ: '45deg'}, {translateX: -85}],
  },
  mainEle: {
    width: WIDTH * 2,
    height: WIDTH * 2,
    borderRadius: 70,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default GroupCourseRender;
