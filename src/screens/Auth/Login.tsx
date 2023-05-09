import {View} from 'react-native';
import React from 'react';
import CSContainer from '../../components/core/CSContainer';
import CSText from '../../components/core/CSText';
import CSInput from '../../components/core/CSInput';

const Login = () => {
  return (
    <CSContainer>
      <CSText>Login</CSText>
      <CSInput
        onChangeText={text => console.log('ccccccc: ', text)}
        placeholder="Tên đăng nhập"
        icon={'eye-outline'}
        errMess=""
      />
    </CSContainer>
  );
};

export default Login;
