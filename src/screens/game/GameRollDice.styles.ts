import {StyleSheet} from 'react-native';

import {SPACING} from '../../constants/spacing';

export const GameRollDiceStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streak: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '88%',
    justifyContent: 'space-between',
  },
  leftColumn: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    zIndex: -1,
  },
  rightColumn: {
    height: '100%',
    justifyContent: 'space-between',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '79%',
  },
  contentItem: {
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  character: {
    backgroundColor: 'green',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    borderRadius: 10,
  },
  diceWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    gap: 10,
    ...StyleSheet.absoluteFillObject,
  },
  dicer: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
