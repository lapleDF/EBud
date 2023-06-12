import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSText} from '../core';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';

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
      <Image
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

const styles = StyleSheet.create({
  container: {
    width: (SPACING.screenWidth - SPACING.px * 2) * 0.47,
    height: SPACING.screenHeight * 0.18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  space: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.borderDeactive,
    borderRadius: 5,
    height: 40,
  },
  active: {
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    top: -15,
  },
  event: {
    right: -15,
  },
  odd: {
    left: -15,
  },
  iconRemove: {
    fontSize: 25,
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
  },
});
