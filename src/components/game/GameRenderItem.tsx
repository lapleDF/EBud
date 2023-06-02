import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {CSButton, CSText} from '../core';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {Game} from '../../types';

interface GameRenderItemProps {
  handleHelp: (gameRule: string) => void;
  gameItem: Game;
}

const GameRenderItem = ({handleHelp, gameItem}: GameRenderItemProps) => {
  const navigation = useNavigation<any>();
  const randomcolor = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handlePlay = () => {
    navigation.navigate('gamePlaying', {
      gameItem,
    });
  };

  return (
    <LinearGradient
      colors={bgColorArr[randomcolor(0, bgColorArr.length - 1)]}
      style={styles.gameItem}>
      <Image
        source={{
          uri: gameItem.cover,
        }}
        style={styles.image}
      />
      <CSText
        variant="PoppinsBold"
        textProps={{numberOfLines: 2}}
        style={styles.title}>
        {gameItem.name}
      </CSText>
      <CSButton title="Chơi" onPress={handlePlay} />
      <TouchableOpacity
        onPress={() => handleHelp(gameItem.rule)}
        style={styles.help}>
        <Icon name="help-circle" color={COLORS.primaryDark} size={35} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const bgColorArr = [
  ['#1E0F3D', '#4B0F3E', '#633838'],
  ['#4F0948', '#3C0B54', '#383C63'],
  // ['#F03131', '#872323', '#31031C'],
];

const styles = StyleSheet.create({
  gameItem: {
    width: '100%',
    height: 300,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  image: {
    width: (SPACING.screenWidth - SPACING.px * 2) * 0.4,
    height: (SPACING.screenWidth - SPACING.px * 2) * 0.4,
    resizeMode: 'cover',
    borderRadius: 200,
    borderWidth: 3,
    borderColor: COLORS.primaryDark,
  },
  title: {
    textAlign: 'center',
  },
  help: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default GameRenderItem;
