import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSButton, CSLayout, CSLoading, CSText} from '../../components/core';
import {AppDispatch, RootState} from '../../store/store';
import {LessonList} from '../../store/reducers/lessonReducer';
import {SPACING} from '../../constants/spacing';
import ExampleSentence from '../../components/course/vocab/ExampleSentence';
import {LESSON_ACTION} from '../../store/actions';
import {COLORS} from '../../constants/color';
import CSVideo from '../../components/course/grammarAndPronouce/Video';
import DrawerList from '../../components/course/grammarAndPronouce/DrawerList';

const PronounceLesson = () => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);
  const [index, setIndex] = useState(0);
  const refDrawer = useRef();
  const [openDrawerRight, setOpenDrawerRight] = useState(false);

  const onPressNextLesson = () => {
    if (index < lesson.lessons.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleComplete = () => {
    AppDispatch(LESSON_ACTION.COMPLETE_LESSON, lesson.lessons[index].id);
  };

  return (
    <CSLayout>
      {lesson.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <>
          <View style={styles.header}>
            <CSText color="primaryDark" variant="PoppinsBold">{`Bài ${
              index + 1
            }: ${lesson.lessons[index]?.title}`}</CSText>
            <TouchableOpacity onPress={onPressNextLesson}>
              <Icon name="menu" size={40} color={COLORS.primaryDark} />
            </TouchableOpacity>
          </View>
          <DrawerList
            ref={refDrawer}
            data={[...Array(6)]}
            onPressItem={() => {}}
          />
          <CSVideo
            posterUrl={lesson.lessons[index]?.poster}
            videoUrl={lesson.lessons[index]?.video}
          />
          <ScrollView contentContainerStyle={styles.textContent}>
            <CSText size={'xlg'} variant="PoppinsBold">
              Mô tả video
            </CSText>
            <CSText>{lesson.lessons[index]?.pronouncingUsage}</CSText>
            <CSText size={'xlg'} variant="PoppinsBold">
              Ví dụ
            </CSText>
            {lesson.lessons.length > 0 &&
              lesson.lessons[index]?.sentencesEg?.map((item, idx) => (
                <ExampleSentence
                  meaning={item.meaning}
                  sentence={item.sentence}
                  key={idx}
                />
              ))}
            <View style={styles.btnBottom}>
              <CSButton
                title={
                  lesson.lessons[index]?.isLearned
                    ? 'Đã hoàn thành'
                    : 'Hoàn thành'
                }
                buttonProps={{
                  disabled: lesson.lessons[index]?.isLearned ? true : false,
                }}
                style={lesson.lessons[index]?.isLearned && styles.btnDisabled}
                onPress={handleComplete}
              />
              <CSText
                size={'sm'}
                variant="PoppinsItalic"
                style={styles.textCenter}>
                {'(Hoàn thành bài học để có thể học bài tiếp theo)'}
              </CSText>
            </View>
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
  btnBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  btnDisabled: {
    opacity: 0.5,
  },
});

export default PronounceLesson;
