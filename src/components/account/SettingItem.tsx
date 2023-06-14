import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {CSText} from '../core';
import {COLORS} from '../../constants/color';
import type {
  AccountStackParamList,
  RootStackScreenProps,
} from '../../types/navigation/types';
import {SettingItemStyles as styles} from './SettingItem.styles';

interface SettingItemProps {
  label: string;
  icon: string;
  onPress?: () => void;
  routeName?: keyof AccountStackParamList;
}

const SettingItem = ({label, icon, onPress, routeName}: SettingItemProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'AccountNavigator'>['navigation']>();

  const handlePressItem = () => {
    if (routeName) {
      navigation.navigate('AccountNavigator', {screen: routeName});
    } else {
      onPress && onPress();
    }
  };
  return (
    <TouchableNativeFeedback onPress={handlePressItem} style={styles.item}>
      <View style={styles.itemLeft}>
        <Icon name={icon} color={COLORS.primaryLighter} size={35} />
        <CSText>{label}</CSText>
      </View>
      <Icon
        name="chevron-forward-outline"
        color={COLORS.primaryLighter}
        size={35}
      />
    </TouchableNativeFeedback>
  );
};

export default SettingItem;
