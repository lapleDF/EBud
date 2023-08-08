import {ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';

import {CSText} from '../../core';
import {GuessWordListTextStyles as styles} from './GuessWordListText.styles';

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
