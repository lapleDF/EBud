import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {CSLayout, CSText} from '../../components/core';
import {SPACING} from '../../constants/spacing';
import {RootState} from '../../store/store';
import {BookList} from '../../types';
import {LibraryScreenProps} from '../../types/navigation/types';
import BookItem from '../../components/library/BookItem';

const EmptyComponent = () => {
  return (
    <View style={styles.empty}>
      <CSText color="primaryDark">Danh sách yêu thích trống</CSText>
    </View>
  );
};

const FavoriteList = () => {
  const navigation =
    useNavigation<LibraryScreenProps<'Favorite'>['navigation']>();
  const bookList: BookList = useSelector((state: RootState) => state.book);
  const bookData = bookList.list.filter(item => item.isSaved);

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({backBtn: true, textLeft: 'Danh sách yêu thích'}),
    });
  }, [navigation]);

  return (
    <CSLayout>
      <FlatList
        data={bookData}
        renderItem={({item}) => <BookItem item={item} isFavorite />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<EmptyComponent />}
        columnWrapperStyle={styles.columnWrapper}
      />
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.px,
    paddingVertical: 20,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default FavoriteList;
