import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const GameGuessTheWordStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 15,
  },
  contentContainer: {
    gap: (SPACING.screenWidth - SPACING.px * 2) * 0.08,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  comlumnWrapper: {
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCongratulation: {
    width: 500,
    height: 500,
    zIndex: 0,
    position: 'absolute',
    resizeMode: 'center',
  },
  btnControls: {
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
