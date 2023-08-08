import {StyleSheet} from 'react-native';

import {RADIUS} from './material';

export const CoursePlaceholderStyles = StyleSheet.create({
  containerPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  courseItem: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
  },
  courseItemLeft: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
    left: 20,
    position: 'absolute',
    top: RADIUS * 2.5,
  },
  courseItemRight: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
    right: 20,
    position: 'absolute',
    top: RADIUS * 2.5,
  },
  courseItem2: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
    position: 'absolute',
    top: RADIUS * 5.5,
  },
  courseItemLeft2: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
    left: 20,
    position: 'absolute',
    top: RADIUS * 8,
  },
  courseItemRight2: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: 100,
    right: 20,
    position: 'absolute',
    top: RADIUS * 8,
  },

  courseItemText: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    position: 'absolute',
    top: -25,
  },
  courseItemLeftText: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    left: 20,
    position: 'absolute',
    top: RADIUS * 2.1,
  },
  courseItemRightText: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    right: 20,
    position: 'absolute',
    top: RADIUS * 2.1,
  },
  courseItem2Text: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    position: 'absolute',
    top: RADIUS * 5.1,
  },
  courseItemLeft2Text: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    left: 20,
    position: 'absolute',
    top: RADIUS * 7.6,
  },
  courseItemRight2Text: {
    width: RADIUS * 1.8,
    height: 20,
    borderRadius: 5,
    right: 20,
    position: 'absolute',
    top: RADIUS * 7.6,
  },
});
