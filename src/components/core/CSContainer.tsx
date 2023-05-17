import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

import {COLORS} from '../../constants/color';

export interface CSContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CSContainer = (props: CSContainerProps) => {
  return (
    <View
      style={[props.style, {backgroundColor: COLORS.bgDark}, styles.container]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CSContainer;
