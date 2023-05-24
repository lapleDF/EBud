import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {CSLayout, CSLoading, CSText} from '../../components/core';
import {RootState} from '../../store/store';
import {LessonList} from '../../store/reducers/lessonReducer';
import {SPACING} from '../../constants/spacing';
import CSVideo from '../../components/course/grammarAndPronouce/Video';

const GrammarLesson = () => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);
  const [index, setIndex] = useState(0);

  const onPressNextLesson = () => {
    if (index < lesson.lessons.length - 1) {
      setIndex(index + 1);
    }
  };
  return (
    <CSLayout>
      {lesson.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <>
          <View style={styles.header}>
            <CSText>{`Bài ${index + 1}/${lesson.lessons.length}`}</CSText>
            <CSText variant="PoppinsBold">
              {lesson.lessons[index]?.title}
            </CSText>
            <TouchableOpacity onPress={onPressNextLesson}>
              <CSText color="primaryLighter">{'Bài tiếp theo'}</CSText>
            </TouchableOpacity>
          </View>
          <CSVideo
            posterUrl={lesson.lessons[index]?.poster}
            videoUrl={lesson.lessons[index]?.video}
          />
          <ScrollView contentContainerStyle={styles.textContent}>
            <CSText size={'xlg'} variant="PoppinsBold">
              Mô tả video
            </CSText>
            <CSText>{lesson.lessons[index]?.description}</CSText>
            <CSText size={'xlg'} variant="PoppinsBold">
              Nội dung video
            </CSText>
            <CSText>{lesson.lessons[index]?.summarizeLesson}</CSText>
          </ScrollView>
        </>
      )}
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SPACING.px,
  },
  textContent: {
    paddingHorizontal: SPACING.px,
    paddingVertical: SPACING.px * 2,
  },
  collasibleContainer: {},
  collasibleHeader: {},
  collasibleContent: {},
});

export default GrammarLesson;
