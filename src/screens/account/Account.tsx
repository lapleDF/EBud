import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {AccountStyles as styles} from './Account.styles';
import {CSButton} from '../../components/core/CSButton';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {AppDispatch, RootState} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {CSLayout, CSModal, CSText} from '../../components/core';
import type {RootStackScreenProps} from '../../types/navigation/types';
import AccountHeader from '../../components/account/AccountHeader';
import SettingItem from '../../components/account/SettingItem';
import {COLORS} from '../../constants/color';
import type {User} from '../../types';

const Account = () => {
  const navigation =
    useNavigation<RootStackScreenProps<'Authentication'>['navigation']>();
  const refBtnLogout = useRef<RBSheet>();

  const user: User = useSelector((state: RootState) => state.user);

  const logout = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE.userInfo);
    AppDispatch(USER_ACTION.LOGOUT, null);
    refBtnLogout.current?.close();
    navigation.navigate('Authentication', {screen: 'Login'});
  };

  return (
    <CSLayout style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <AccountHeader
          avatar={user.avatar}
          learntLesson={user.learntLesson}
          rank={100}
          totalMedal={user.totalMedal}
          totalStreak={user.totalStreak}
          userName={user.username}
        />

        <CSText variant="PoppinsBold" style={styles.titleList}>
          Chung
        </CSText>
        <SettingItem
          label="Thông tin tài khoản"
          icon="person-outline"
          routeName="UserInfo"
        />
        <SettingItem
          label="Cài đặt hiển thị"
          icon="settings-outline"
          routeName="Appearance"
        />
        <SettingItem
          label="Cài đặt thông báo"
          icon="notifications-outline"
          routeName="Notification"
        />
        <CSText variant="PoppinsBold" style={styles.titleList}>
          Hỗ trợ
        </CSText>
        <SettingItem
          label="Báo cáo sự cố"
          icon="warning-outline"
          routeName="ReportIssue"
        />
        <SettingItem
          label="Các câu hỏi thường gặp"
          icon="help-circle-outline"
          routeName="FAQ"
        />

        <TouchableOpacity
          onPress={() => refBtnLogout.current?.open()}
          style={styles.logout}>
          <CSText color="primaryLighter" variant="PoppinsBold">
            Đăng xuất
          </CSText>
          <Icon
            name="log-out-outline"
            size={40}
            color={COLORS.primaryLighter}
          />
        </TouchableOpacity>
      </ScrollView>
      <CSModal refRBSheet={refBtnLogout} isShowCloseBtn={false}>
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

export default Account;
