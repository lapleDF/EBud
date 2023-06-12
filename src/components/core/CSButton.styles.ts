import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';

export const CSButtonStyles = StyleSheet.create({
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: COLORS.primaryDark,
  },
  secondary: {
    borderColor: COLORS.primaryDark,
    borderWidth: 2,
  },
  imgBackBtn: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  btnBack: {
    position: 'absolute',
    top: SPACING.px,
    left: SPACING.px,
  },
});
