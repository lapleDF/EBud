import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/color';
import {RADIUS} from './Line';

export const LineStyles = StyleSheet.create({
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
});
