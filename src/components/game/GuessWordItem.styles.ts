import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const GuessWordItemStyles = StyleSheet.create({
  container: {
    width: (SPACING.screenWidth - SPACING.px * 2) * 0.47,
    height: SPACING.screenHeight * 0.18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  space: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.borderDeactive,
    borderRadius: 5,
    height: 40,
  },
  active: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    top: -15,
  },
  event: {
    right: -15,
  },
  odd: {
    left: -15,
  },
  iconRemove: {
    fontSize: 25,
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
  },
});
