import {View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import Tts from 'react-native-tts';

import CSText from '../../core/CSText';
import {COLORS} from '../../../constants/color';
import FlipCard from 'react-native-flip-card';
import {SPACING} from '../../../constants/spacing';

interface CardSideProps {
  onPressFlip: () => void;
  word?: string;
  wordPronouncing?: string;
  wordMean?: string;
  imageUrl?: string;
  handleSpeak: () => void;
}

const CardSide = (props: CardSideProps) => {
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
      <Icon
        name="volume-medium-outline"
        size={30}
        color={COLORS.primaryDark}
        style={styles.btnSound}
        onPress={props.handleSpeak}
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

interface VocabFlipCardProps {
  word?: string;
  wordPronouncing?: string;
  wordMean?: string;
  imageUrl?: string;
  lessonId: string;
}

const VocabFlipCard = (props: VocabFlipCardProps) => {
  const [isInBack, setIsInBack] = useState(true);

  Tts.voices().then(voices => console.log(voices));

  const handleSpeak = () =>
    Tts.speak(props.word || '', {
      androidParams: {
        KEY_PARAM_STREAM: 'STREAM_ACCESSIBILITY',
        KEY_PARAM_PAN: 0,
        KEY_PARAM_VOLUME: 1,
      },
      iosVoiceId: 'en-US-SMTf00',
      rate: 0.01,
    });
  return (
    <FlipCard
      flip={isInBack}
      flipHorizontal={false}
      style={styles.container}
      useNativeDriver={true}
      clickable={false}>
      <CardSide
        onPressFlip={() => setIsInBack(!isInBack)}
        imageUrl={props.imageUrl}
        wordMean={props.wordMean}
        handleSpeak={handleSpeak}
      />
      <CardSide
        onPressFlip={() => setIsInBack(!isInBack)}
        word={props.word}
        wordPronouncing={props.wordPronouncing}
        handleSpeak={handleSpeak}
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
