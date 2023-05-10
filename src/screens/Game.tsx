import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

import HeaderScreen from '../components/HeaderScreen';
import CSContainer from '../components/core/CSContainer';
import CSText from '../components/core/CSText';
import {User} from '../types';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

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
    <CSContainer>
      <CSText>Game</CSText>
    </CSContainer>
  );
};

export default Game;
