import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import CSText from './core/CSText';
import {COLORS} from '../constants/color';
import {SPACING} from '../constants/spacing';
import {CSButtonBack} from './core/CSButton';

interface HeaderScreenProps {
  textLeft?: string;
  avatar?: string | ImageSourcePropType;
  backBtn?: boolean;
  onPressLeft?: () => void;
  iconLeft?: string;
  onPressRight?: () => void;
  iconRight?: string;
  textRight?: string | number;
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
          <CSText variant="PoppinsSemiBold" size={'xlg'}>
            {props.textLeft}
          </CSText>
        )}
        {props.avatar && (
          <Image
            source={
              typeof props.avatar === 'string'
                ? {uri: props.avatar}
                : props.avatar
            }
            style={styles.imgAvatar}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.right}
        onPress={props.onPressRight}
        activeOpacity={0.5}>
        {props.textRight && (
          <CSText variant="PoppinsSemiBold" size={'xlg'}>
            {props.textRight}
          </CSText>
        )}
        {props.iconRight && (
          <Icon name={props.iconRight} size={40} color={COLORS.secondary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.bgHeader,
    paddingHorizontal: SPACING.px,
    width: '100%',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imgAvatar: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default HeaderScreen;
