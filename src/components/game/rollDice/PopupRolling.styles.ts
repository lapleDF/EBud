import {StyleSheet} from 'react-native';
import {FONTS} from '../../../constants/font';
import {sizeText} from '../../core';
import {COLORS} from '../../../constants/color';

export const PopupRollingStyles = StyleSheet.create({
  container: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageBoxOpen: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  question: {
    textAlign: 'justify',
  },
  titleMysteryBox: {
    position: 'absolute',
    fontFamily: FONTS.Bungee,
    fontSize: sizeText.xlg,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  mysteryBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulation: {
    width: 500,
    height: 500,
    zIndex: 0,
    position: 'absolute',
    resizeMode: 'center',
  },
  help: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
