import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants/color';
import {FONTS} from '../../constants/font';

export interface CSTextProps {
  children: any;
  size?: keyof typeof sizeText | number;
  color?: keyof typeof COLORS;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof FONTS;
}

export const sizeText = {
  xs: 11,
  sm: 13,
  md: 18,
  lg: 27,
  xxl: 37,
};

const CSText = ({
  size = 'md',
  color = 'whiteText',
  variant = 'PoppinsRegular',
  ...props
}: CSTextProps) => {
  return (
    <Text
      style={[
        {
          color: COLORS[color],
          fontSize: typeof size === 'number' ? size : sizeText[size],
          fontFamily: FONTS[variant],
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CSText;
