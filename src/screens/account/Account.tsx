import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleSheet, View} from 'react-native';

import {CSButton} from '../../components/core/CSButton';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {AppDispatch} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {CSLayout, CSModal, CSText} from '../../components/core';
import {RootStackScreenProps} from '../../types/navigation/types';

const Account = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'Authentication'>['navigation']>();
  const refBtnLogout = useRef<RBSheet>();

  const logout = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE.userInfo);
    AppDispatch(USER_ACTION.LOGOUT, null);
    refBtnLogout.current?.close();
    navigation.navigate('Authentication', {screen: 'Login'});
  };

  return (
    <CSLayout>
      <CSText>Account</CSText>
      <CSButton
        title="Logout"
        onPress={() => refBtnLogout.current?.open()}
        variant="secondary"
      />
      <CSModal refRBSheet={refBtnLogout}>
        <CSText size={'lg'} color="primaryDark" variant="PoppinsBold">
          Đăng xuất?
        </CSText>
        <CSText style={styles.textCenter}>
          Nếu đồng ý bạn sẽ đăng xuất khỏi thiết bị hiện tại
        </CSText>
        <View style={styles.groupBtnModal}>
          <CSButton title="Đồng ý" onPress={logout} />
          <CSButton
            title="Hủy"
            onPress={() => refBtnLogout.current?.close()}
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
  textCenter: {
    textAlign: 'center',
  },
});
export default Account;
