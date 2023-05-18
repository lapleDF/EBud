import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CSText from '../../components/core/CSText';
import {CSButton} from '../../components/core/CSButton';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import CSModal from '../../components/core/CSModal';
import {StyleSheet, View} from 'react-native';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {initialUser} from '../../store/reducers/userReducer';
import CSLayout from '../../components/core/CSLayout';

const Account = () => {
  const navigation = useNavigation<any>();
  const refBtnLogout = useRef<any>();

  const logout = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE.userInfo);
    AppDispatch(USER_ACTION.UPDATE, initialUser);
    refBtnLogout.current.close();
    navigation.navigate('authentication');
  };

  return (
    <CSLayout>
      <CSText>Account</CSText>
      <CSButton
        title="Logout"
        onPress={() => refBtnLogout.current.open()}
        variant="secondary"
      />
      <CSModal refRBSheet={refBtnLogout}>
        <CSText size={'lg'} color="primaryDark" variant="PoppinsBold">
          Đăng xuất khỏi thiết bị?
        </CSText>
        <CSText>Nếu đồng ý bạn sẽ đăng nhập khỏi thiết bị hiện tại</CSText>
        <View style={styles.groupBtnModal}>
          <CSButton title="Đồng ý" onPress={logout} />
          <CSButton
            title="Hủy"
            onPress={() => refBtnLogout.current.close()}
            variant="secondary"
          />
        </View>
      </CSModal>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  groupBtnModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Account;
