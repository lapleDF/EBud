import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/color';
import CSText from './CSText';

export interface CSButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<any>;
}

const CSButton = ({variant = 'primary', ...props}: CSButtonProps) => {
  const colorText = variant !== 'primary' ? 'primaryDark' : 'whiteText';
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.btn, styles[variant]]}
      onPress={props.onPress}>
      <CSText color={colorText}>{props.title}</CSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: COLORS.primaryDark,
  },
  secondary: {
    borderColor: COLORS.primaryDark,
    borderWidth: 2,
  },
});

export default CSButton;
