import Icon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import CSText from '../../core/CSText';
import {COLORS} from '../../../constants/color';
import {SentenceEg} from '../../../types';

const ExampleSentence = (props: SentenceEg) => {
  const handlePlaySound = () => {
    console.log('Handle play sound', props.listen);
  };
  return (
    <View style={styles.exampleWrap}>
      <View style={styles.exampleGroup}>
        <CSText>{`\u25CF ${props.sentence}`}</CSText>
        <TouchableOpacity onPress={handlePlaySound}>
          <Icon name="volume-medium-outline" size={27} color={COLORS.bgGrey} />
        </TouchableOpacity>
      </View>
      <CSText variant="PoppinsItalic">{`-> ${props.meaning}`}</CSText>
    </View>
  );
};

const styles = StyleSheet.create({
  exampleGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  exampleWrap: {
    width: '100%',
  },
});

export default ExampleSentence;
