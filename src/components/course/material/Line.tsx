import {StyleSheet, View} from 'react-native';
import React from 'react';

import {SPACING} from '../../../constants/spacing';
import {COLORS} from '../../../constants/color';

interface LineProps {
  variant: 'line12' | 'line3';
  isActive?: boolean;
}

const RADIUS = SPACING.screenWidth / 6;

const Line = ({variant, isActive = false}: LineProps) => {
  return <View style={[styles[variant], isActive && styles.lineActive]} />;
};
export {Line};

const styles = StyleSheet.create({
  line12: {
    height: RADIUS * 2 - 15,
    width: 10,
    backgroundColor: COLORS.borderDeactive,
    position: 'absolute',
    borderRadius: 20,
    top: 83 - RADIUS * 3,
    transform: [{rotateZ: '45deg'}, {translateX: 85}],
    zIndex: 0,
  },
  line3: {
    width: RADIUS * 2 - 10,
    height: 10,
    backgroundColor: COLORS.borderDeactive,
    position: 'absolute',
    borderRadius: 20,
    right: RADIUS * 2 - 5,
  },
  lineActive: {
    backgroundColor: COLORS.primaryLight,
  },
});
