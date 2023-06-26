import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

export const VocabLessonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 10,
    gap: 20,
    width: '100%',
  },
  flipCardList: {
    height: 230,
  },
  controls: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btnImg: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.borderDeactive,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: 10,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    width: '100%',
  },
  exampleContainer: {
    width: '100%',
    gap: 10,
    height: SPACING.screenHeight - 230 * 2,
  },
  contentSentence: {gap: 10},
  text: {
    textAlign: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  disabled: {
    opacity: 0.5,
    transform: [{scale: 0.8}],
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
});
