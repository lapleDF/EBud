import {StyleSheet} from 'react-native';
import {FONTS} from '../../constants/font';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {sizeText} from '../core';

export const SearchStyles = StyleSheet.create({
  searchContainer: {
    width: '86%',
    height: 60,
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
  },
  wrapInputFiled: {
    width: '100%',
    height: '100%',
  },
  searchField: {
    width: '100%',
    height: '100%',
    paddingLeft: 15,
    fontFamily: FONTS.PoppinsRegular,
    backgroundColor: COLORS.bgHeader,
    fontSize: sizeText.md,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    backgroundColor: COLORS.bgHeader,
    paddingHorizontal: SPACING.px,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
