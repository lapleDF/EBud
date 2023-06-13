import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const LibraryStyles = StyleSheet.create({
  footerSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainerSection: {
    paddingHorizontal: SPACING.px,
    paddingBottom: SPACING.heightBottomTab,
  },
  headerSection: {
    marginTop: 40,
  },
  contentSectionItem: {
    justifyContent: 'space-between',
  },
  empty: {
    width: '100%',
    height: 200,
  },
});
