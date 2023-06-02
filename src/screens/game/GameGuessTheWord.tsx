import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import GuessWordItem from '../../components/game/GuessWordItem';
import {SPACING} from '../../constants/spacing';
import {CSText} from '../../components/core';
import {COLORS} from '../../constants/color';

const GameGuessTheWord = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...Array(6)]}
        renderItem={() => <GuessWordItem />}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {[...Array(6)].map((item, index) => (
              <CSText style={styles.resultItem} key={index}>
                result item {index}
              </CSText>
            ))}
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
    gap: (SPACING.screenWidth - SPACING.px * 2) * 0.06,
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
  resultItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryDark,
    width: '45%',
    borderRadius: 10,
    textAlign: 'center',
  },
});
