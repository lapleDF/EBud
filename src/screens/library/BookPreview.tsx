import React, {useEffect} from 'react';
import {CSButton, CSLayout, CSText} from '../../components/core';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {BookList} from '../../types';
import {AppDispatch, RootState} from '../../store/store';
import HeaderScreen from '../../components/HeaderScreen';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {BOOK_ACTION} from '../../store/actions';

const BookPreview = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {bookId} = route.params;
  const books: BookList = useSelector((state: RootState) => state.book);
  const selectedBook = books.list.filter(item => item.id === bookId)[0];

  const handleAddToFavorite = () => {
    AppDispatch(BOOK_ACTION.ADD_FAVORITE, selectedBook.id);
  };
  const handleNavigate = () => {
    navigation.navigate('content', {
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.px,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.bgDark,
  },
  cover: {
    width: '100%',
    height: (SPACING.screenHeight - 80) / 2,
    resizeMode: 'contain',
  },
  desc: {
    textAlign: 'justify',
  },
  bottomControls: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default BookPreview;
