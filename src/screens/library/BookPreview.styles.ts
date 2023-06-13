import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const BookPreviewStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.px,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.bgDark,
  },
  cover: {
    width: '100%',
    height: (SPACING.screenHeight - 80) / 2,
    resizeMode: 'contain',
  },
  desc: {
    textAlign: 'justify',
  },
  bottomControls: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
