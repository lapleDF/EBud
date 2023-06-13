import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../constants/color';
import {CSInputStyles as styles} from './CSInput.styles';
import {CSText} from './CSText';

interface CSInputProps {
  defaultValue?: string;
  onChangeText: (changedText: string) => void;
  secure?: boolean;
  placeholder?: string;
  errMess?: string;
  styleWrapper?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  onPressIcon?: () => void;
  textInputProps?: TextInputProps;
}

const CSInput = ({
  defaultValue = '',
  secure = false,
  placeholder = '',
  ...props
}: CSInputProps) => {
  const [isSecure, setIsSecure] = useState<boolean>(secure);
  const handlePressIcon = () => {
    secure === undefined ? props.onPressIcon : setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.container, props.styleContainer]}>
      <View style={[styles.wrapper, props.styleWrapper]}>
        <TextInput
          style={styles.inputFiled}
          defaultValue={defaultValue}
          onChangeText={props.onChangeText}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          autoCapitalize="none"
          {...props.textInputProps}
        />
        {secure && (
          <Icon
            style={styles.icon}
            name={isSecure ? 'eye-outline' : 'eye-off-outline'}
            size={30}
            color={COLORS.primaryDark}
            onPress={handlePressIcon}
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

export {CSInput};
