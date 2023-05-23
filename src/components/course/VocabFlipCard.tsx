import {View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import {COLORS} from '../../constants/color';
import FlipCard from 'react-native-flip-card';
import {SPACING} from '../../constants/spacing';
import {CSText} from '../core';

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
          // eslint-disable-next-line react-native/no-inline-styles
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

const VocabFlipCard = () => {
  const [isInBack, setIsInBack] = useState(true);

  return (
    <FlipCard
      flip={isInBack}
      // friction={8}
      flipHorizontal={false}
      style={styles.container}
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
    width: '60%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 6,
  },
});

export default VocabFlipCard;
