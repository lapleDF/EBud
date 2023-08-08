import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList, Image, View} from 'react-native';

import {CSLayout, CSText} from '../../components/core';
import {RootState} from '../../store/store';
import {LessonList} from '../../store/reducers/lessonReducer';
import StaredItem from '../../components/course/vocab/StaredItem';
import {VocabStaredStyles as styles} from './VocabStared.styles';

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

export default VocabStared;
