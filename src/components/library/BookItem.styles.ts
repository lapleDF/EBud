import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const BookItemStyles = StyleSheet.create({
  imgWrap: {
    width: '47%',
    height: 230,
    marginBottom: (SPACING.screenWidth - SPACING.px * 2) * 0.06,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  title: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: SPACING.px,
  },
  titleText: {
    textAlign: 'center',
  },
  saveBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
