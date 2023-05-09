import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/color';
import CSText, {sizeText} from './CSText';
import {SPACING} from '../../constants/spacing';
import {FONTS} from '../../constants/font';

interface CSInputProps {
  defaultValue?: any;
  onChangeText: (changedText: string) => void;
  secure?: boolean;
  placeholder?: string;
  /**
   * @param icon JSX Element or an icon name of IonIcons package
   */
  icon?: JSX.Element | string;
  errMess?: string;
  styleWrapper?: any;
  styleContainer?: any;
  onPressIcon?: () => void;
}

const CSInput = ({
  defaultValue = '',
  secure = undefined,
  placeholder = '',
  ...props
}: CSInputProps) => {
  const [isSecure, setIsSecure] = useState<boolean>(secure !== undefined);
  console.log('isSecure', isSecure);

  return (
    <View style={[styles.container, props.styleContainer]}>
      <View style={[styles.wrapper, props.styleWrapper]}>
        <TextInput
          style={styles.inputFiled}
          defaultValue={defaultValue}
          onChangeText={changedText => props.onChangeText(changedText)}
          secureTextEntry={isSecure}
          placeholder={placeholder}
        />
        {typeof props.icon === 'string' ? (
          <Icon
            style={styles.icon}
            name={
              secure === undefined
                ? props.icon
                : isSecure
                ? 'eye-outline'
                : 'eye-off-outline'
            }
            size={30}
            color={COLORS.primaryDark}
            onPress={
              secure === undefined
                ? props.onPressIcon
                : () => setIsSecure(!isSecure)
            }
          />
        ) : (
          props.icon
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
    paddingHorizontal: SPACING.px,
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
    marginTop: 5,
  },
});
