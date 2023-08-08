import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';
import {sizeText} from '../../components/core';

export const UserInfoStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 10,
  },
  infoItem: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  editBtn: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 1,
    backgroundColor: COLORS.bgDark,
    padding: 5,
    borderRadius: 5,
  },
  inpuField: {
    width: '100%',
    minHeight: 60,
    borderRadius: 10,
    fontFamily: FONTS.PoppinsRegular,
    paddingHorizontal: SPACING.px,
    backgroundColor: COLORS.bgHeader,
    fontSize: sizeText.md,
  },
  btnResetPassowrd: {
    backgroundColor: COLORS.borderDeactive,
    paddingVertical: 15,
    paddingHorizontal: SPACING.px,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnConfirm: {
    backgroundColor: COLORS.borderDeactive,
    paddingVertical: 15,
    paddingHorizontal: SPACING.px,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '35%',
  },
  btnResetPawwords: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 30,
  },
  titleResetPassword: {
    width: '100%',
    textAlign: 'center',
  },
  descResetPassword: {
    textAlign: 'justify',
  },
});
