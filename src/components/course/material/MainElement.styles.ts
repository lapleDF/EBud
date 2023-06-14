import {StyleSheet} from 'react-native';

import {RADIUS} from './Line';

export const MainElementStyles = StyleSheet.create({
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
