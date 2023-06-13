import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {UserInfoStyles as styles} from './UserInfo.styles';
import {CSInput, CSText} from '../../components/core';
import {COLORS} from '../../constants/color';

interface UserInfoFieldItemProps {
  onPressEditBtn: (index: number) => void;
  defaultValue: string;
  editable: boolean;
  onChangeText: (text: string) => void;
  index: number;
  label: string;
}

const UserInfoFieldItem = (props: UserInfoFieldItemProps) => {
  return (
    <View style={styles.infoItem}>
      <CSText>{props.label}</CSText>
      <TouchableOpacity
        onPress={() => props.onPressEditBtn(props.index)}
        style={styles.editBtn}>
        <Icon name="pencil-outline" size={35} color={COLORS.primaryDark} />
      </TouchableOpacity>
      <CSInput
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        textInputProps={{editable: props.editable}}
        styleContainer={styles.input}
      />
    </View>
  );
};

export default UserInfoFieldItem;
