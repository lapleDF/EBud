import {StyleSheet} from 'react-native';

export const GroupCourseStyles = StyleSheet.create({
  first: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    zIndex: 1,
  },
  secondAndThird: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item2: {
    zIndex: 1,
  },
  item23: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
