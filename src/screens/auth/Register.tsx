import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Link, useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';

import CSContainer from '../../components/core/CSContainer';
import CSText from '../../components/core/CSText';
import {CSButton, CSButtonBack} from '../../components/core/CSButton';
import {SPACING} from '../../constants/spacing';
import {User} from '../../types';
import {initialUser} from '../../store/reducers/userReducer';
import CSInput from '../../components/core/CSInput';
import {COLORS} from '../../constants/color';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import CSLoading from '../../components/core/CSLoading';

const Register = () => {
  const [params, setParams] = useState<User>(initialUser);
  const [confirmPwd, setConfirmPwd] = useState<string>('');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const register = async () => {
    if (!isAgree) {
      return;
    }
    // todo: Validate input form
    AppDispatch(USER_ACTION.REGISTER, params);
    try {
      setIsLoading(true);
      await Parse.User.signUp(params.username, params.password, {
        email: params.email,
        avatar: params.avatar,
        totalStreak: params.totalStreak,
        totalMedal: params.totalMedal,
        desc: params.desc,
      });
      setIsLoading(false);
      navigation.navigate('login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CSContainer style={styles.container}>
      {isLoading && <CSLoading />}
      <CSButtonBack />
      <CSText size={'xxl'} color="primaryLight" variant="Bungee">
        Đăng ký
      </CSText>
      <View style={styles.groupInput}>
        <CSInput
          onChangeText={text => setParams({...params, username: text})}
          placeholder="Tên đăng nhập"
          defaultValue={params.username}
        />
        <CSInput
          onChangeText={text => setParams({...params, email: text})}
          placeholder="Email"
          defaultValue={params.email}
        />
        <CSInput
          onChangeText={text => setParams({...params, password: text})}
          placeholder="Mật khẩu"
          defaultValue={params.password}
          secure
        />
        <CSInput
          onChangeText={text => setConfirmPwd(text)}
          placeholder="Nhập lại mật khẩu"
          secure
          defaultValue={confirmPwd}
        />
      </View>
      <View style={styles.groupBtn}>
        <View style={styles.agreeBtnGroup}>
          <Icon
            onPress={() => {
              setIsAgree(!isAgree);
            }}
            name={isAgree ? 'checkbox-outline' : 'square-outline'}
            size={30}
            color={COLORS.primaryLight}
          />
          <CSText size={'sm'}>
            Tôi đồng ý với các{' '}
            <Link to={{screen: 'register'}}>
              <CSText size={'sm'} color="primaryDark">
                điều khoản và chính sách
              </CSText>
            </Link>
          </CSText>
        </View>
        <CSButton onPress={register} title="Đăng ký" />
      </View>
    </CSContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: SPACING.px,
  },
  groupBtn: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  groupInput: {
    width: '100%',
    alignItems: 'center',
    gap: 25,
  },
  agreeBtnGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
});
export default Register;
