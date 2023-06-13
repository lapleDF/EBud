import {StyleSheet} from 'react-native';

import {SPACING} from '../../../constants/spacing';

export const ContentStyles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SPACING.px,
  },
  textContent: {
    paddingHorizontal: SPACING.px,
    paddingVertical: SPACING.px * 2,
  },
  btnBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'justify',
  },
  btnDisabled: {
    opacity: 0.5,
  },
});
