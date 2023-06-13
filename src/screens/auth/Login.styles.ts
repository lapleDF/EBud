import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const LoginStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 100,
    alignItems: 'center',
    paddingHorizontal: SPACING.px,
  },
  groupInput: {
    width: '100%',
    gap: 20,
  },
  groupBtn: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
});
