import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import {CSButton, CSLayout, CSLoading, CSText} from '../../components/core';
import {AppDispatch, RootState} from '../../store/store';
import {BOOK_ACTION} from '../../store/actions';
import Search from '../../components/library/Search';
import {Book, BookList} from '../../types';
import {SPACING} from '../../constants/spacing';
import SectionHeader from '../../components/sectionList/SectionHeader';
import {COLORS} from '../../constants/color';

export interface SectionBookProps {
  title: string;
  data: [Book[]];
  type: 'comic' | 'magazine';
}

const Library = () => {
  const navigation = useNavigation<any>();
  const state: RootState = useSelector((rootState: RootState) => rootState);
  const books: BookList = state.book;

  useEffect(() => {
    const firstMount = () => {
      navigation.setOptions({
        header: () =>
          HeaderScreen({
            headerRight: <Search />,
            iconLeft: 'heart',
            onPressLeft: () => console.log('saved list'),
          }),
      });
      AppDispatch(BOOK_ACTION.GET_LIST, null);
    };
    firstMount();
  }, [navigation]);

  const handleSeeMore = (type: string) => {
    console.log(type);
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

  const handlePressItem = (bookId: string) => {
    navigation.navigate('preview', {
      bookId: bookId,
    });
  };

  const SECTION: SectionBookProps[] = [
    {
      title: 'Đọc truyện',
      data: [books.list.filter(item => item.type === 'comic')],
      type: 'comic',
    },
    {
      title: 'Đọc tạp chí',
      data: [books.list.filter(item => item.type === 'magazine')],
      type: 'magazine',
    },
  ];

  return (
    <CSLayout>
      {books.fetchingStatus === 'loading' && <CSLoading />}
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
            renderItem={({item}) => (
              <Pressable
                style={styles.imgWrap}
                onPress={() => handlePressItem(item.id)}>
                <Image source={{uri: item.cover}} style={styles.img} />
                <View style={styles.title}>
                  <CSText style={styles.titleText} variant="PoppinsBold">
                    {item.title}
                  </CSText>
                </View>
              </Pressable>
            )}
            columnWrapperStyle={styles.contentSectionItem}
            numColumns={2}
            keyExtractor={keyItem => keyItem.id}
          />
        )}
      />
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  footerSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainerSection: {
    paddingHorizontal: SPACING.px,
    paddingBottom: 90,
  },
  headerSection: {
    marginTop: 40,
  },
  imgWrap: {
    width: '47%',
    height: 200,
    marginBottom: (SPACING.screenWidth - SPACING.px * 2) * 0.06,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  contentSectionItem: {
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.overlay,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 10,
  },
  titleText: {
    textAlign: 'center',
  },
});
export default Library;
