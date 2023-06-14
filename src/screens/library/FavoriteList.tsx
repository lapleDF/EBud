import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {CSLayout, CSText} from '../../components/core';
import {FavoriteListStyles as styles} from './FavoriteList.styles';
import {RootState} from '../../store/store';
import type {BookList} from '../../types';
import type {LibraryScreenProps} from '../../types/navigation/types';
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

export default FavoriteList;
