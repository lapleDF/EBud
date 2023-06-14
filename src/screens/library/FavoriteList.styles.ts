import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const FavoriteListStyles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.px,
    paddingVertical: 20,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
