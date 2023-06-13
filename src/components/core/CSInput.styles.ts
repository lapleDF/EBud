import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';
import {SPACING} from '../../constants/spacing';
import {sizeText} from './CSText';

export const CSInputStyles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 70,
    borderRadius: 10,
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFiled: {
    width: '100%',
    minHeight: 60,
    borderWidth: 1,
    borderColor: COLORS.primaryLighter,
    borderRadius: 10,
    fontFamily: FONTS.PoppinsRegular,
    paddingHorizontal: SPACING.px,
    fontSize: sizeText.md,
  },
  icon: {
    position: 'absolute',
    right: SPACING.px,
  },
  errMess: {
    fontWeight: '600',
    marginTop: 3,
    paddingHorizontal: 5,
  },
});
