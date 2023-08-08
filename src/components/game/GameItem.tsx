import {Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {CSButton, CSText} from '../core';
import {COLORS} from '../../constants/color';
import {GameItemStyles as styles} from './GameItem.styles';
import type {Game} from '../../types';
import type {RootStackScreenProps} from '../../types/navigation/types';

interface GameItemProps {
  handleHelp: (gameRule: string) => void;
  gameItem: Game;
}

const GameItem = ({handleHelp, gameItem}: GameItemProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'GameNavigator'>['navigation']>();
  const randomcolor = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handlePlayClick = () => {
    navigation.navigate('GameNavigator', {
      screen: 'GamePlaying',
      params: {gameItem},
    });
  };

  return (
    <LinearGradient
      colors={bgColors[randomcolor(0, bgColors.length - 1)]}
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
        size={'xlg'}
        style={styles.title}>
        {gameItem.name}
      </CSText>
      <CSButton title="Chơi" onPress={handlePlayClick} />
      <TouchableOpacity
        onPress={() => handleHelp(gameItem.rule)}
        style={styles.help}>
        <Icon name="help-circle" color={COLORS.primaryDark} size={35} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const bgColors = [
  ['#1E0F3D', '#4B0F3E', '#633838'],
  ['#4F0948', '#3C0B54', '#383C63'],
];

export default GameItem;
