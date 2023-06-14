import {View} from 'react-native';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';

import {CSButton} from '../../components/core/CSButton';
import {LoginStyles as styles} from './Login.styles';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {CSInput, CSLayout, CSLoading, CSText} from '../../components/core';
import type {RootStackScreenProps} from '../../types/navigation/types';

const Login = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'BottomTab'>['navigation']>();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    username: '',
    password: '',
  });
  const [errMess, setErrMess] = useState({
    userName: '',
    password: '',
  });

  const login = async () => {
    // todo: Validate input
    try {
      setIsLoading(true);
      await Parse.User.logIn(params.username, params.password).then(
        (loggedInUser: Parse.User) => {
          AppDispatch(USER_ACTION.LOGIN, loggedInUser);
        },
      );
      setIsLoading(false);
      navigation.navigate('BottomTab', {screen: 'Course'});
    } catch (error: any) {
      setIsLoading(false);
      if (error?.message === 'Invalid username/password.') {
        setErrMess({...errMess, password: 'Email hoặc mật khẩu không đúng'});
      }
    }
  };
  return (
    <CSLayout style={styles.container}>
      {isLoading && <CSLoading />}
      <CSText size={'xxl'} color="primaryLight" variant="Bungee">
        Đăng nhập
      </CSText>
      <View style={styles.groupInput}>
        <CSInput
          onChangeText={text => setParams({...params, username: text})}
          defaultValue={params.username}
          placeholder="Tên đăng nhập"
          errMess={errMess.userName}
        />
        <CSInput
          onChangeText={text => setParams({...params, password: text})}
          placeholder="Mật khẩu"
          defaultValue={params.password}
          errMess={errMess.password}
          secure
        />
      </View>
      <View style={styles.groupBtn}>
        <CSButton title="Đăng nhập" onPress={login} />
        <CSText>
          Chưa có tài khoản?{' '}
          <Link to={{screen: 'Authentication', params: {screen: 'Register'}}}>
            <CSText color="primaryDark">Đăng ký</CSText>
          </Link>
        </CSText>
      </View>
    </CSLayout>
  );
};

export default Login;
