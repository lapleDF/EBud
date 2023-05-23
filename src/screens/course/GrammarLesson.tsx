import React, {useState} from 'react';
import Video from 'react-native-video';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {COLORS} from '../../constants/color';
import {CSLayout, CSLoading, CSText} from '../../components/core';
import {RootState} from '../../store/store';
import {LessonList} from '../../store/reducers/lessonReducer';

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
          <View style={styles.video}>
            <Video
              source={{
                uri: lesson.lessons[index]?.video,
              }}
              resizeMode="cover"
              poster={lesson.lessons[index]?.poster}
              posterResizeMode="cover"
              controls
              style={styles.backgroundVideo}
            />
          </View>
          <CSText size={'xlg'} variant="PoppinsBold">
            Mô tả video
          </CSText>
          <CSText>{lesson.lessons[index]?.description}</CSText>
          <CSText size={'xlg'} variant="PoppinsBold">
            Nội dung video
          </CSText>
          <CSText>{lesson.lessons[index]?.summarizeLesson}</CSText>
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
  },
  video: {
    width: '100%',
    height: 230,
    backgroundColor: COLORS.bgGrey,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  collasibleContainer: {},
  collasibleHeader: {},
  collasibleContent: {},
});

export default GrammarLesson;
