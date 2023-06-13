import {
  Image,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {CSText} from './CSText';
import {useNavigation} from '@react-navigation/native';
import {CSButtonStyles as styles} from './CSButton.styles';
import {FONTS} from '../../constants/font';

export interface CSButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  variantText?: keyof typeof FONTS;
  buttonProps?: TouchableOpacityProps;
}

export interface CSButtonBackProps {
  isAbsolute?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CSButton = ({
  variant = 'primary',
  variantText = 'PoppinsBold',
  ...props
}: CSButtonProps) => {
  const colorText = variant !== 'primary' ? 'primaryDark' : 'whiteText';
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props.buttonProps}
      style={[styles.btn, styles[variant], props.style]}
      onPress={props.onPress}>
      <CSText color={colorText} variant={variantText}>
        {props.title}
      </CSText>
    </TouchableOpacity>
  );
};

const CSButtonBack = ({isAbsolute = true, ...props}: CSButtonBackProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.5}
      style={isAbsolute ? styles.btnBack : props.style}>
      <Image
        source={require('../../assets/images/backBtn.png')}
        style={styles.imgBackBtn}
      />
    </TouchableOpacity>
  );
};

export {CSButton, CSButtonBack};
