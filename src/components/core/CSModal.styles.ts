import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const CSModalStyles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: SPACING.px,
    paddingTop: 40,
    gap: 10,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRBS: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    width: SPACING.screenWidth - SPACING.px * 2,
    position: 'absolute',
    shadowColor: COLORS.black,
    backgroundColor: COLORS.bgDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    height: 'auto',
    elevation: 6,
  },
});
