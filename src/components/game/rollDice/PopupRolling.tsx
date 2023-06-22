import Lottie from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import {COLORS} from '../../../constants/color';
import {MysteryBoxProps, PlayItem} from '../../../constants/dice';
import {PopupRollingStyles as styles} from './PopupRolling.styles';
import {RollDiceQuestion} from '../../../types';
import {CSButton, CSInput, CSModal, CSText} from '../../core';
import ProgressiveImage from '../../core/ProgressiveImage';

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
  const animated = {
    transform: [{scale: textAnimateValue}],
  };

  const [answer, setAnswer] = useState('');
  const [answerErr, setAnswerErr] = useState('');

  const handleAnswer = () => {
    if (answer.match(question.answer)) {
      setTimeout(() => {
        refModal.current?.close();
      }, 600);
    } else {
      setAnswerErr('Wrong answer!');
    }
  };

  const handleMystery = () => {
    if (mysteryBox.type !== 'return') {
      setActiveIndex(activeIndex + (mysteryBox.step || 0));
    } else {
      setActiveIndex(0);
    }
    () => refModal.current?.close();
  };

  useEffect(() => {
    if (type === 'secret') {
      Animated.timing(textAnimateValue, {
        toValue: 1,
        delay: 500,
        useNativeDriver: true,
        duration: 1500,
      }).start();
    }
  }, [textAnimateValue, type]);

  switch (type) {
    case 'question':
      return (
        <ScrollView
          contentContainerStyle={styles.container}
          scrollEnabled={true}>
          <CSModal refRBSheet={refHelp}>
            <CSText variant="PoppinsBold" size={'xlg'} color="primaryDark">
              Gợi ý
            </CSText>
            <CSText style={styles.question}>{question.suggest}</CSText>
            <CSText style={styles.question}>{question.answer}</CSText>
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
          <CSText style={styles.question}>{question?.question}</CSText>
          <CSInput
            onChangeText={text => setAnswer(text)}
            defaultValue={answer}
            placeholder="Nhập đáp án của bạn"
            errMess={answerErr}
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
            Hộp bí mật
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
