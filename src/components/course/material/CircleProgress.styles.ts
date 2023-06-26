import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/color';

export const CircleProgressStyles = StyleSheet.create({
  circleWrap: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
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
