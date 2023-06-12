import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {CSText} from '../core';
import {COLORS} from '../../constants/color';

interface GuessWordItemTextProps {
  wordList: string[];
  onPress: (index: number) => void;
}

const GuessWordListText = ({wordList, onPress}: GuessWordItemTextProps) => {
  return (
    <ScrollView contentContainerStyle={styles.footerContainer}>
      {wordList.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress(index)}
          style={styles.item}
          activeOpacity={0.7}>
          <CSText variant="Bungee" style={styles.text}>
            {item}
          </CSText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default GuessWordListText;

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 6,
    width: '48%',
  },
  text: {
    textAlign: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    rowGap: 20,
  },
});
