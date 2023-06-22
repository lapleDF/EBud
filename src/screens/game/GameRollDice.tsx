import {
  Animated,
  Image,
  LayoutChangeEvent,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import Sound from 'react-native-sound';

import {CSButtonBack, CSModal, CSText} from '../../components/core';
import {COLORS} from '../../constants/color';
import {RollDiceQuestion, User} from '../../types';
import {RootState} from '../../store/store';
import {GameRollDiceStyles as styles} from './GameRollDice.styles';
import {
  DICES,
  MysteryBoxProps,
  PLAY_ITEMS,
  mysteryBoxes,
} from '../../constants/dice';
import {RollDiceQuestionList} from '../../store/reducers/rollDiceReducer';
import RBSheet from 'react-native-raw-bottom-sheet';
import ProgressiveImage from '../../components/core/ProgressiveImage';
import PopupRolling from '../../components/game/rollDice/PopupRolling';

const GameRollDice = () => {
  const rootState: RootState = useSelector((state: RootState) => state);
  const user: User = rootState.user;
  const rollDiceQuestion: RollDiceQuestionList = rootState.rollDice;

  const valueOffsetX: Animated.Value = useRef(new Animated.Value(0)).current;
  const valueOffsetY: Animated.Value = useRef(new Animated.Value(0)).current;
  const refModalQuestion = useRef<RBSheet>();

  const jumpSound = new Sound('jump.mp3', Sound.MAIN_BUNDLE);
  const rollSound = new Sound('rolling.mp3', Sound.MAIN_BUNDLE);

  const [contentLayout, setContentLayout] = useState({width: 1, height: 1});
  const [playItems, setPlayItems] = useState(PLAY_ITEMS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDice, setActiveDice] = useState(DICES[0]);
  const [question, setQuestion] = useState<RollDiceQuestion>(
    rollDiceQuestion.list[0],
  );
  const [mysteryBox, setMysteryBox] = useState<MysteryBoxProps>(
    mysteryBoxes[0],
  );

  const animate = {
    transform: [{translateX: valueOffsetX}, {translateY: valueOffsetY}],
  };
  const layoutItem = {
    width: contentLayout.width * 0.15,
    height: contentLayout.height * 0.25,
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    const height = e.nativeEvent.layout.height;
    const newPlayItems = [...PLAY_ITEMS];

    newPlayItems.forEach((item, index) => {
      if (index < 5) {
        item.valueX = width * index * 0.15 + width * 0.0625 * index;
      }
      if (index > 4 && index < 7) {
        item.valueX = width * 4 * 0.15 + width * 0.0625 * 4;
        item.valueY =
          height * 0.25 * (index - 4) + height * 0.125 * (index - 4);
      }
      if (index > 6 && index < 11) {
        item.valueX =
          width - (width * (index - 5) * 0.15 + width * 0.0625 * (index - 6));
        item.valueY = height * 0.5 + height * 0.25;
      }
      if (index === 11) {
        item.valueY = height * 0.25 + height * 0.125;
      }
    });

    setPlayItems(newPlayItems);

    setContentLayout({
      width: width,
      height: height,
    });
  };

  const handleRollDice = () => {
    rollSound.play();
    let diceTemp = activeDice;
    const intervalID = setInterval(() => {
      const dice = DICES[Math.floor(Math.random() * DICES.length)];
      setActiveDice(dice);
      diceTemp = dice;
    }, 500);
    setTimeout(() => {
      clearInterval(intervalID);
    }, 3500);
    setTimeout(() => {
      const newActiveIndex = activeIndex + diceTemp.value;
      if (newActiveIndex < playItems.length) {
        setActiveIndex(newActiveIndex);
      } else {
        setActiveIndex(newActiveIndex - playItems.length);
        // todo: actions when finish a round
      }
      jumpSound.play();
      if (playItems[activeIndex].type === 'question') {
        setQuestion(
          rollDiceQuestion.list[
            Math.floor(Math.random() * (rollDiceQuestion.list.length + 1))
          ],
        );
        return;
      }
      if (playItems[activeIndex].type === 'secret') {
        setMysteryBox(
          mysteryBoxes[Math.floor(Math.random() * (mysteryBoxes.length + 1))],
        );
        return;
      }
    }, 4000);
    setTimeout(() => {
      refModalQuestion.current?.open();
    }, 5000);
  };

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(valueOffsetX, {
        toValue: playItems[activeIndex].valueX || 0,
        useNativeDriver: false,
      }),
      Animated.spring(valueOffsetY, {
        toValue: playItems[activeIndex].valueY || 0,
        useNativeDriver: false,
      }),
    ]).start();
  }, [activeIndex, playItems, valueOffsetX, valueOffsetY]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <CSModal refRBSheet={refModalQuestion} isShowCloseBtn={false}>
        <PopupRolling
          type={playItems[activeIndex].type}
          question={question}
          refModal={refModalQuestion}
          mysteryBox={mysteryBox}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </CSModal>

      <View style={styles.header}>
        <CSButtonBack isAbsolute={false} />
        <View style={styles.streak}>
          <CSText>{user.totalMedal}</CSText>
          <Icon name="trophy" size={35} color={COLORS.secondary} />
        </View>
      </View>

      <View style={styles.content} onLayout={onLayout}>
        <View style={styles.diceWrapper}>
          <TouchableOpacity onPress={handleRollDice}>
            <ProgressiveImage source={activeDice.img} style={styles.dicer} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.character, animate, layoutItem]}>
          <Lottie
            source={require('../../assets/images/tiger.json')}
            autoPlay
            loop
            style={{
              transform: [{scaleX: 1}],
            }}
            speed={1.3}
          />
        </Animated.View>

        {playItems.slice(0, 4).map((item, index) => (
          <View style={[styles.contentItem, layoutItem]} key={index}>
            <Image source={item.imageUrl} style={styles.imageBlock} />
          </View>
        ))}

        <View style={styles.rightColumn}>
          {playItems.slice(4, 7).map((item, index) => (
            <View style={[styles.contentItem, layoutItem]} key={index}>
              <Image source={item.imageUrl} style={styles.imageBlock} />
            </View>
          ))}
        </View>

        <View style={styles.bottomRow}>
          {playItems.slice(7, 11).map((item, index) => (
            <View style={[styles.contentItem, layoutItem]} key={index}>
              <Image source={item.imageUrl} style={styles.imageBlock} />
            </View>
          ))}
        </View>

        <View style={styles.leftColumn}>
          {playItems.slice(11, 12).map((item, index) => (
            <View style={[styles.contentItem, layoutItem]} key={index}>
              <Image source={item.imageUrl} style={styles.imageBlock} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GameRollDice;
