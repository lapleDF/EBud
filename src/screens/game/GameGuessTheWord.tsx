import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

import GuessWordItem from '../../components/game/GuessWordItem';
import {
  CSButton,
  CSButtonBack,
  CSLoading,
  CSModal,
  CSText,
} from '../../components/core';
import GuessWordListText from '../../components/game/GuessWordListText';
import {SPACING} from '../../constants/spacing';
import {handleSpeak, shuffleArray} from '../../utils';
import {GuessTheWordList} from '../../types';
import {AppDispatch, RootState} from '../../store/store';
import {
  GAME_ACTION,
  GUESS_THE_WORD_ACTION,
  USER_ACTION,
} from '../../store/actions';
import {useNavigation} from '@react-navigation/native';
import {PlayingGame} from '../../types/PlayingGame';

interface GameGuessTheWordProps {
  gameId: string;
}

const GameGuessTheWord = ({gameId}: GameGuessTheWordProps) => {
  const state: RootState = useSelector((rootState: RootState) => rootState);
  const guessTheWordata: GuessTheWordList = state.guesTheWord;
  const userGameInfo: PlayingGame[] = state.user.game;

  const [activeIndex, setActiveIndex] = useState(0);
  const [guessList, setGuessList] = useState<string[]>(Array(6).fill(''));
  const [wordList, setWordList] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const refModal = useRef<RBSheet>();
  const [level, setLevel] = useState(
    (userGameInfo.find(
      item =>
        item.gameId === gameId &&
        item.currentLevel !== guessTheWordata.maxLevel,
    )?.currentLevel || 0) + 1,
  );
  const navigation = useNavigation<any>();

  const handlePressItem = (index: number) => {
    setActiveIndex(index);
  };

  const handleRemoveItem = (index: number) => {
    if (guessList[index] !== '') {
      setGuessList(
        guessList.map(item => {
          if (item === guessList[index]) {
            return '';
          }
          return item;
        }),
      );
      if (!wordList.includes(guessList[index])) {
        setWordList(wordList.concat(guessList[index]));
      }
    }
  };

  const handleCheck = () => {
    let count = 0;
    guessTheWordata.list.forEach((item, index) => {
      if (item.word === guessList[index]) {
        count += 1;
      }
    });
    if (
      count === guessTheWordata.list.length &&
      guessTheWordata.list.length !== 0
    ) {
      AppDispatch(GAME_ACTION.UPDATE_GAME_INFO_USER, {
        gameId: gameId,
        level: level,
      });
      AppDispatch(USER_ACTION.INCREASE_MEDAL);
    }
    setScore(count);
    refModal.current?.open();
  };

  const hanlePressText = (index: number) => {
    handleSpeak(wordList[index]);
    if (activeIndex === -1) {
      return;
    }
    let wordListTemp = wordList;
    wordListTemp = wordList.filter(item => item !== wordList[index]);
    setGuessList(
      guessList.map((guessItem, indexGuess) => {
        if (indexGuess === activeIndex) {
          guessItem = wordList[index];
        }
        return guessItem;
      }),
    );
    if (guessList[activeIndex] !== '') {
      wordListTemp = wordListTemp.concat(guessList[activeIndex]);
    }
    setWordList(wordListTemp);

    if (wordListTemp.length === 0) {
      setActiveIndex(-1);
      return;
    }
    for (let indexItem = 0; indexItem < guessList.length; indexItem++) {
      if (indexItem !== activeIndex && guessList[indexItem] === '') {
        setActiveIndex(indexItem);
        return;
      }
    }
  };

  const handleTryAgain = () => {
    refModal.current?.close();
    setGuessList(Array(6).fill(''));
    setWordList(
      shuffleArray(
        guessTheWordata.list.map(item => {
          return item.word;
        }),
      ),
    );
  };

  const handleNextLevel = () => {
    refModal.current?.close();
    if (guessTheWordata.maxLevel !== guessTheWordata.list[0].level) {
      setLevel(level + 1);
    } else {
      return;
    }
    setGuessList(Array(6).fill(''));
    setWordList(
      shuffleArray(
        guessTheWordata.list.map(item => {
          return item.word;
        }),
      ),
    );
  };
  useEffect(() => {
    AppDispatch(GUESS_THE_WORD_ACTION.GET_LIST, level);
  }, [level]);

  useEffect(() => {
    setWordList(
      shuffleArray(
        guessTheWordata.list.map(item => {
          return item.word;
        }),
      ),
    );
  }, [guessTheWordata.list]);

  return (
    <View style={styles.container}>
      {guessTheWordata.fetchingStatus === 'loading' && <CSLoading />}
      <CSModal
        refRBSheet={refModal}
        height={SPACING.screenHeight * 0.35}
        closeBtn={false}>
        {score === guessTheWordata.list.length && (
          <Lottie
            source={require('../../assets/images/congratulation.json')}
            autoPlay
            loop
            style={styles.imageCongratulation}
            speed={1}
          />
        )}
        <CSText variant="Bungee" color="primaryDark" size={'xlg'}>
          Điểm của bạn
        </CSText>
        <CSText variant="Bungee" size={'lg'} color="secondary">
          {`${score}/${guessTheWordata.list.length}`}
        </CSText>
        <View style={styles.btnControls}>
          <CSButton
            title="Thử lại"
            onPress={handleTryAgain}
            variant="secondary"
          />
          {score === guessTheWordata.list.length &&
          guessTheWordata.maxLevel !== guessTheWordata.list[0]?.level ? (
            <CSButton title="Tiếp theo" onPress={handleNextLevel} />
          ) : (
            <CSButton
              title="Thoát"
              onPress={() => navigation.navigate('game')}
            />
          )}
        </View>
      </CSModal>
      <FlatList
        data={guessTheWordata.list}
        renderItem={({item, index}) => (
          <GuessWordItem
            image={item.image}
            word={guessList[index]}
            onPressItem={() => handlePressItem(index)}
            onRemoveItem={() => handleRemoveItem(index)}
            isActive={activeIndex === index}
            index={index}
          />
        )}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <>
            <GuessWordListText wordList={wordList} onPress={hanlePressText} />
            {wordList.length === 0 &&
              guessTheWordata.fetchingStatus !== 'loading' &&
              guessTheWordata.list.length > 0 && (
                <CSButton title="Kiểm tra" onPress={handleCheck} />
              )}
          </>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <CSButtonBack isAbsolute={false} />
            <CSText variant="NeutonBold" color="secondary" size={'xlg'}>
              Level {`${level}/${guessTheWordata.maxLevel}`}
            </CSText>
          </View>
        }
        numColumns={2}
        columnWrapperStyle={styles.comlumnWrapper}
      />
    </View>
  );
};

export default GameGuessTheWord;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
    paddingVertical: 15,
  },
  contentContainer: {
    gap: (SPACING.screenWidth - SPACING.px * 2) * 0.08,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  comlumnWrapper: {
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCongratulation: {
    width: 500,
    height: 500,
    zIndex: 0,
    position: 'absolute',
    resizeMode: 'center',
  },
  btnControls: {
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
