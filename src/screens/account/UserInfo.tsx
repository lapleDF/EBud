import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  CSButton,
  CSLayout,
  CSLoading,
  CSModal,
  CSText,
} from '../../components/core';
import {UserInfoStyles as styles} from './UserInfo.styles';
import type {User} from '../../types';
import {AppDispatch, RootState} from '../../store/store';
import UserInfoFieldItem from './UserInfoFieldItem';
import {USER_ACTION} from '../../store/actions';

const UserInfo = () => {
  const user: User = useSelector((rootState: RootState) => rootState.user);
  const refModal = useRef<RBSheet>(null);

  const [userParams, setUserParams] = useState<UserInfoProps>({
    username: user.username,
    fullName: user.fullName,
    email: user.email,
  });

  const [isChanged, setIsChanged] = useState(false);

  const [editables, setEditables] = useState<boolean[]>([
    ...Array(USER_INFO_ITEM.length).fill(false),
  ]);

  const handleEditable = (index: number) => {
    const newEditables = [...Array(USER_INFO_ITEM.length).fill(false)];
    newEditables[index] = !newEditables[index];
    setEditables(newEditables);
  };

  const handleChangeText = (text: string, proterty: keyof UserInfoProps) => {
    let userTemp = userParams;
    userTemp[proterty] = text;
    setUserParams(userTemp);

    if (!isChanged) {
      setIsChanged(true);
    }
  };

  const handleConfirmChange = () => {
    AppDispatch(USER_ACTION.CHANGE_USER_INFO, userParams);
    setIsChanged(false);
    setEditables([...Array(USER_INFO_ITEM.length).fill(false)]);
  };

  const handleResetPassowrd = () => {
    AppDispatch(USER_ACTION.RESET_PASSWORD, user.email);
    refModal.current?.close();
  };

  return (
    <CSLayout style={styles.container}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {USER_INFO_ITEM.map((item, index) => (
          <UserInfoFieldItem
            defaultValue={userParams[item.property]?.toString() || ''}
            editable={editables[index]}
            index={index}
            label={item.label}
            onChangeText={text => handleChangeText(text, item.property)}
            onPressEditBtn={handleEditable}
            key={index}
          />
        ))}
        {isChanged && (
          <TouchableOpacity
            onPress={handleConfirmChange}
            style={styles.btnConfirm}>
            <CSText variant="PoppinsBold">Xác nhận</CSText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => refModal.current?.open()}
          style={styles.btnResetPassowrd}>
          <CSText variant="PoppinsBold">Đổi mật khẩu</CSText>
        </TouchableOpacity>
        <CSModal refRBSheet={refModal} isShowCloseBtn={false}>
          {user.fetchingStatus === 'loading' && <CSLoading />}
          <CSText
            size={'xlg'}
            variant="PoppinsBold"
            color="primaryDark"
            style={styles.titleResetPassword}>
            Đổi mật khẩu
          </CSText>
          <CSText style={styles.descResetPassword}>
            Chúng tôi sẽ gửi mẫu thông tin để bạn điền mật khẩu mới khi bạn xác
            nhận muốn thay đổi mật khẩu.
          </CSText>
          <View style={styles.btnResetPawwords}>
            <CSButton title="Xác nhận" onPress={handleResetPassowrd} />
            <CSButton
              title="Hủy"
              variant="secondary"
              onPress={() => refModal.current?.close()}
            />
          </View>
        </CSModal>
      </KeyboardAvoidingView>
    </CSLayout>
  );
};

export interface UserInfoProps {
  username: string;
  fullName: string;
  email: string;
}
interface UserInfoItemProps {
  label: string;
  property: keyof UserInfoProps;
}

const USER_INFO_ITEM: UserInfoItemProps[] = [
  {
    label: 'Họ và tên',
    property: 'fullName',
  },
  {
    label: 'Tên hiển thị',
    property: 'username',
  },
  {
    label: 'Email',
    property: 'email',
  },
];

export default UserInfo;
