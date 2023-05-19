import React from 'react';
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

interface VocabLessonProps {
  courseItem: CourseItem;
}

const VocabLesson = ({courseItem}: VocabLessonProps) => {
  console.log(courseItem.id);

  const handleSeeMore = () => {
    console.log('handle see more');
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
      />
      <View style={styles.controls}>
        <View style={styles.btns}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/prevBtn.png')}
              style={styles.btnImg}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/nextBtn.png')}
              style={styles.btnImg}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBarActive} />
        </View>
        <CSText>1/10</CSText>
      </View>
      <View style={styles.exampleContainer}>
        <CSText size={'xlg'} variant={'PoppinsBold'}>
          Các mẫu câu ví dụ
        </CSText>
        <ExampleSentence
          id="1"
          meaning="I'm from good, thanks"
          sentence="How are you from?"
        />
        <ExampleSentence
          id="1"
          meaning="I'm from good, thanks"
          sentence="How are you from?"
        />
        <ExampleSentence
          id="1"
          meaning="I'm from good, thanks"
          sentence="How are you from?"
        />
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
    width: '60%',
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
