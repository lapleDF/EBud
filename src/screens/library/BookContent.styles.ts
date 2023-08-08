import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const BookContentStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: SPACING.screenWidth,
    height: SPACING.screenHeight,
    backgroundColor: COLORS.bgDark,
  },
  audioFile: {},
  controlsGroup: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: COLORS.overlay,
    padding: SPACING.px,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleModal: {
    textAlign: 'center',
  },
  bookTitle: {
    textAlign: 'center',
    width: '65%',
  },
  audio: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderGroup: {
    width: '90%',
    height: 50,
  },
  slider: {
    width: '100%',
    height: 50,
  },
  timer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
});
