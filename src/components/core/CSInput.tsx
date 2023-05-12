import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../constants/color';
import CSText, {sizeText} from './CSText';
import {SPACING} from '../../constants/spacing';
import {FONTS} from '../../constants/font';

interface CSInputProps {
  defaultValue?: string;
  onChangeText: (changedText: string) => void;
  secure?: boolean;
  placeholder?: string;
  errMess?: string;
  styleWrapper?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  onPressIcon?: () => void;
}

const CSInput = ({
  defaultValue = '',
  secure = false,
  placeholder = '',
  ...props
}: CSInputProps) => {
  const [isSecure, setIsSecure] = useState<boolean>(secure);
  return (
    <View style={[styles.container, props.styleContainer]}>
      <View style={[styles.wrapper, props.styleWrapper]}>
        <TextInput
          style={styles.inputFiled}
          defaultValue={defaultValue}
          onChangeText={changedText => props.onChangeText(changedText)}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          autoCapitalize="none"
        />
        {secure && (
          <Icon
            style={styles.icon}
            name={isSecure ? 'eye-outline' : 'eye-off-outline'}
            size={30}
            color={COLORS.primaryDark}
            onPress={
              secure === undefined
                ? props.onPressIcon
                : () => setIsSecure(!isSecure)
            }
          />
        )}
      </View>
      {props.errMess && (
        <CSText color="red" size={'sm'} style={styles.errMess}>
          {props.errMess}{' '}
          <Icon
            style={styles.icon}
            name="warning-outline"
            size={20}
            color={COLORS.red}
          />
        </CSText>
      )}
    </View>
  );
};

export default CSInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 70,
    borderRadius: 10,
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFiled: {
    width: '100%',
    minHeight: 60,
    borderWidth: 1,
    borderColor: COLORS.primaryLighter,
    borderRadius: 10,
    fontFamily: FONTS.PoppinsRegular,
    paddingHorizontal: SPACING.px,
    fontSize: sizeText.md,
  },
  icon: {
    position: 'absolute',
    right: SPACING.px,
  },
  errMess: {
    fontWeight: '600',
    marginTop: 3,
    paddingHorizontal: 5,
  },
});
