import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const AccountStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
  },
  groupBtnModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  logout: {
    width: SPACING.screenWidth - SPACING.px * 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryLighter,
    paddingVertical: 10,
    marginLeft: SPACING.px,
    marginVertical: 20,
  },
  titleList: {
    marginTop: 20,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: SPACING.heightBottomTab,
  },
});
