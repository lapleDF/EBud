import {
  Animated,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Lottie from 'lottie-react-native';
import Sound from 'react-native-sound';

import {COLORS} from '../../../constants/color';
import {MysteryBoxProps, PLAY_ITEMS, PlayItem} from '../../../constants/dice';
import type {RollDiceQuestion} from '../../../types';
import {CSButton, CSInput, CSModal, CSText} from '../../core';
import ProgressiveImage from '../../core/ProgressiveImage';
import {PopupRollingStyles as styles} from './PopupRolling.styles';
import {AppDispatch} from '../../../store/store';
import {USER_ACTION} from '../../../store/actions';
import {handleNormalizeText} from '../../../screens/library/Library';

interface PopupRollingProps {
  type: PlayItem['type'];
  question: RollDiceQuestion;
  refModal: React.MutableRefObject<RBSheet | undefined>;
  mysteryBox: MysteryBoxProps;
  setActiveIndex: (index: number) => void;
  activeIndex: number;
}

const PopupRolling = ({
  type,
  question,
  refModal,
  mysteryBox,
  setActiveIndex,
  activeIndex,
}: PopupRollingProps) => {
  const textAnimateValue = useRef(new Animated.Value(0)).current;
  const refHelp = useRef<RBSheet>();

  const failSound = new Sound('fail.mp3', Sound.MAIN_BUNDLE);
  const successSound = new Sound('success.mp3', Sound.MAIN_BUNDLE);

  const animated = {
    transform: [{scale: textAnimateValue}],
  };

  const [answer, setAnswer] = useState('');
  const [answerErr, setAnswerErr] = useState('');

  const handleAnswer = () => {
    if (
      handleNormalizeText(answer).match(handleNormalizeText(question.answer))
    ) {
      successSound.play();
      setTimeout(() => {
        refModal.current?.close();
      }, 500);
    } else {
      setAnswerErr('Wrong answer!');
      failSound.play();
    }
  };

  const handleMystery = () => {
    if (mysteryBox.type !== 'return') {
      const newActiveIndex = activeIndex + mysteryBox.step;
      if (newActiveIndex < PLAY_ITEMS.length) {
        setActiveIndex(newActiveIndex);
      } else {
        setActiveIndex(newActiveIndex - PLAY_ITEMS.length);
        AppDispatch(USER_ACTION.INCREASE_MEDAL);
      }
    } else {
      setActiveIndex(0);
    }
    () => refModal.current?.close();
  };

  useEffect(() => {
    if (type === 'secret') {
      Animated.timing(textAnimateValue, {
        toValue: 1.2,
        delay: 1500,
        useNativeDriver: true,
        duration: 1500,
      }).start();
    }
  }, [textAnimateValue, type]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  switch (type) {
    case 'question':
      return (
        <ScrollView
          contentContainerStyle={styles.container}
          scrollEnabled={true}>
          <CSModal refRBSheet={refHelp}>
            <CSText variant="Bungee" size={'xlg'} color="primaryDark">
              Gợi ý
            </CSText>
            <CSText style={styles.question}>{question.suggest}</CSText>
          </CSModal>
          <TouchableOpacity
            style={styles.help}
            onPress={() => refHelp.current?.open()}>
            <Icon
              name="lightbulb-on-outline"
              size={35}
              color={COLORS.primaryDark}
            />
          </TouchableOpacity>
          <CSText variant="Bungee" size={'xlg'} color="primaryDark">
            Trả lời câu hỏi sau
          </CSText>
          <CSText variant="PoppinsBold" style={styles.question}>
            {question?.question}
          </CSText>
          <CSInput
            onChangeText={text => setAnswer(text)}
            defaultValue={answer}
            placeholder="Nhập đáp án của bạn"
            errMess={answerErr}
            textInputProps={{onSubmitEditing: handleAnswer}}
          />
          <View style={styles.btns}>
            <CSButton onPress={handleAnswer} title="Trả lời" />
          </View>
        </ScrollView>
      );

    case 'secret':
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <CSText variant="Bungee" size={'xlg'} color="primaryDark">
            Hộp bí ẩn
          </CSText>

          <View style={styles.mysteryBoxContainer}>
            <ProgressiveImage
              source={require('../../../assets/images/dicePlayblock/openBox.png')}
              style={styles.imageBoxOpen}
            />
            <Animated.Text style={[styles.titleMysteryBox, animated]}>
              {mysteryBox.title}
            </Animated.Text>
            <CSButton onPress={handleMystery} title="OK" />
          </View>
        </ScrollView>
      );

    default:
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <CSText variant="Bungee" size={'xlg'} color="primaryDark">
            Hoàn thành 1 lượt
          </CSText>
          <View style={styles.mysteryBoxContainer}>
            <Lottie
              source={require('../../../assets/images/congratulation.json')}
              autoPlay
              loop
              style={styles.congratulation}
              speed={1}
            />
            <CSButton onPress={() => refModal.current?.close()} title="OK" />
          </View>
        </ScrollView>
      );
  }
};

export default PopupRolling;
