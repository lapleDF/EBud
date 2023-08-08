import {StyleSheet} from 'react-native';

import {COLORS} from '../../../constants/color';

export const CSVideoStyles = StyleSheet.create({
  fullScreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: COLORS.black,
  },
  video: {
    width: '100%',
    height: 230,
    backgroundColor: COLORS.black,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controls: {
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  sliderGroup: {
    width: '90%',
    height: 50,
  },
  slider: {
    width: '100%',
    height: 50,
  },
  controlBtn: {
    position: 'absolute',
    bottom: '50%',
    transform: [{translateY: 20}],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    width: '100%',
    zIndex: 2,
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
