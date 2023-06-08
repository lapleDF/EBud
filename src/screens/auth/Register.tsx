import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Link, useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';

import {CSButton, CSButtonBack} from '../../components/core/CSButton';
import {SPACING} from '../../constants/spacing';
import {User} from '../../types';
import {initialUser} from '../../store/reducers/userReducer';
import {COLORS} from '../../constants/color';
import {CSInput, CSLayout, CSLoading, CSText} from '../../components/core';

const Register = () => {
  const [params, setParams] = useState<User>(initialUser);
  const [passwordFields, setPasswordFields] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const register = async () => {
    if (!isAgree) {
      return;
    }
    // todo: Validate input form
    try {
      setIsLoading(true);
      await Parse.User.signUp(params.username, passwordFields.password, {
        email: params.email,
        avatar: params.avatar,
        totalStreak: params.totalStreak,
        totalMedal: params.totalMedal,
        desc: params.desc,
        game: [],
      });
      setIsLoading(false);
      navigation.navigate('login');
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <CSLayout style={styles.container}>
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
          onChangeText={text =>
            setPasswordFields({...passwordFields, password: text})
          }
          placeholder="Mật khẩu"
          defaultValue={passwordFields.password}
          secure
        />
        <CSInput
          onChangeText={text =>
            setPasswordFields({...passwordFields, confirmPassword: text})
          }
          placeholder="Nhập lại mật khẩu"
          secure
          defaultValue={passwordFields.confirmPassword}
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
    </CSLayout>
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
