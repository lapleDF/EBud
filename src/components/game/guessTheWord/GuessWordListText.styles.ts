import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/color';

export const GuessWordListTextStyles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 6,
    width: '48%',
  },
  text: {
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    rowGap: 20,
  },
});
