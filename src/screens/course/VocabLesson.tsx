import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ExampleSentence from '../../components/course/vocab/ExampleSentence';
import VocabFlipCard from '../../components/course/vocab/VocabFlipCard';
import {CSLayout, CSLoading, CSModal, CSText} from '../../components/core';
import {LessonList} from '../../store/reducers/lessonReducer';
import {CSButton} from '../../components/core/CSButton';
import {SPACING} from '../../constants/spacing';
import {VocabLessonStyles as styles} from './VocabLesson.styles';
import {AppDispatch, RootState} from '../../store/store';
import {LESSON_ACTION} from '../../store/actions';
import type {User} from '../../types';
import type {RootStackScreenProps} from '../../types/navigation/types';

const VocabLesson = () => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);
  const user: User = useSelector((state: RootState) => state.user);

  const refFlatList = useRef<any>();
  const refModal = useRef<any>();
  const [index, setIndex] = useState(0);
  const navigation =
    useNavigation<RootStackScreenProps<'BottomTab'>['navigation']>();
  const WIDTH = SPACING.screenWidth - SPACING.px * 2;
  const progressAnimatedValue = useRef(new Animated.Value(-WIDTH)).current;

  const transformAnimate = {
    transform: [{translateX: progressAnimatedValue}, {perspective: 1000}],
  };

  const handleComplete = () => {
    AppDispatch(LESSON_ACTION.COMPLETE_LESSON, lesson.lessons[index]);
  };

  const handleExit = () => {
    refModal.current.close();
    navigation.goBack();
  };

  const handleReset = () => {
    refFlatList.current.scrollToIndex({
      animated: true,
      index: 0,
    });
    setIndex(0);
    refModal.current.close();
  };

  const handleBtnChangeFlipCard = (isNext: boolean) => {
    if (
      (isNext && index + 1 === lesson.lessons.length) ||
      (!isNext && index === 0)
    ) {
      return;
    }
    refFlatList.current.scrollToIndex({
      animated: true,
      index: isNext ? index + 1 : index - 1,
    });
    setIndex(isNext ? index + 1 : index - 1);
  };

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems[0]?.index !== undefined) {
      setIndex(viewableItems[0]?.index);
    }
  }, []);

  useEffect(() => {
    if (lesson.lessons.length > 0) {
      Animated.timing(progressAnimatedValue, {
        toValue: -WIDTH + ((index + 1) * WIDTH) / lesson.lessons.length,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: 500,
      }).start();
      if (
        index + 1 === lesson.lessons.length &&
        lesson.lessons[index].isLearned
      ) {
        // AppDispatch(COURSE_ACTION.GET_LIST, user.id);
        refModal.current.open();
      }
    }
  }, [WIDTH, index, lesson.lessons, progressAnimatedValue, user.id]);

  return (
    <CSLayout style={styles.container}>
      {lesson.fetchingStatus === 'loading' ? (
        <CSLoading />
      ) : (
        <>
          <FlatList
            data={lesson.lessons}
            ref={refFlatList}
            renderItem={({item}) => <VocabFlipCard lesson={item} />}
            keyExtractor={(item, idx) => idx.toString()}
            contentContainerStyle={styles.flipCardList}
            pagingEnabled
            scrollEnabled={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              waitForInteraction: true,
              viewAreaCoveragePercentThreshold: 98,
            }}
          />

          <View style={styles.controls}>
            <View style={styles.btns}>
              <TouchableOpacity onPress={() => handleBtnChangeFlipCard(false)}>
                <Image
                  source={require('../../assets/images/prevBtn.png')}
                  style={[styles.btnImg, index === 0 && styles.disabled]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBtnChangeFlipCard(true)}
                disabled={!lesson.lessons[index]?.isLearned}>
                <Image
                  source={require('../../assets/images/nextBtn.png')}
                  style={[
                    styles.btnImg,
                    !lesson.lessons[index]?.isLearned && styles.disabled,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
              <Animated.View
                style={[styles.progressBarActive, transformAnimate]}
              />
            </View>
            <CSText>{`${index + 1}/${lesson.lessons.length}`}</CSText>
          </View>

          <View style={styles.exampleContainer}>
            <CSText size={'xlg'} variant={'PoppinsBold'}>
              Các mẫu câu ví dụ
            </CSText>
            {lesson.lessons.length > 0 && (
              <FlatList
                data={lesson.lessons[index]?.sentencesEg}
                renderItem={({item}) => (
                  <ExampleSentence
                    meaning={item.meaning}
                    sentence={item.sentence}
                  />
                )}
                contentContainerStyle={styles.contentSentence}
                keyExtractor={(_item, indexKey) => indexKey.toString()}
              />
            )}
            <View style={styles.controls}>
              <CSButton
                buttonProps={{disabled: lesson.lessons[index]?.isLearned}}
                onPress={handleComplete}
                style={lesson.lessons[index]?.isLearned && styles.btnDisabled}
                title={
                  lesson.lessons[index]?.isLearned
                    ? 'Đã hoàn thành'
                    : 'Hoàn thành'
                }
              />
              <CSText size={'sm'} variant="PoppinsItalic" style={styles.text}>
                {'(Hoàn thành bài học để có thể học bài tiếp theo)'}
              </CSText>
            </View>
          </View>
        </>
      )}
      <CSModal refRBSheet={refModal} isShowCloseBtn={false}>
        <CSText
          size={'lg'}
          color="primaryDark"
          variant="PoppinsBold"
          style={styles.textCenter}>
          Chúc mừng hoàn thành bài học
        </CSText>
        <CSText style={styles.textCenter}>
          Bạn đã hoàn thành tất cả bài học. Nhấn học lại để xem lại những bài
          học trước đó
        </CSText>
        <View style={styles.groupBtnModal}>
          <CSButton title="Học lại" onPress={handleReset} />
          <CSButton title="Thoát" onPress={handleExit} variant="secondary" />
        </View>
      </CSModal>
    </CSLayout>
  );
};

export default VocabLesson;
