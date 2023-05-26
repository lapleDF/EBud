import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {LessonList} from '../../../store/reducers/lessonReducer';
import {AppDispatch, RootState} from '../../../store/store';
import {LESSON_ACTION} from '../../../store/actions';
import {CSButton, CSLayout, CSLoading, CSText} from '../../core';
import Playlist from './Playlist';
import {COLORS} from '../../../constants/color';
import CSVideo from './CSVideo';
import ExampleSentence from '../vocab/ExampleSentence';
import {SPACING} from '../../../constants/spacing';

interface ContentProps {
  skill: 'pronounce' | 'grammar';
}

const Content = ({skill}: ContentProps) => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);
  const [index, setIndex] = useState(0);
  const [openPlaylist, setOpenPlaylist] = useState(false);

  const onHandleMenuPlaylist = () => {
    setOpenPlaylist(!openPlaylist);
  };

  const handleComplete = () => {
    AppDispatch(LESSON_ACTION.COMPLETE_LESSON, lesson.lessons[index]);
  };

  const handlePressItemList = (activeIndex: number) => {
    setIndex(activeIndex);
    setOpenPlaylist(!openPlaylist);
  };
  return (
    <CSLayout>
      {lesson.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <>
          <View style={styles.header}>
            <CSText variant="PoppinsBold">{`Bài ${index + 1}: ${
              lesson.lessons[index]?.title
            }`}</CSText>
            <TouchableOpacity onPress={onHandleMenuPlaylist}>
              <Icon name="menu" size={40} color={COLORS.primaryDark} />
            </TouchableOpacity>
          </View>
          <Playlist
            activeIndex={index}
            data={lesson.lessons}
            onPressItem={handlePressItemList}
            open={openPlaylist}
          />
          <CSVideo
            posterUrl={lesson.lessons[index]?.poster}
            videoUrl={lesson.lessons[index]?.video}
          />
          <ScrollView contentContainerStyle={styles.textContent}>
            <CSText size={'xlg'} variant="PoppinsBold">
              Mô tả video
            </CSText>
            <CSText>
              {skill === 'grammar'
                ? lesson.lessons[index]?.description
                : lesson.lessons[index]?.pronouncingUsage}
            </CSText>
            <CSText size={'xlg'} variant="PoppinsBold">
              {skill === 'grammar' ? 'Nội dung bài học' : 'Ví dụ'}
            </CSText>
            {lesson.lessons.length > 0 &&
              skill === 'pronounce' &&
              lesson.lessons[index]?.sentencesEg?.map((item, idx) => (
                <ExampleSentence
                  meaning={item.meaning}
                  sentence={item.sentence}
                  key={idx}
                />
              ))}
            {skill === 'grammar' && (
              <CSText>{lesson.lessons[index]?.summarizeLesson}</CSText>
            )}
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

export default Content;
