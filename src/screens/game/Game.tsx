import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import HeaderScreen from '../../components/HeaderScreen';
import {User} from '../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {CSLayout, CSText} from '../../components/core';

const Game = () => {
  const navigation = useNavigation();
  const user: User = useSelector((state: RootState) => state.user);

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          iconRight: 'trophy',
          textRight: user.totalMedal?.toString(),
        }),
    });
  });
  return (
    <CSLayout>
      <CSText>Game</CSText>
    </CSLayout>
  );
};

export default Game;
