import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const UserInfoStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  input: {},
  infoItem: {
    width: '100%',
  },
});
