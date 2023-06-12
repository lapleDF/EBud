import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {CSButton, CSText} from '../core';
import {COLORS} from '../../constants/color';
import {SPACING} from '../../constants/spacing';
import {Game} from '../../types';
import {RootStackScreenProps} from '../../types/navigation/types';

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
      {gameItem.type === 'rollDice' && (
        <View style={styles.overlay}>
          <CSText variant="PoppinsItalic" size={'xlg'} color="secondary">
            Sắp phát hành!
          </CSText>
        </View>
      )}
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

const styles = StyleSheet.create({
  gameItem: {
    width: '100%',
    height: 320,
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
  overlay: {
    backgroundColor: COLORS.overlay,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 2,
  },
});

export default GameItem;
