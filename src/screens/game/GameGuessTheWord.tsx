import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import GuessWordItem from '../../components/game/GuessWordItemPicture';
import {SPACING} from '../../constants/spacing';
import GuessWordItemText from '../../components/game/GuessWordItemText';
import {GuessTheWordRound} from '../../types/GuessTheWord';
import {CSButtonBack, CSText} from '../../components/core';

const DATA: GuessTheWordRound[] = [
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
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => (
          <GuessWordItem image={`${item.image}${index}`} word={item.word} />
        )}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {DATA.map((item, index) => (
              <GuessWordItemText word={item.word} key={index} />
            ))}
          </View>
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <CSButtonBack isAbsolute={false} />
            <CSText variant="NeutonBold" color="secondary">
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
  footerContainer: {
    gap: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  comlumnWrapper: {
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
