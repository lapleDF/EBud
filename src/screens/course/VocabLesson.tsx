import React from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

import {SPACING} from '../../constants/spacing';
import {CourseItem} from '../../types';
import VocabFlipCard from '../../components/course/VocabFlipCard';
import {CSLayout} from '../../components/core';

interface VocabLessonProps {
  courseItem: CourseItem;
}

const VocabLesson = ({courseItem}: VocabLessonProps) => {
  console.log(courseItem.id);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(event);
  };

  return (
    <CSLayout style={styles.container}>
      <FlatList
        data={[...Array(10)]}
        renderItem={() => <VocabFlipCard />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flipCardList}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 10,
    width: '100%',
  },
  flipCardList: {
    height: 230,
    backfaceVisibility: 'visible',
  },
});

export default VocabLesson;
