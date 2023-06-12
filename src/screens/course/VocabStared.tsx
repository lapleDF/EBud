import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, Image, StyleSheet, View} from 'react-native';

import {CSLayout, CSText} from '../../components/core';
import {RootState} from '../../store/store';
import {LessonList} from '../../store/reducers/lessonReducer';
import StaredItem from '../../components/course/vocab/StaredItem';

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Image
        source={require('../../assets/images/emptyVocab.png')}
        style={styles.imgEmpty}
      />
      <CSText style={styles.emptyText} color="primaryDark">
        Danh sách từ vựng yêu thích của bạn sẽ hiển thị ở đây
      </CSText>
    </View>
  );
};

const VocabStared = () => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);

  return (
    <CSLayout>
      <FlatList
        data={lesson.lessons.filter(item => item.stared)}
        renderItem={({item}) => <StaredItem lesson={item} />}
        contentContainerStyle={styles.content}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Empty />}
      />
    </CSLayout>
  );
};

const styles = StyleSheet.create({
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

export default VocabStared;
