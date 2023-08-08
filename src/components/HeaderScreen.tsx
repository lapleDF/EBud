import {Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../constants/color';
import {CSButtonBack, CSText} from './core';
import {HeaderScreenStyles as styles} from './HeaderScreen.styles';

interface HeaderScreenProps {
  textLeft?: string;
  avatar?: string;
  backBtn?: boolean;
  onPressLeft?: () => void;
  iconLeft?: string;
  onPressRight?: () => void;
  iconRight?: string;
  textRight?: string | number;
  headerRight?: JSX.Element;
}

const HeaderScreen = ({backBtn = false, ...props}: HeaderScreenProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.left}
        onPress={props.onPressLeft}
        activeOpacity={0.5}>
        {backBtn && <CSButtonBack isAbsolute={false} />}
        {props.iconLeft && (
          <Icon name={props.iconLeft} size={40} color={COLORS.primaryDark} />
        )}
        {props.textLeft && (
          <CSText
            textProps={{numberOfLines: 1}}
            variant="PoppinsSemiBold"
            size={'xlg'}>
            {props.textLeft}
          </CSText>
        )}
        {props.avatar && (
          <Image source={{uri: props.avatar}} style={styles.imgAvatar} />
        )}
      </TouchableOpacity>
      {props.headerRight || (
        <TouchableOpacity
          style={styles.right}
          onPress={props.onPressRight}
          activeOpacity={0.5}>
          {props.textRight && (
            <CSText
              textProps={{numberOfLines: 1}}
              variant="PoppinsSemiBold"
              size={'xlg'}>
              {props.textRight}
            </CSText>
          )}
          {props.iconRight && (
            <Icon name={props.iconRight} size={40} color={COLORS.secondary} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderScreen;
