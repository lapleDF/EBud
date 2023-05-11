import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import CSContainer from '../../components/core/CSContainer';
import {RootState} from '../../store/store';
import {User} from '../../types';
import {StyleSheet} from 'react-native';
import {SPACING} from '../../constants/spacing';
import CoursList from '../../components/course/CoursList';

const Courses = () => {
  const navigation = useNavigation();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          avatar: user.avatar,
          textLeft: user.username,
          textRight: user.totalStreak?.toString(),
          iconRight: 'flame',
        }),
    });
  });
  return (
    <CSContainer style={styles.container}>
      <CoursList skillFilter="vocab" />
    </CSContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.px,
  },
});

export default Courses;
