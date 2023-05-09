import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/color';
import CSText from './CSText';
import {useNavigation} from '@react-navigation/native';
import {SPACING} from '../../constants/spacing';

export interface CSButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<any>;
}

export interface CSButtonBackProps {
  isAbsolute?: boolean;
  style?: StyleProp<ViewStyle>;
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

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
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
  imgBackBtn: {
    width: 50,
    height: 40,
    resizeMode: 'contain',
  },
  btnBack: {
    position: 'absolute',
    top: SPACING.px,
    left: SPACING.px,
  },
});

export {CSButton, CSButtonBack};
