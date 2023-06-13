import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {CSInput, CSLayout, CSText} from '../../components/core';
import {UserInfoStyles as styles} from './UserInfo.styles';
import {Image, TouchableOpacity, View} from 'react-native';
import type {User} from '../../types';
import {RootState} from '../../store/store';
import {COLORS} from '../../constants/color';

const UserInfo = () => {
  const user: User = useSelector((rootState: RootState) => rootState.user);
  const [userParams, setUserParams] = useState(user);
  const [editables, setEditables] = useState<boolean[]>([
    ...Array(3).fill(false),
  ]);

  const handleEditable = () => {};

  return (
    <CSLayout style={styles.container}>
      <Image source={{uri: user.avatar}} style={styles.avatar} />
      {}
    </CSLayout>
  );
};

export default UserInfo;
