import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/color';
import {PLAY_LIST_WIDTH} from './Playlist';
import {SPACING} from '../../../constants/spacing';

export const PlaylistStyles = StyleSheet.create({
  container: {
    width: PLAY_LIST_WIDTH,
    backgroundColor: COLORS.bgHeader,
    position: 'absolute',
    zIndex: 3,
    height: SPACING.screenHeight - 60,
    left: 0,
    paddingHorizontal: SPACING.px,
  },
  drawerItem: {
    width: '100%',
    paddingBottom: 15,
  },
});
