import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {CSButton, CSLayout, CSText} from '../../components/core';
import {COLORS} from '../../constants/color';
import {BookPreviewStyles as styles} from './BookPreview.styles';
import {BOOK_ACTION} from '../../store/actions';
import {AppDispatch, RootState} from '../../store/store';
import type {BookList} from '../../types';
import type {LibraryScreenProps} from '../../types/navigation/types';

const BookPreview = () => {
  const navigation =
    useNavigation<LibraryScreenProps<'Conttent'>['navigation']>();
  const route = useRoute<LibraryScreenProps<'Preview'>['route']>();

  const {bookId} = route.params;
  const books: BookList = useSelector((state: RootState) => state.book);
  const selectedBook = books.list.filter(item => item.id === bookId)[0];

  const handleAddToFavorite = () => {
    AppDispatch(BOOK_ACTION.ADD_FAVORITE, selectedBook.id);
  };

  const handleNavigate = () => {
    navigation.navigate('Conttent', {
      bookItem: selectedBook,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          textLeft: `${
            selectedBook.type === 'comic' ? 'Truyện tranh' : 'Tạp chí'
          } - ${selectedBook.title}`,
          backBtn: true,
        }),
    });
  }, [navigation, selectedBook]);

  return (
    <CSLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image source={{uri: selectedBook.cover}} style={styles.cover} />
        <CSText style={styles.desc}>
          <CSText variant="PoppinsBold">Mô tả: </CSText>
          {selectedBook.desc}
        </CSText>
        <View style={styles.bottomControls}>
          <CSButton title="Đọc ngay" onPress={handleNavigate} />
          <TouchableOpacity onPress={handleAddToFavorite}>
            <Icon
              name={selectedBook.isSaved ? 'heart' : 'heart-outline'}
              size={40}
              color={COLORS.primaryDark}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CSLayout>
  );
};

export default BookPreview;
