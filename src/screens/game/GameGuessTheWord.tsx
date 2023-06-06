import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import GuessWordItem from '../../components/game/GuessWordItem';
import {SPACING} from '../../constants/spacing';
import {GuessTheWordRound} from '../../types/GuessTheWord';
import {CSButton, CSButtonBack, CSText} from '../../components/core';
import GuessWordListText from '../../components/game/GuessWordListText';
import {shuffleArray} from '../../utils';

export const DATA: GuessTheWordRound[] = [
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'school',
  },
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'hospital',
  },
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'bank',
  },
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'supermarket',
  },
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'bakery',
  },
  {
    image: 'https://source.unsplash.com/random/?Cryptocurrency&',
    word: 'cafe shop',
  },
];

const GameGuessTheWord = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [guessList, setGuessList] = useState<string[]>(
    Array(DATA.length).fill(''),
  );
  const [wordList, setWordList] = useState(
    shuffleArray(
      DATA.map(item => {
        return item.word;
      }),
    ),
  );

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
    console.log(guessList);
  };

  const hanlePressText = (index: number) => {
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

    if (activeIndex + 1 !== guessList.length) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => (
          <GuessWordItem
            image={`${item.image}${index}`}
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
            {wordList.length === 0 && (
              <CSButton title="Kiểm tra" onPress={handleCheck} />
            )}
          </>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <CSButtonBack isAbsolute={false} />
            <CSText variant="NeutonBold" color="secondary" size={'xlg'}>
              Level 1
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
});
