import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {CSModal, CSText} from '../core';
import HeaderLeftItem from './HeaderLeftItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import AvatarChange from './AvatarChange';

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
      <CSModal refRBSheet={refModal} closeBtn={false}>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  headerLeft: {
    width: '40%',
    height: SPACING.screenWidth * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarTouchable: {
    width: '70%',
    height: '70%',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerRight: {
    width: '60%',
    height: SPACING.screenWidth * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineBetween: {
    width: 6,
    height: '100%',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 6,
    position: 'absolute',
    top: 0,
    left: -6,
  },
  headerItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  headerItemEnd: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '20%',
  },
});
