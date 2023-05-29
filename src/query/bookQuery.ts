import Parse from 'parse/react-native';

import {PARSE_OBJ} from '../constants/parseObject';
import {convertBookData} from '../utils';
import {Book} from '../types';

export const queryGetListBook = async (userId: string) => {
  const bookQuery = new Parse.Query(PARSE_OBJ.book);
  const favoriteQuery = new Parse.Query(PARSE_OBJ.favoriteList);

  const bookList = await bookQuery.find();
  const favoriteList = await favoriteQuery.contains('userId', userId).find();
  const result: Book[] = convertBookData(bookList, favoriteList);
  return result;
};

export const queryAddBookFavoriteList = async (id: string, userId: string) => {
  const favoriteListQuery = new Parse.Query(PARSE_OBJ.favoriteList);
  const favoriteListObj = new Parse.Object(PARSE_OBJ.favoriteList);
  const favoriteList: Parse.Object[] = await favoriteListQuery
    .contains('bookId', id)
    .contains('userId', userId)
    .find();

  if (favoriteList.length !== 0) {
    try {
      favoriteListObj.set('objectId', favoriteList[0].id);
      await favoriteListObj.destroy();
      return false;
    } catch (error) {
      console.log('Error delete favorite list: ', error);
    }
  }
  const bookQuery = new Parse.Object(PARSE_OBJ.book);
  const userQuery = new Parse.User();
  bookQuery.set('objectId', id);
  userQuery.set('objectId', userId);

  try {
    favoriteListObj.set('bookId', bookQuery);
    favoriteListObj.set('userId', userQuery);
    await favoriteListObj.save();
    return true;
  } catch (error) {
    console.log('Error add favorite list: ', error);
  }
};
