import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {CSText} from '../core';
import {COLORS} from '../../constants/color';

interface HeaderLeftItemProps {
  label: string;
  totalStreak: number;
  iconName?: string | undefined;
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

const styles = StyleSheet.create({
  headerItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  headerItemEnd: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '20%',
  },
});

export default HeaderLeftItem;
