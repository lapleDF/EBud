import React, {useState} from 'react';
import FlipCard from 'react-native-flip-card';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CSText from '../../components/core/CSText';
import {SPACING} from '../../constants/spacing';
import {CourseItem} from '../../types';
import {COLORS} from '../../constants/color';
import CSLayout from '../../components/core/CSLayout';

interface VocabLessonProps {
  courseItem: CourseItem;
}

interface CardSideProps {
  onPressFlip: () => void;
  word?: string;
  wordPronouncing?: string;
  wordMean?: string;
  imageUrl?: string;
}

const CardSide = (props: CardSideProps) => {
  return (
    <View style={styles.cardSide}>
      <View
        style={[
          styles.center,
          {flexDirection: props.imageUrl ? 'row' : 'column'},
        ]}>
        {props.word && <CSText>{props.word}</CSText>}
        {props.wordPronouncing && <CSText>{props.wordPronouncing}</CSText>}
        {props.wordMean && <CSText>{props.wordMean}</CSText>}
        {props.imageUrl && (
          <Image source={{uri: props.imageUrl}} style={styles.image} />
        )}
      </View>
      <Icon
        name="volume-medium-outline"
        size={30}
        color={COLORS.primaryDark}
        style={styles.btnSound}
      />
      <Icon
        name="star-outline"
        size={30}
        color={COLORS.primaryDark}
        style={styles.btnStar}
      />
      <Icon
        name="sync"
        size={30}
        color={COLORS.primaryDark}
        style={styles.btnFlip}
        onPress={props.onPressFlip}
      />
    </View>
  );
};

const VocabLesson = ({courseItem}: VocabLessonProps) => {
  const [isInBack, setIsInBack] = useState(true);
  // console.log(courseItem.id);
  console.log(isInBack);
  return (
    <CSLayout style={styles.container}>
      <FlipCard
        flip={isInBack}
        friction={8}
        flipHorizontal={false}
        clickable={false}>
        <CardSide
          onPressFlip={() => setIsInBack(!isInBack)}
          word="Hello"
          wordPronouncing="/Hế lô/"
        />
        <CardSide
          onPressFlip={() => setIsInBack(!isInBack)}
          imageUrl="https://parsefiles.back4app.com/m3BU02yXteFvr3TV0XEGWVRClKOlaQzDYoTvPCZ1/9e65530c9858cfe3ad85f34d7983b022_hello.png"
          wordMean="Xin chào"
        />
      </FlipCard>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 10,
    width: '100%',
  },
  cardSide: {
    width: '100%',
    height: 230,
    backgroundColor: COLORS.borderDeactive,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSound: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  btnFlip: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  btnStar: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  center: {
    width: '100%',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 6,
  },
});

export default VocabLesson;
