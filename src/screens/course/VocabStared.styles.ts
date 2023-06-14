import {StyleSheet} from 'react-native';

export const VocabStaredStyles = StyleSheet.create({
  content: {
    paddingVertical: 20,
    gap: 15,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 30,
  },
  imgEmpty: {
    width: '100%',
    resizeMode: 'cover',
  },
});
