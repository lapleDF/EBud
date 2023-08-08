import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import HeaderScreen from '../../components/HeaderScreen';
import type {GameList, User} from '../../types';
import {AppDispatch, RootState} from '../../store/store';
import {CSLayout, CSModal, CSText} from '../../components/core';
import {GameStyles as styles} from './Game.styles';
import GameItem from '../../components/game/GameItem';
import type {GameScreenProps} from '../../types/navigation/types';
import {GAME_ACTION} from '../../store/actions';
import GameItemPlaceholder from '../../components/game/GameItemPlaceholder';

const Game = () => {
  const navigation = useNavigation<GameScreenProps<'Game'>['navigation']>();
  const rootState: RootState = useSelector((state: RootState) => state);
  const user: User = rootState.user;
  const gameList: GameList = rootState.game;
  const refModal = useRef<RBSheet>(null);
  const [gameRule, setGameRule] = useState('');

  const handleHelp = (rule: string) => {
    setGameRule(rule);
    refModal.current?.open();
  };

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        HeaderScreen({
          iconRight: 'trophy',
          textRight: user.totalMedal?.toString(),
        }),
    });
  });

  useEffect(() => {
    AppDispatch(GAME_ACTION.GET_LIST);
  }, []);

  return (
    <CSLayout>
      {gameList.fetchingStatus === 'loading' ? (
        <GameItemPlaceholder />
      ) : (
        <FlatList
          data={gameList.list}
          renderItem={({item}) => (
            <GameItem gameItem={item} handleHelp={handleHelp} />
          )}
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      <CSModal refRBSheet={refModal}>
        <CSText variant="PoppinsBold" color="primaryDark" size={'xlg'}>
          Luật chơi
        </CSText>
        <CSText style={styles.gameRule}>{gameRule}</CSText>
      </CSModal>
    </CSLayout>
  );
};

export default Game;
