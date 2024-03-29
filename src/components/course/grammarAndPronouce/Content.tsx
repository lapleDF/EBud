import {ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import React, {useState} from 'react';

import {LessonList} from '../../../store/reducers/lessonReducer';
import {CSButton, CSLayout, CSLoading, CSText} from '../../core';
import {AppDispatch, RootState} from '../../../store/store';
import ExampleSentence from '../vocab/ExampleSentence';
import {LESSON_ACTION} from '../../../store/actions';
import {COLORS} from '../../../constants/color';
import {ContentStyles as styles} from './Content.styles';
import Playlist from './Playlist';
import CSVideo from './CSVideo';

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
            <CSText style={styles.text}>
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

export default Content;
