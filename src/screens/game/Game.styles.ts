import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const GameStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SPACING.px,
    paddingBottom: SPACING.heightBottomTab,
    marginTop: 20,
    gap: 20,
  },
  gameRule: {
    textAlign: 'justify',
  },
});
