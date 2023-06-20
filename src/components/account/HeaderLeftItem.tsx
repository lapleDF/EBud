import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {CSText} from '../core';
import {COLORS} from '../../constants/color';
import {HeaderLeftStyles as styles} from './HeaderLeftItem.styles';

interface HeaderLeftItemProps {
  label: string;
  totalStreak: number;
  iconName?: string;
}

const HeaderLeftItem = ({
  iconName,
  label,
  totalStreak,
}: HeaderLeftItemProps) => {
  return (
    <View style={styles.headerItem}>
      <CSText>{label}</CSText>
      <View style={styles.headerItemEnd}>
        <CSText>{totalStreak}</CSText>
        {iconName && (
          <Icon name={iconName} size={30} color={COLORS.secondary} />
        )}
      </View>
    </View>
  );
};

export default HeaderLeftItem;
