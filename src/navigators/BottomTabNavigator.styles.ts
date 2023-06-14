import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/color';
import {WIDTH_TAB_ITEM} from './BottomTabNavigator';

export const BottomTabNavigatorStytes = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 30,
    marginHorizontal: 20,
    backgroundColor: COLORS.bgGrey,
    borderRadius: 10,
    height: 70,
    shadowColor: COLORS.black,
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    borderTopWidth: 0,
  },
  hideTabBar: {display: 'none'},
  indicator: {
    width: WIDTH_TAB_ITEM - 40,
    height: 5,
    backgroundColor: COLORS.primaryLight,
    position: 'absolute',
    bottom: 83,
    left: 40,
    borderRadius: 5,
  },
});
