import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';

import CSContainer from '../../components/core/CSContainer';
import CSText from '../../components/core/CSText';
import CSInput from '../../components/core/CSInput';
import {CSButton} from '../../components/core/CSButton';
import {SPACING} from '../../constants/spacing';
import {User} from '../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {storeDataAsyncStorage} from '../../utils';

const Login = () => {
  const [params, setParams] = useState({
    username: '',
    password: '',
  });
  const user: User = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>();

  const login = () => {
    if (
      user.username === params.username &&
      user.password === params.password
    ) {
      storeDataAsyncStorage('EBudAccessToken', 'abcd'); // !hard code access token
      navigation.navigate('bottomTab');
    }
  };
  return (
    <CSContainer style={styles.container}>
      <CSText size={'xxl'} color="primaryLight" variant="PoppinsBold">
        Đăng nhập
      </CSText>
      <View style={styles.groupInput}>
        <CSInput
          onChangeText={text => setParams({...params, username: text})}
          defaultValue={params.username}
          placeholder="Tên đăng nhập"
        />
        <CSInput
          onChangeText={text => setParams({...params, password: text})}
          placeholder="Mật khẩu"
          defaultValue={params.password}
          secure
        />
      </View>
      <View style={styles.groupBtn}>
        <CSButton title="Đăng nhập" onPress={login} />
        <CSText>
          Chưa có tài khoản?{' '}
          <Link to={{screen: 'register'}}>
            <CSText color="primaryDark">Đăng ký</CSText>
          </Link>
        </CSText>
      </View>
    </CSContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 100,
    alignItems: 'center',
    paddingHorizontal: SPACING.px,
  },
  groupInput: {
    width: '100%',
    gap: 20,
  },
  groupBtn: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
});
export default Login;
