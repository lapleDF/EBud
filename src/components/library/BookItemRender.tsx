import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../core';
import type {Book} from '../../types';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {AppDispatch} from '../../store/store';
import {BOOK_ACTION} from '../../store/actions';

interface BookItemRenderProps {
  item: Book;
  isFavorite?: boolean;
}

const BookItemRender = ({item, isFavorite = false}: BookItemRenderProps) => {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('preview', {
      bookId: item.id,
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

const styles = StyleSheet.create({
  imgWrap: {
    width: '47%',
    height: 230,
    marginBottom: (SPACING.screenWidth - SPACING.px * 2) * 0.06,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  title: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  titleText: {
    textAlign: 'center',
  },
  saveBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default BookItemRender;
