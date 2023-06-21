import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';

export const GameItemStyles = StyleSheet.create({
  gameItem: {
    width: '100%',
    height: 320,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  imageWrapper: {
    width: (SPACING.screenWidth - SPACING.px * 2) * 0.4,
    height: (SPACING.screenWidth - SPACING.px * 2) * 0.4,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: COLORS.primaryDark,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 200,
  },
  title: {
    textAlign: 'center',
  },
  help: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  overlay: {
    backgroundColor: COLORS.overlay,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 2,
  },
});
