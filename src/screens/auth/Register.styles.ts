import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const RegisterStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: SPACING.px,
  },
  groupBtn: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  groupInput: {
    width: '100%',
    alignItems: 'center',
    gap: 25,
  },
  agreeBtnGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
});
