import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

import {CSButton} from '../../components/core/CSButton';
import {ASYNC_STORAGE} from '../../constants/asyncStorage';
import {AppDispatch, RootState} from '../../store/store';
import {USER_ACTION} from '../../store/actions';
import {CSLayout, CSModal, CSText} from '../../components/core';
import {User} from '../../types';
import {SPACING} from '../../constants/spacing';
import AccountHeader from '../../components/account/AccountHeader';
import {COLORS} from '../../constants/color';
import SettingItem from '../../components/account/SettingItem';

const Account = () => {
  const navigation = useNavigation<any>();
  const refBtnLogout = useRef<any>();
  const user: User = useSelector((state: RootState) => state.user);

  const logout = () => {
    AsyncStorage.removeItem(ASYNC_STORAGE.userInfo);
    AppDispatch(USER_ACTION.LOGOUT, null);
    refBtnLogout.current.close();
    navigation.navigate('authentication');
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
          routeName="userInfo"
        />
        <SettingItem
          label="Cài đặt hiển thị"
          icon="settings-outline"
          routeName="appearance"
        />
        <SettingItem
          label="Cài đặt thông báo"
          icon="notifications-outline"
          routeName="notification"
        />
        <CSText variant="PoppinsBold" style={styles.titleList}>
          Hỗ trợ
        </CSText>
        <SettingItem
          label="Báo cáo sự cố"
          icon="warning-outline"
          routeName="reportIssue"
        />
        <SettingItem
          label="Các câu hỏi thường gặp"
          icon="help-circle-outline"
          routeName="FAQ"
        />

        <TouchableOpacity
          onPress={() => refBtnLogout.current.open()}
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
            onPress={() => refBtnLogout.current.close()}
            variant="secondary"
          />
        </View>
      </CSModal>
    </CSLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
  },
  groupBtnModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  logout: {
    width: SPACING.screenWidth - SPACING.px * 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryLighter,
    paddingVertical: 10,
    marginLeft: SPACING.px,
    marginVertical: 20,
  },
  titleList: {
    marginTop: 20,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: SPACING.heightBottomTab,
  },
});
export default Account;
