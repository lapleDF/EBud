import {StyleSheet} from 'react-native';

import {COLORS} from '../constants/color';
import {SPACING} from '../constants/spacing';

export const HeaderScreenStyles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.bgHeader,
    width: '100%',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.px,
  },
  left: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imgAvatar: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
