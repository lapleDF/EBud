import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import FlipCard from 'react-native-flip-card';

import {COLORS} from '../../../constants/color';
import {SPACING} from '../../../constants/spacing';
import {CSText} from '../../core';
import {handleSpeak} from '../../../utils';
import {AppDispatch} from '../../../store/store';
import {LESSON_ACTION} from '../../../store/actions';
import {Lesson} from '../../../types';

interface CardSideProps {
  onPressFlip: () => void;
  word?: string;
  wordPronouncing?: string;
  wordMean?: string;
  imageUrl?: string;
  handleSpeak: () => void;
  lessonId: string;
  isStar: boolean;
}

const CardSide = (props: CardSideProps) => {
  const handleStar = () => {
    AppDispatch(LESSON_ACTION.ADD_FAVORITE_LIST, props.lessonId);
  };

  return (
    <View style={styles.cardSide}>
      <View
        style={[
          styles.center,
          // eslint-disable-next-line react-native/no-inline-styles
          {flexDirection: props.imageUrl ? 'row' : 'column'},
        ]}>
        {props.word && <CSText>{props.word}</CSText>}
        {props.wordPronouncing && <CSText>{props.wordPronouncing}</CSText>}
        {props.wordMean && (
          <CSText style={styles.wordMean}>{props.wordMean}</CSText>
        )}
        {props.imageUrl && (
          <Image source={{uri: props.imageUrl}} style={styles.image} />
        )}
      </View>
      <TouchableOpacity style={styles.btnSound}>
        <Icon
          name="volume-medium-outline"
          size={30}
          color={COLORS.primaryDark}
          onPress={props.handleSpeak}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStar}>
        <Icon
          name={props.isStar ? 'star' : 'star-outline'}
          size={30}
          color={COLORS.primaryDark}
          onPress={handleStar}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnFlip}>
        <Icon
          name="sync"
          size={30}
          color={COLORS.primaryDark}
          onPress={props.onPressFlip}
        />
      </TouchableOpacity>
    </View>
  );
};

interface VocabFlipCardProps {
  lesson: Lesson;
}

const VocabFlipCard = ({lesson}: VocabFlipCardProps) => {
  const [isInBack, setIsInBack] = useState(true);

  return (
    <FlipCard
      flip={isInBack}
      flipHorizontal={false}
      style={styles.container}
      useNativeDriver={true}
      clickable={false}>
      <CardSide
        onPressFlip={() => setIsInBack(!isInBack)}
        imageUrl={lesson.image}
        wordMean={lesson.wordMeaning}
        handleSpeak={() => handleSpeak(lesson.word || '')}
        lessonId={lesson.id}
        isStar={lesson.stared || false}
      />
      <CardSide
        onPressFlip={() => setIsInBack(!isInBack)}
        word={lesson.word}
        wordPronouncing={lesson.pronouncing}
        handleSpeak={() => handleSpeak(lesson.word || '')}
        lessonId={lesson.id}
        isStar={lesson.stared || false}
      />
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SPACING.screenWidth - SPACING.px * 2,
    height: 230,
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
    width: '55%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  wordMean: {
    width: '35%',
  },
});

export default VocabFlipCard;
