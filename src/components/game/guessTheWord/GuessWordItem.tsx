import {Pressable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../../core';
import {COLORS} from '../../../constants/color';
import {GuessWordItemStyles as styles} from './GuessWordItem.styles';
import ProgressiveImage from '../../core/ProgressiveImage';

interface GuessWordItemProps {
  image: string;
  word: string;
  onPressItem: () => void;
  onRemoveItem: () => void;
  isActive: boolean;
  index: number;
}

const GuessWordItem = ({
  image,
  word,
  onPressItem,
  onRemoveItem,
  isActive,
  index,
}: GuessWordItemProps) => {
  return (
    <Pressable onPress={onPressItem} style={styles.container}>
      <ProgressiveImage
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={[styles.space, isActive && styles.active]}>
        {word !== '' && isActive && (
          <TouchableOpacity
            style={[styles.remove, index % 2 === 0 ? styles.event : styles.odd]}
            onPress={onRemoveItem}>
            <Icon name="close" color={COLORS.red} style={styles.iconRemove} />
          </TouchableOpacity>
        )}
        <CSText color="primaryDark" variant="Bungee">
          {word}
        </CSText>
      </View>
    </Pressable>
  );
};

export default GuessWordItem;
