import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';

export interface CSTextProps {
  children: React.ReactNode;
  size?: keyof typeof sizeText | number;
  color?: keyof typeof COLORS;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof FONTS;
  textProps?: TextProps;
}

export const sizeText = {
  xs: 11,
  sm: 13,
  md: 17,
  xlg: 23,
  lg: 27,
  xxl: 37,
};

const CSText = ({
  size = 'md',
  color = 'whiteText',
  variant = 'PoppinsRegular',
  ...props
}: CSTextProps) => {
  const styleText = {
    color: COLORS[color],
    fontSize: typeof size === 'number' ? size : sizeText[size],
    fontFamily: FONTS[variant],
  };

  return (
    <Text
      style={[styleText, props.style]}
      {...props.textProps}
      lineBreakMode="tail">
      {props.children}
    </Text>
  );
};

export {CSText};
