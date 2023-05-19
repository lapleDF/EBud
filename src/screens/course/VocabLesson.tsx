import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {CSButton} from '../../components/core/CSButton';
import CSLayout from '../../components/core/CSLayout';
import CSText from '../../components/core/CSText';
import ExampleSentence from '../../components/course/vocab/ExampleSentence';
import VocabFlipCard from '../../components/course/vocab/VocabFlipCard';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {CourseItem} from '../../types';
import {LessonList} from '../../store/reducers/lessonReducer';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import CSLoading from '../../components/core/CSLoading';

interface VocabLessonProps {
  courseItem: CourseItem;
}

const VocabLesson = ({courseItem}: VocabLessonProps) => {
  const lesson: LessonList = useSelector((state: RootState) => state.lesson);
  const refFlatList = useRef<any>();
  const [index, setIndex] = useState(0);
  const handleSeeMore = () => {
    console.log('handle see more', courseItem.id);
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

  return (
    <CSLayout style={styles.container}>
      {lesson.fetchingStatus === 'loading' && <CSLoading />}
      <FlatList
        data={lesson.lessons}
        ref={refFlatList}
        renderItem={({item}) => (
          <VocabFlipCard
            lessonId={item.id}
            imageUrl={item.image}
            word={item.word}
            wordMean={item.wordMeaning}
            wordPronouncing={item.pronouncing}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
        contentContainerStyle={styles.flipCardList}
        pagingEnabled
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
              style={styles.btnImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBtnChangeFlipCard(true)}>
            <Image
              source={require('../../assets/images/nextBtn.png')}
              style={styles.btnImg}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressBarActive,
              {width: `${((index + 1) / lesson.lessons.length) * 100}%`},
            ]}
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
            data={lesson.lessons[index].sentencesEg}
            renderItem={({item}) => (
              <ExampleSentence
                meaning={item.meaning}
                sentence={item.sentence}
              />
            )}
            contentContainerStyle={{gap: 10}}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <View style={styles.controls}>
          <CSButton onPress={handleSeeMore} title="Xem thêm ví dụ khác" />
        </View>
      </View>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 10,
    gap: 20,
    width: '100%',
  },
  flipCardList: {
    height: 230,
  },
  controls: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btnImg: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.borderDeactive,
    borderRadius: 10,
  },
  progressBarActive: {
    height: 10,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
  },
  exampleContainer: {
    width: '100%',
    gap: 10,
    height: SPACING.screenHeight - 230 * 2,
  },
});

export default VocabLesson;
