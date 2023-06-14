import {View} from 'react-native';
import React from 'react';

import {SPACING} from '../../../constants/spacing';
import {LineStyles as styles} from './Line.styles';

interface LineProps {
  variant: 'line12' | 'line3';
  isActive?: boolean;
}

export const RADIUS = SPACING.screenWidth / 6;

const Line = ({variant, isActive = false}: LineProps) => {
  return <View style={[styles[variant], isActive && styles.lineActive]} />;
};
export {Line};
