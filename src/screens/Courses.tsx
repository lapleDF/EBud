import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import HeaderScreen from '../components/HeaderScreen';
import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';
import {RootState} from '../store/store';
import {User} from '../types';

const Courses = () => {
  const navigation = useNavigation();
  const user: User = useSelector((state: RootState) => state.user);

  console.log('user.username', user.username);
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
    <CSContainer>
      <CSText>Courses</CSText>
    </CSContainer>
  );
};

export default Courses;
