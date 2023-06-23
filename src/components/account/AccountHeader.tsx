import {Image, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, {useRef} from 'react';

import {CSModal, CSText} from '../core';
import HeaderLeftItem from './HeaderLeftItem';
import AvatarChange from './AvatarChange';
import {AccountHeaderStyles as styles} from './AccountHeader.styles';

interface AccountHeaderProps {
  avatar: string;
  userName: string;
  totalStreak: number;
  totalMedal: number;
  learntLesson: number;
  rank: number;
}

const AccountHeader = ({
  avatar,
  totalMedal,
  totalStreak,
  userName,
  learntLesson,
  rank,
}: AccountHeaderProps) => {
  const refModal = useRef<RBSheet>();
  return (
    <View style={styles.header}>
      <CSModal refRBSheet={refModal} isShowCloseBtn={false}>
        <AvatarChange refRBSheet={refModal} />
      </CSModal>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          onPress={() => refModal.current?.open()}
          style={styles.avatarTouchable}>
          <Image source={{uri: avatar}} style={styles.avatar} />
        </TouchableOpacity>
        <CSText variant="PoppinsBold" size={'xlg'}>
          {userName}
        </CSText>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.lineBetween} />
        <HeaderLeftItem
          label="Điểm chăm chỉ"
          totalStreak={totalStreak}
          iconName="flame"
        />
        <HeaderLeftItem
          label="Cup đạt được"
          totalStreak={totalMedal}
          iconName="trophy"
        />
        <HeaderLeftItem label="Bài đã học" totalStreak={learntLesson} />
        <HeaderLeftItem label="Xếp hạng" totalStreak={rank} />
      </View>
    </View>
  );
};

export default AccountHeader;
