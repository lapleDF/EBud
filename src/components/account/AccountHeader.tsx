import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {SPACING} from '../../constants/spacing';
import {COLORS} from '../../constants/color';
import {CSText} from '../core';
import HeaderLeftItem from './HeaderLeftItem';

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
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image source={{uri: avatar}} style={styles.avatar} />
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
  avatar: {
    width: '70%',
    height: '70%',
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
