import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../core';
import {Book} from '../../types';
import {COLORS} from '../../constants/color';
import {AppDispatch} from '../../store/store';
import {BOOK_ACTION} from '../../store/actions';
import {RootStackScreenProps} from '../../types/navigation/types';
import {BookItemStyles as styles} from './BookItem.styles';

interface BookItemProps {
  item: Book;
  isFavorite?: boolean;
}

const BookItem = ({item, isFavorite = false}: BookItemProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'LibraryNavigator'>['navigation']>();

  const onPress = () => {
    navigation.navigate('LibraryNavigator', {
      screen: 'Preview',
      params: {bookId: item.id},
    });
  };

  const handleAddToFavorite = (bookId: string) => {
    AppDispatch(BOOK_ACTION.ADD_FAVORITE, bookId);
  };

  return (
    <Pressable style={styles.imgWrap} onPress={onPress}>
      <Image source={{uri: item.cover}} style={styles.img} />
      {isFavorite && (
        <TouchableOpacity
          onPress={() => handleAddToFavorite(item.id)}
          style={styles.saveBtn}>
          <Icon
            name={item.isSaved ? 'heart' : 'heart-outline'}
            size={40}
            color={COLORS.primaryDark}
          />
        </TouchableOpacity>
      )}
      <View style={styles.title}>
        <CSText
          style={styles.titleText}
          variant="PoppinsBold"
          textProps={{numberOfLines: 2}}>
          {item.title}
        </CSText>
      </View>
    </Pressable>
  );
};

export default BookItem;
