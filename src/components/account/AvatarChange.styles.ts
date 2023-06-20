import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const AvatarChangeStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    rowGap: 40,
    marginBottom: 50,
  },
  item: {
    alignItems: 'center',
  },
  image: {
    width: (SPACING.screenWidth - SPACING.px * 4) * 0.25,
    height: (SPACING.screenWidth - SPACING.px * 4) * 0.25,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  nameAvatar: {
    position: 'absolute',
    bottom: -30,
  },
  imageActive: {
    borderColor: COLORS.primaryLight,
    borderWidth: 6,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
