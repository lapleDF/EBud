import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, SectionList, View} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {CSButton, CSLayout, CSLoading, CSText} from '../../components/core';
import {AppDispatch, RootState} from '../../store/store';
import {BOOK_ACTION} from '../../store/actions';
import Search from '../../components/library/Search';
import {Book, BookList} from '../../types';
import {LibraryStyles as styles} from './Library.styles';
import SectionHeader from '../../components/sectionList/SectionHeader';
import {RootStackScreenProps} from '../../types/navigation/types';
import BookItem from '../../components/library/BookItem';

export interface SectionBookProps {
  title: string;
  data: [Book[]];
  type: 'comic' | 'magazine';
}

interface EmptyProps {
  search: string;
}

const Empty = ({search}: EmptyProps) => {
  return search !== '' ? (
    <View style={styles.empty}>
      <CSText color="secondary">
        Không tìm thấy kết quả nào với từ khóa{' "'}
        <CSText variant="PoppinsBold">{search}</CSText>"
      </CSText>
    </View>
  ) : null;
};

const Library = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'BottomTab'>['navigation']>();
  const state: RootState = useSelector((rootState: RootState) => rootState);
  const books: BookList = state.book;
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const firstMount = () => {
      navigation.setOptions({
        header: () =>
          HeaderScreen({
            headerRight: (
              <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            ),
            iconLeft: 'heart',
            onPressLeft: () =>
              navigation.navigate('LibraryNavigator', {screen: 'Favorite'}),
          }),
      });
      AppDispatch(BOOK_ACTION.GET_LIST);
    };
    firstMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useLayoutEffect(() => {
    if (searchValue.length > 0) {
      const filteredBooks = books.list.filter((book: Book) =>
        handleNormalizeText(book.title).match(handleNormalizeText(searchValue)),
      );
      setSearchedBooks(filteredBooks);
    }
  }, [books.list, searchValue]);

  const handleSeeMore = (type: string) => {
    console.log(type);
  };

  const handleNormalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  const renderSectionFooter = (section: SectionBookProps) => {
    const LIMIT = 8;
    if (books.list.length > LIMIT) {
      return (
        <View style={styles.footerSection}>
          <CSButton
            title="Xem thêm"
            onPress={() => handleSeeMore(section.type)}
          />
        </View>
      );
    }
    return null;
  };

  const SECTION: SectionBookProps[] = [
    {
      title: 'Đọc truyện',
      data:
        searchValue === ''
          ? [books.list.filter(item => item.type === 'comic')]
          : [searchedBooks.filter(item => item.type === 'comic')],
      type: 'comic',
    },
    {
      title: 'Đọc tạp chí',
      data:
        searchValue === ''
          ? [books.list.filter(item => item.type === 'magazine')]
          : [searchedBooks.filter(item => item.type === 'magazine')],
      type: 'magazine',
    },
  ];

  return (
    <CSLayout>
      {books.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <SectionList
          sections={SECTION}
          renderSectionHeader={({section}) => (
            <SectionHeader sectionBook={section} />
          )}
          contentContainerStyle={styles.contentContainerSection}
          renderSectionFooter={({section}) => renderSectionFooter(section)}
          showsVerticalScrollIndicator={false}
          renderItem={({section}) => (
            <FlatList
              data={section.data[0]}
              renderItem={({item}) => <BookItem item={item} />}
              columnWrapperStyle={styles.contentSectionItem}
              ListEmptyComponent={<Empty search={searchValue} />}
              numColumns={2}
              keyExtractor={keyItem => keyItem.id}
            />
          )}
        />
      )}
    </CSLayout>
  );
};

export default Library;
