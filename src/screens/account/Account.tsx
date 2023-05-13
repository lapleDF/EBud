import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CSContainer from '../../components/core/CSContainer';
import CSText from '../../components/core/CSText';
import {CSButton} from '../../components/core/CSButton';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';

const Account = () => {
  const navigation = useNavigation<any>();

  const logout = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE.accessToken);
    navigation.navigate('authentication');
  };

  return (
    <CSContainer>
      <CSText>Account</CSText>
      <CSButton title="Logout" onPress={logout} variant="secondary" />
    </CSContainer>
  );
};

export default Account;
