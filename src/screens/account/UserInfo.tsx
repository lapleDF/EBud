import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {CSLayout} from '../../components/core';
import {UserInfoStyles as styles} from './UserInfo.styles';
import type {User} from '../../types';
import {RootState} from '../../store/store';
import UserInfoFieldItem from './UserInfoFieldItem';
import {KeyboardAvoidingView, Platform} from 'react-native';

const UserInfo = () => {
  const user: User = useSelector((rootState: RootState) => rootState.user);

  const [userParams, setUserParams] = useState<UserInfoProps>({
    username: user.username,
    fullName: user.fullName,
    email: user.email,
  });

  const [editables, setEditables] = useState<boolean[]>([
    ...Array(USER_INFO_ITEM.length).fill(false),
  ]);

  const handleEditable = (index: number) => {
    const newEditables = [...Array(USER_INFO_ITEM.length).fill(false)];
    newEditables[index] = !newEditables[index];
    setEditables(newEditables);
  };

  const handleChangeText = (text: string, proterty: keyof UserInfoProps) => {
    let userTemp = userParams;
    userTemp[proterty] = text;
    setUserParams(userTemp);
  };

  console.log(editables);

  return (
    <CSLayout style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {USER_INFO_ITEM.map((item, index) => (
          <UserInfoFieldItem
            defaultValue={userParams[item.property]?.toString() || ''}
            editable={editables[index]}
            index={index}
            label={item.label}
            onChangeText={text => handleChangeText(text, item.property)}
            onPressEditBtn={handleEditable}
            key={index}
          />
        ))}
      </KeyboardAvoidingView>
    </CSLayout>
  );
};

interface UserInfoProps {
  username: string;
  fullName: string;
  email: string;
}
interface UserInfoItemProps {
  label: string;
  property: keyof UserInfoProps;
}

const USER_INFO_ITEM: UserInfoItemProps[] = [
  {
    label: 'Họ và tên',
    property: 'username',
  },
  {
    label: 'Tên hiển thị',
    property: 'fullName',
  },
  {
    label: 'Email',
    property: 'email',
  },
];

export default UserInfo;
