import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const AccountHeaderStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  headerLeft: {
    width: '40%',
    height: SPACING.screenWidth * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarTouchable: {
    width: '70%',
    height: '70%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 60,
  },
  headerRight: {
    width: '60%',
    height: SPACING.screenWidth * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineBetween: {
    width: 6,
    height: '100%',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 6,
    position: 'absolute',
    top: 0,
    left: -6,
  },
  headerItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  headerItemEnd: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '20%',
  },
});
